import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import { AppAction } from 'config/redux';
import Task from 'models/task';

enum GameActionTypes {
  GameSubscribed = 'GAMES/GAME/GAME_SUBSCRIBED',
  GameUnsubscribed = 'GAMES/GAME/GAME_UNSUBSCRIBED'
}

// Selectors

export const selectGame = (state: ApplicationState): Game =>
  state.firestore.ordered.currentGame
    ? state.firestore.ordered.currentGame[0]
    : {};

export const selectGameId = (state: ApplicationState): string =>
  selectGame(state).id || '';

export const selectGameTasks = (state: ApplicationState): Task[] =>
  state.firestore.ordered.currentGameTasks || [];

// Actions

const getGameByIdQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGame',
  populates: [{ child: 'playerIds', root: 'users' }]
});

const getGameTasksQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'tasks', orderBy: [['createdAt', 'desc']] }],
  storeAs: 'currentGameTasks'
});

const listenToGameQueries = (gameId: string) => [
  getGameByIdQuery(gameId),
  getGameTasksQuery(gameId)
];

export const subscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameSubscribed, payload: { id: gameId } });
  let firestore = getFirestore();
  firestore.setListeners(listenToGameQueries(gameId));
};

export const unsubscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameUnsubscribed, payload: gameId });
  let firestore = getFirestore();
  firestore.unsetListeners(listenToGameQueries(gameId));
};

type Actions =
  | AppAction<GameActionTypes.GameSubscribed, { id: string }>
  | AppAction<GameActionTypes.GameUnsubscribed>;

export interface GameState {
  currentGame: string;
  showAddPlayerDialog: boolean;
  isLoadingAvailablePlayers: boolean;
}

const initialState: GameState = {
  showAddPlayerDialog: false,
  currentGame: '',
  isLoadingAvailablePlayers: false
};

export const gameReducer = (
  state: GameState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case GameActionTypes.GameSubscribed:
      return { ...state, currentGameId: action.payload.id };
    case GameActionTypes.GameUnsubscribed:
      return { ...state, currentGame: '' };
    default:
      return state;
  }
};
