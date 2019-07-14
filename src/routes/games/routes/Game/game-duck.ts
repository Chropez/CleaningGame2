import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import { AppAction } from 'config/redux';

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

// Queries

const getGameByIdQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGame',
  populates: [{ child: 'playerIds', root: 'users' }]
});

const listenToGameQueries = (gameId: string) => [getGameByIdQuery(gameId)];

// Actions

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
  currentGameId: string;
  showAddPlayerDialog: boolean;
  isLoadingAvailablePlayers: boolean;
  isLoadingGame: boolean;
}

const initialState: GameState = {
  showAddPlayerDialog: false,
  currentGameId: '',
  isLoadingAvailablePlayers: false,
  isLoadingGame: false
};

export const gameReducer = (
  state: GameState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case GameActionTypes.GameSubscribed:
      return {
        ...state,
        currentGameId: action.payload.id,
        isLoadingGame: true
      };
    case GameActionTypes.GameUnsubscribed:
      return { ...state, currentGameId: '', isLoadingGame: false };
    default:
      return state;
  }
};
