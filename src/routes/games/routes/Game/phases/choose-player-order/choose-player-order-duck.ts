import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import {
  selectGame,
  updateGameByIdQuery,
  selectGamePlayersViewModel,
  selectGameId,
  selectGamePlayers
} from '../../game-duck';
import { DocumentQuery } from 'typings/firestore';
import { ApplicationState } from 'store/root-reducer';
import { GamePlayerViewModel } from '../../game-player-view-model';
import GamePlayer from 'models/game-player';

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

export const selectOrderedPlayersViewModel = (
  state: ApplicationState
): GamePlayerViewModel[] => {
  let players = selectGamePlayersViewModel(state);
  return [...players].sort((a, b) => a.pickOrder! - b.pickOrder!);
};

// Queries

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

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.ChoosePlayerOrder) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.ChoosePlayerOrder }; // todo next

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
  let game = selectGame(state);

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
