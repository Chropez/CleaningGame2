import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import {
  selectGame,
  updateGameByIdQuery,
  selectGamePlayersViewModel,
  selectGameId,
  selectGamePlayers,
  selectGamePlayersData
} from '../../game-duck';
import { DocumentQuery } from 'typings/firestore';
import { ApplicationState } from 'store/root-reducer';
import GamePlayer from 'models/game-player';
import TasksViewModel from '../../view-models/tasks-view-model';
import { createSelector } from 'reselect';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';

enum ChoosePlayerOrderActionTypes {
  NextGamePhaseRequested = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/NEXT_GAME_PHASE_SUCCEEDED',
  PreviousGamePhaseRequested = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/PREVIOUS_GAME_PHASE_REQUESTED',
  PreviousGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/PREVIOUS_GAME_PHASE_SUCCEEDED',
  ChangePlayerOrderRequested = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/CHANGE_PLAYER_ORDER_REQUESTED',
  ChangePlayerOrderSucceeded = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/CHANGE_PLAYER_ORDER_SUCCEEDED',
  ChoosePlayerOrderPhaseSubscribed = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/CHOOSE_PLAYER_ORDER_PHASE_SUBSCRIBED',
  ChoosePlayerOrderPhaseUnsubscribed = 'GAMES/GAME/CHOOSE_PLAYER_ORDER/CHOOSE_PLAYER_ORDER_PHASE_UNSUBSCRIBED'
}

// Selectors
export const selectOrderedPlayersViewModel = createSelector(
  selectGamePlayersViewModel,
  players => [...players].sort((a, b) => a.pickOrder! - b.pickOrder!)
);

const selectCurrentGameTasks = (state: ApplicationState) =>
  state.firestore.data.currentGameTasks;

const selectOrderedCurrentGameTasks = (state: ApplicationState) =>
  state.firestore.ordered.currentGameTasks;

const selectAllPlayersTaskEstimations = (state: ApplicationState) =>
  state.firestore.ordered.allPlayersTaskEstimations;

export const selectTasksViewModel = createSelector(
  [
    selectCurrentGameTasks,
    selectAllPlayersTaskEstimations,
    selectOrderedCurrentGameTasks,
    selectGamePlayersData
  ],
  (gameTasks, allPlayersTaskEstimations, orderedTasks, gamePlayersData) => {
    if (
      gameTasks === undefined ||
      allPlayersTaskEstimations === undefined ||
      gamePlayersData === undefined
    ) {
      return [];
    }

    let tasks: Record<string, TasksViewModel | undefined> = JSON.parse(
      JSON.stringify(gameTasks)
    );

    allPlayersTaskEstimations.forEach(taskEstimation => {
      let task = tasks[taskEstimation.taskId!]!;
      if (task === undefined) {
        return;
      }

      if (task.estimations) {
        task.estimations.push(taskEstimation);
        return;
      }

      if (task.assigneePlayerId) {
        task.assignee = gamePlayersData[task.assigneePlayerId];
      }

      task.estimations = [taskEstimation];
    });

    return orderedTasks
      .filter(orderedTask => tasks[orderedTask.id!] !== undefined)
      .map(orderedTask => {
        let taskVM = tasks[orderedTask.id!] as TasksViewModel;

        taskVM.id = orderedTask.id!;
        if (taskVM.estimations === undefined) {
          taskVM.averageEstimate = 0;
          return taskVM;
        }

        let sum = taskVM.estimations.reduce(
          (accumulator, task) => accumulator + task.estimate,
          0
        );

        taskVM.averageEstimate = sum > 0 ? sum / taskVM.estimations.length : 0;

        return taskVM;
      });
  }
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

// Queries

const updatePlayerOrderQuery = (
  gameId: string,
  playerId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updatePlayerOrderId',
  subcollections: [{ collection: 'players', doc: playerId }]
});

const getAllPlayersTaskEstimationsQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'task-estimations' }],
  storeAs: 'allPlayersTaskEstimations'
});

const getGameTasksQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'tasks', orderBy: [['createdAt', 'desc']] }],
  storeAs: 'currentGameTasks'
});

const getChoosePlayerOrderPhaseQueries = (gameId: string): DocumentQuery[] => [
  getAllPlayersTaskEstimationsQuery(gameId),
  getGameTasksQuery(gameId)
];

// Actions

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state)!;

  if (game.phase !== GamePhase.ChoosePlayerOrder) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.ChooseTasks }; // todo next

  dispatch({
    type: ChoosePlayerOrderActionTypes.NextGamePhaseRequested,
    payload: { phase }
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
};

export const goToPreviousStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state)!;

  if (game.phase !== GamePhase.ChoosePlayerOrder) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.Estimate };

  dispatch({
    type: ChoosePlayerOrderActionTypes.PreviousGamePhaseRequested,
    payload: phase
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
  dispatch({ type: ChoosePlayerOrderActionTypes.PreviousGamePhaseSucceeded });
};

export const changePlayerPickingOrder: AppActionCreator = (
  playerId: string,
  destinationPickOrder: number
) => (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let gameId = selectGameId(state);
  let players = selectGamePlayers(state);

  let selectedPlayerPickOrder = players.find(player => player.id === playerId)!
    .pickOrder!;

  if (destinationPickOrder === selectedPlayerPickOrder) {
    return;
  }

  let firestore = getFirestore();

  players.forEach(player => {
    let currentPlayerOrder = player.pickOrder!;

    let minOrderToChange = Math.min(
      selectedPlayerPickOrder,
      destinationPickOrder
    );
    let maxOrderToChange = Math.max(
      selectedPlayerPickOrder,
      destinationPickOrder
    );

    // Player does not need to change order
    if (
      currentPlayerOrder < minOrderToChange ||
      currentPlayerOrder > maxOrderToChange
    ) {
      return;
    }

    let newPickOrder = currentPlayerOrder;

    if (currentPlayerOrder === selectedPlayerPickOrder) {
      newPickOrder = destinationPickOrder;
    } else if (selectedPlayerPickOrder < destinationPickOrder) {
      newPickOrder--;
    } else {
      newPickOrder++;
    }

    let updatedPlayer: Partial<GamePlayer> = {
      pickOrder: newPickOrder
    };

    dispatch({
      type: ChoosePlayerOrderActionTypes.ChangePlayerOrderRequested,
      payload: { player, updatedPlayer }
    });

    firestore.update(updatePlayerOrderQuery(gameId, player.id!), updatedPlayer);
  });
};

export const subscribeToChoosePlayerOrderPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  await firestore.setListeners(getChoosePlayerOrderPhaseQueries(gameId));

  dispatch({
    type: ChoosePlayerOrderActionTypes.ChoosePlayerOrderPhaseSubscribed
  });
};

export const unsubscribeFromChoosePlayerOrderPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  await firestore.unsetListeners(getChoosePlayerOrderPhaseQueries(gameId));

  dispatch({
    type: ChoosePlayerOrderActionTypes.ChoosePlayerOrderPhaseUnsubscribed
  });
};

// Reducer

type Actions =
  | AppAction<ChoosePlayerOrderActionTypes.NextGamePhaseRequested>
  | AppAction<ChoosePlayerOrderActionTypes.NextGamePhaseSucceeded>
  | AppAction<ChoosePlayerOrderActionTypes.PreviousGamePhaseRequested>
  | AppAction<ChoosePlayerOrderActionTypes.PreviousGamePhaseSucceeded>;

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
