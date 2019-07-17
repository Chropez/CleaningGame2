import { AppActionCreator, AppThunkDispatch } from 'store';
import { AppAction } from 'config/redux';
import Game, { GamePhase } from 'models/game';
import {
  selectGame,
  selectGameId,
  selectCurrentUserId,
  updateGameByIdQuery,
  selectGamePlayers
} from '../../game-duck';
import TaskEstimation from 'models/task-estimation';
import { ApplicationState } from 'store/root-reducer';
import Task from 'models/task';
import TaskWithEstimationViewModel from './task-with-estimation-view-model';
import { timestamp } from 'utils/firestore';
import GamePlayer from 'models/game-player';
import Firestore, { DocumentQuery } from 'typings/firestore';

enum EstimatePhaseActionTypes {
  NextGamePhaseRequested = 'GAMES/GAME/ESTIMATE_PHASE/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/NEXT_GAME_PHASE_SUCCEEDED',
  PreviousGamePhaseRequested = 'GAMES/GAME/ESTIMATE_PHASE/PREVIOUS_GAME_PHASE_REQUESTED',
  PreviousGamePhaseSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/PREVIOUS_GAME_PHASE_SUCCEEDED',
  AddTaskEstimationRequested = 'GAMES/GAME/ESTIMATE_PHASE/ADD_TASK_ESTIMATION_REQUESTED',
  AddTaskEstimationSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/ADD_TASK_ESTIMATION_SUCCEEDED',
  UpdateTaskEstimationRequested = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_TASK_ESTIMATION_REQUESTED',
  UpdateTaskEstimationSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_TASK_ESTIMATION_SUCCEEDED',
  UpdatePlayerIsDoneEstimatingRequested = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_PLAYER_IS_DONE_ESTIMATING_REQUESTED',
  UpdatePlayerIsDoneEstimatingSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_PLAYER_IS_DONE_ESTIMATING_SUCCEEDED',
  UpdatingPlayerOrderRequested = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_PLAYER_ORDER_REQUESTED',
  UpdatingPlayerOrderSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/UPDATE_PLAYER_ORDER_SUCCEEDED',
  TaskEstimationsSubscribed = 'GAMES/GAME/ESTIMATE_PHASE/TASK_ESTIMATION_SUBSCRIBED',
  TaskEstimationUnsubscribed = 'GAMES/GAME/ESTIMATE_PHASE/TASK_ESTIMATION_UNSUBSCRIBED'
}

// Selectors

export const selectCurrentPlayerTaskEstimations = (
  state: ApplicationState
): TaskEstimation[] =>
  state.firestore.ordered.currentPlayerTaskEstimations || [];

export const selectGameTasks = (state: ApplicationState): Task[] =>
  state.firestore.ordered.currentGameTasks || [];

export const selectEstimationByTaskId = (
  state: ApplicationState,
  taskId: string
) =>
  selectCurrentPlayerTaskEstimations(state).find(
    estimation => estimation.taskId === taskId
  );

export const selectTasksWithEstimation = (
  state: ApplicationState
): TaskWithEstimationViewModel[] => {
  let tasks = selectGameTasks(state);

  return tasks.map(task => {
    return {
      task: task,
      estimation: selectEstimationByTaskId(state, task.id!)
    };
  });
};

// Queries

const getAddEstimationQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'task-estimations' }]
});

const getUpdateEstimationQuery = (
  gameId: string,
  estimationId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'task-estimations', doc: estimationId }]
});

const getGameTasksQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'tasks', orderBy: [['createdAt', 'desc']] }],
  storeAs: 'currentGameTasks'
});

const getCurrentPlayerTaskEstimationsQuery = (
  gameId: string,
  userId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'task-estimations' }],
  storeAs: 'currentPlayerTaskEstimations',
  where: ['playerId', '==', userId]
});

const updateGamePlayerQuery = (
  gameId: string,
  playerId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updateCurrentGamePlayerIsDoneEstimating',
  subcollections: [{ collection: 'players', doc: playerId }]
});

const updatePlayerOrderQuery = (
  gameId: string,
  playerId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updatePlayerOrderId',
  subcollections: [{ collection: 'players', doc: playerId }]
});

// Actions

export const goToPreviousStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.Estimate) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();

  dispatch({ type: EstimatePhaseActionTypes.PreviousGamePhaseRequested });
  await firestore.update(updateGameByIdQuery(game.id!), {
    phase: GamePhase.Setup
  });
  dispatch({ type: EstimatePhaseActionTypes.PreviousGamePhaseSucceeded });
};

export const setNextPhase = async (
  game: Game,
  dispatch: AppThunkDispatch,
  firestore: Firestore
) => {
  if (game.phase !== GamePhase.Estimate) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let phase = { phase: GamePhase.ChoosePlayerOrder };

  dispatch({
    type: EstimatePhaseActionTypes.NextGamePhaseRequested,
    payload: { phase }
  });

  await firestore.update(updateGameByIdQuery(game.id!), phase);
};

const setPlayerOrderByFastest = async (
  gameId: string,
  dispatch: AppThunkDispatch,
  state: ApplicationState,
  firestore: Firestore
) => {
  let players = selectGamePlayers(state);

  let orderedPlayers = [...players].sort(
    (a, b) => a.isDoneEstimatingAt! - b.isDoneEstimatingAt!
  );

  orderedPlayers.forEach((player, index) => {
    let pickOrder = index + 1;

    let updatedPlayer: Partial<GamePlayer> = {
      pickOrder
    };

    dispatch({
      type: EstimatePhaseActionTypes.UpdatingPlayerOrderRequested,
      payload: { ...player, pickOrder }
    });

    firestore.update(updatePlayerOrderQuery(gameId, player.id!), updatedPlayer);
  });
};

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);
  let firestore = getFirestore();

  setNextPhase(game, dispatch, firestore);
  setPlayerOrderByFastest(game.id!, dispatch, state, firestore);
};

export const estimateTask: AppActionCreator = (
  taskId: string,
  estimate: number,
  estimationId?: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let gameId = selectGameId(state);
  let userId = selectCurrentUserId(state);

  let firestore = getFirestore();

  let taskEstimation: TaskEstimation = {
    playerId: userId,
    taskId,
    lastModified: timestamp(firestore),
    estimate
  };

  if (estimationId === undefined) {
    await firestore.add(getAddEstimationQuery(gameId), taskEstimation);

    dispatch({
      type: EstimatePhaseActionTypes.AddTaskEstimationRequested,
      payload: taskEstimation
    });
    return;
  }

  await firestore.update(
    getUpdateEstimationQuery(gameId, estimationId),
    taskEstimation
  );

  dispatch({
    type: EstimatePhaseActionTypes.UpdateTaskEstimationSucceeded
  });
};

export const subscribeToEstimatePhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();

  let userId = selectCurrentUserId(state);

  await firestore.setListeners([
    getCurrentPlayerTaskEstimationsQuery(gameId, userId),
    getGameTasksQuery(gameId)
  ]);
  dispatch({ type: EstimatePhaseActionTypes.TaskEstimationsSubscribed });
};

export const unsubscribeFromEstimatePhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();

  let userId = selectCurrentUserId(state);

  await firestore.unsetListeners([
    getCurrentPlayerTaskEstimationsQuery(gameId, userId),
    getGameTasksQuery(gameId)
  ]);

  dispatch({ type: EstimatePhaseActionTypes.TaskEstimationUnsubscribed });
};

export const updateCurrentPlayerIsDoneEstimating: AppActionCreator = (
  isDoneEstimating: boolean = true
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();

  let gameId = selectGameId(state);
  let userId = selectCurrentUserId(state);

  let updatedPlayer: Partial<GamePlayer> = {
    isDoneEstimating,
    isDoneEstimatingAt: isDoneEstimating
      ? timestamp(firestore)
      : firestore.FieldValue.delete()
  };

  dispatch({
    type: EstimatePhaseActionTypes.UpdatePlayerIsDoneEstimatingRequested,
    payload: { ...updatedPlayer }
  });

  await firestore.update(updateGamePlayerQuery(gameId, userId), updatedPlayer);

  dispatch({
    type: EstimatePhaseActionTypes.UpdatePlayerIsDoneEstimatingSucceeded
  });
};

// Reducer

type Actions =
  | AppAction<EstimatePhaseActionTypes.NextGamePhaseRequested>
  | AppAction<EstimatePhaseActionTypes.NextGamePhaseSucceeded>
  | AppAction<EstimatePhaseActionTypes.PreviousGamePhaseRequested>
  | AppAction<EstimatePhaseActionTypes.PreviousGamePhaseSucceeded>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SetupPhaseState {}

const initialState: SetupPhaseState = {};

export const setupPhaseReducer = (
  state: SetupPhaseState = initialState,
  action: Actions
) => {
  switch (action.type) {
    default:
      return state;
  }
};
