import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import {
  selectGame,
  updateGameByIdQuery,
  selectGamePlayersViewModel,
  selectCurrentPlayer,
  selectGameId
} from '../../game-duck';
import { DocumentQuery } from 'typings/firestore';
import { createSelector } from 'reselect';
import { GamePlayerViewModel } from '../../view-models/game-player-view-model';
import Task from 'models/task';
import {
  getGameTasksQuery,
  selectTasksViewModel
} from '../../duck-helpers/current-game-tasks';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';

enum ChooseTasksActionTypes {
  NextGamePhaseRequested = 'GAMES/GAME/CHOOSE_TASKS/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_TASKS/NEXT_GAME_PHASE_SUCCEEDED',
  PreviousGamePhaseRequested = 'GAMES/GAME/CHOOSE_TASKS/PREVIOUS_GAME_PHASE_REQUESTED',
  PreviousGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_TASKS/PREVIOUS_GAME_PHASE_SUCCEEDED',
  ChooseTaskRequested = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASK_REQUESTED',
  ChooseTaskSucceeded = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASK_SUCCEEDED',
  ChooseTasksPhaseSubscribed = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASKS_PHASE_SUBSCRIBED',
  ChooseTasksPhaseUnsubscribed = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASKS_PHASE_UNSUBSCRIBED'
}

// Selectors

export {
  selectTasksViewModel,
  selectTotalEstimationPoints,
  selectMinEstimationPointsPerPlayer,
  selectMaxEstimationPointsPerPlayer
} from '../../duck-helpers/current-game-tasks';

export const selectTotalTasks = createSelector(
  [selectTasksViewModel],
  tasks => tasks.length
);

export const selectAvailableTasksViewModel = createSelector(
  selectTasksViewModel,
  tasks => tasks.filter(task => !task.assigneePlayerId)
);

export const selectTasksForPlayer = createSelector(
  [selectTasksViewModel, selectGamePlayersViewModel],
  (tasks, players): PlayerTasksViewModel[] =>
    players.map(player => ({
      ...player,
      tasks: tasks.filter(task => task.assigneePlayerId === player.id)
    }))
);

export const selectPlayerTurn = createSelector(
  [selectTasksViewModel, selectGamePlayersViewModel],
  (tasks, players): GamePlayerViewModel => {
    let chosenTasks = tasks.filter(task => task.assigneePlayerId);
    let playerTurn = (chosenTasks.length + 1) % players.length;

    if (playerTurn === 0) {
      return players.find(player => player.pickOrder === players.length)!;
    }

    return players.find(player => player.pickOrder === playerTurn)!;
  }
);

// Queries

const getAllPlayersTaskEstimationsQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'task-estimations' }],
  storeAs: 'allPlayersTaskEstimations'
});

const getChooseTasksQueries = (gameId: string): DocumentQuery[] => [
  getGameTasksQuery(gameId),
  getAllPlayersTaskEstimationsQuery(gameId)
];

export const updateTaskQuery = (
  gameId: string,
  taskId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updateChooseTask',
  subcollections: [
    {
      collection: 'tasks',
      doc: taskId
    }
  ]
});

// Actions

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state)!;

  if (game.phase !== GamePhase.ChooseTasks) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.ChooseTasks }; // todo next

  dispatch({
    type: ChooseTasksActionTypes.NextGamePhaseRequested,
    payload: { phase }
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
  dispatch({ type: ChooseTasksActionTypes.NextGamePhaseSucceeded });
};

export const goToPreviousStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state)!;

  if (game.phase !== GamePhase.ChooseTasks) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.ChoosePlayerOrder };

  dispatch({
    type: ChooseTasksActionTypes.PreviousGamePhaseRequested,
    payload: phase
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
  dispatch({ type: ChooseTasksActionTypes.PreviousGamePhaseSucceeded });
};

export const subscribeToChooseTasksPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();
  await firestore.setListeners(getChooseTasksQueries(gameId));

  dispatch({
    type: ChooseTasksActionTypes.ChooseTasksPhaseSubscribed
  });
};

export const chooseTask: AppActionCreator = (taskId: string) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let firestore = getFirestore();
  let gameId = selectGameId(state)!;
  let player = selectCurrentPlayer(state)!;

  let assignee: Partial<Task> = { assigneePlayerId: player.userId };

  dispatch({
    type: ChooseTasksActionTypes.ChooseTaskRequested,
    payload: assignee
  });

  await firestore.update(updateTaskQuery(gameId, taskId), assignee);

  dispatch({ type: ChooseTasksActionTypes.ChooseTaskSucceeded });
};

export const unsubscribeFromChooseTasksPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();
  await firestore.unsetListeners(getChooseTasksQueries(gameId));

  dispatch({
    type: ChooseTasksActionTypes.ChooseTasksPhaseUnsubscribed
  });
};

// Reducer

type Actions =
  | AppAction<ChooseTasksActionTypes.NextGamePhaseRequested>
  | AppAction<ChooseTasksActionTypes.NextGamePhaseSucceeded>
  | AppAction<ChooseTasksActionTypes.PreviousGamePhaseRequested>
  | AppAction<ChooseTasksActionTypes.PreviousGamePhaseSucceeded>;

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
