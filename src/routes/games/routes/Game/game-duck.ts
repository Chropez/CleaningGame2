import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import { AppAction } from 'config/redux';
import { DocumentQuery } from 'typings/firestore';
import GamePlayer from 'models/game-player';
import User from 'models/user';
import { GamePlayerViewModel } from './game-player-view-model';
import { timestamp } from 'utils/firestore';

enum GameActionTypes {
  GameSubscribed = 'GAMES/GAME/GAME_SUBSCRIBED',
  GameUnsubscribed = 'GAMES/GAME/GAME_UNSUBSCRIBED',
  AddGamePlayerRequested = 'GAMES/GAME/ADD_GAME_PLAYER_REQUESTED',
  AddGamePlayerSucceeded = 'GAMES/GAME/ADD_GAME_PLAYER_SUCCEEDED'
}

// Selectors

export const selectCurrentUserId = (state: ApplicationState): string =>
  state.firebase.auth.uid;

export const selectGame = (state: ApplicationState): Game =>
  state.firestore.ordered.currentGame
    ? state.firestore.ordered.currentGame[0]
    : {};

export const selectGameId = (state: ApplicationState): string =>
  selectGame(state).id || '';

export const selectUserById = (state: ApplicationState, userId: string): User =>
  state.firestore.data.users[userId];

export const selectGamePlayers = (state: ApplicationState): GamePlayer[] =>
  state.firestore.ordered.currentGamePlayers;

export const selectGamePlayersViewModel = (
  state: ApplicationState
): GamePlayerViewModel[] =>
  state.firestore.ordered.currentGamePlayers
    ? state.firestore.ordered.currentGamePlayers.map(
        (gamePlayer: GamePlayer) => ({
          ...gamePlayer,
          user: selectUserById(state, gamePlayer.userId)
        })
      )
    : [];

export const selectCurrentPlayer = (state: ApplicationState): GamePlayer => {
  let currentUserId = selectCurrentUserId(state);
  return state.firestore.data.currentGamePlayers
    ? state.firestore.data.currentGamePlayers[currentUserId]
    : undefined;
};

// Queries

const getGameByIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGame'
  // populates: [{ child: 'createdById', root: 'users' }]
});

const getGamePlayersByGameIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGamePlayers',
  populates: [{ child: 'userId', root: 'users' }],
  subcollections: [{ collection: 'players' }]
});

const setGamePlayerQuery = (
  gameId: string,
  playerId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  subcollections: [
    {
      collection: 'players',
      storeAs: 'currentGameAddPlayer',
      doc: playerId
    }
  ]
});

export const updateGameByIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updateGameId'
});

const listenToGameQueries = (gameId: string) => [
  getGameByIdQuery(gameId),
  getGamePlayersByGameIdQuery(gameId)
];

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

export const unsubscribeFromGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameUnsubscribed, payload: gameId });
  let firestore = getFirestore();
  firestore.unsetListeners(listenToGameQueries(gameId));
};

export const addGamePlayer: AppActionCreator = (userId: string) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();

  let firestore = getFirestore();
  let gameId = selectGameId(state);

  let player: GamePlayer = {
    userId,
    createdAt: timestamp(firestore)
  };

  dispatch({
    type: GameActionTypes.AddGamePlayerRequested,
    payload: { ...player, id: userId }
  });

  await firestore.set(setGamePlayerQuery(gameId, userId), player);

  dispatch({
    type: GameActionTypes.AddGamePlayerSucceeded
  });
};

// Reducer

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
