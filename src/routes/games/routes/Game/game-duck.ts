import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import { AppAction } from 'config/redux';
import { DocumentQuery } from 'typings/firestore';
import GamePlayer from 'models/game-player';
import { GamePlayerViewModel } from './view-models/game-player-view-model';
import { timestamp } from 'utils/firestore';
import { createSelector } from 'reselect';
import { selectCurrentUserId } from 'application/selectors';

enum GameActionTypes {
  GameSubscribed = 'GAMES/GAME/GAME_SUBSCRIBED',
  GameUnsubscribed = 'GAMES/GAME/GAME_UNSUBSCRIBED',
  AddGamePlayerRequested = 'GAMES/GAME/ADD_GAME_PLAYER_REQUESTED',
  AddGamePlayerSucceeded = 'GAMES/GAME/ADD_GAME_PLAYER_SUCCEEDED',
  GameMenuOpened = 'GAMES/GAME/GAME_MENU_OPENED',
  GameMenuHidden = 'GAMES/GAME/GAME_MENU_HIDDEN',
}

// Selectors

export const selectGame = (state: ApplicationState): Game | undefined =>
  state.firestore.ordered.currentGame
    ? state.firestore.ordered.currentGame[0]
    : undefined;

export const selectGameId = (state: ApplicationState): string => {
  let game = selectGame(state);
  return game !== undefined && game.id !== undefined ? game.id : '';
};

export const selectUsers = (state: ApplicationState) =>
  state.firestore.data.users;

export const selectUserById = (state: ApplicationState, userId: string) =>
  selectUsers[userId];

export const selectGamePlayers = (state: ApplicationState) =>
  state.firestore.ordered.currentGamePlayers;

export const selectGamePlayersData = (state: ApplicationState) =>
  state.firestore.data.currentGamePlayers;

export const selectGamePlayersViewModel = createSelector(
  [selectGamePlayers, selectUsers],
  (currentGamePlayers, users): GamePlayerViewModel[] =>
    currentGamePlayers === undefined || users === undefined
      ? []
      : currentGamePlayers.map(gamePlayer => ({
          ...gamePlayer,
          user: users[gamePlayer.userId]!,
        }))
);

const selectCurrentGamePlayersData = (state: ApplicationState) =>
  state.firestore.data.currentGamePlayers;

export const selectCurrentPlayer = createSelector(
  [selectCurrentGamePlayersData, selectCurrentUserId],
  (currentGamePlayersData, currentUserId) =>
    currentGamePlayersData !== undefined
      ? currentGamePlayersData[currentUserId]
      : undefined
);

export const selectOrderedPlayersViewModel = createSelector(
  selectGamePlayersViewModel,
  players => [...players].sort((a, b) => a.pickOrder! - b.pickOrder!)
);

export const selectMenuIsOpen = (state: ApplicationState) =>
  state.routes.games.game.main.menuIsOpen;

// Queries

const getGameByIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGame',
});

const getGamePlayersByGameIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGamePlayers',
  populates: [{ child: 'userId', root: 'users' }],
  subcollections: [{ collection: 'players' }],
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
      doc: playerId,
    },
  ],
});

export const updateGameByIdQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updateGameId',
});

const listenToGameQueries = (gameId: string) => [
  getGameByIdQuery(gameId),
  getGamePlayersByGameIdQuery(gameId),
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
    createdAt: timestamp(firestore),
  };

  dispatch({
    type: GameActionTypes.AddGamePlayerRequested,
    payload: { ...player, id: userId },
  });

  await firestore.set(setGamePlayerQuery(gameId, userId), player);

  dispatch({
    type: GameActionTypes.AddGamePlayerSucceeded,
  });
};

export const showMenu: AppActionCreator = () => dispatch =>
  dispatch({ type: GameActionTypes.GameMenuOpened });

export const hideMenu: AppActionCreator = () => dispatch =>
  dispatch({ type: GameActionTypes.GameMenuHidden });

// Reducer

type Actions =
  | AppAction<GameActionTypes.GameSubscribed, { id: string }>
  | AppAction<GameActionTypes.GameUnsubscribed>
  | AppAction<GameActionTypes.GameMenuOpened>
  | AppAction<GameActionTypes.GameMenuHidden>;

export interface GameState {
  currentGameId: string;
  showAddPlayerDialog: boolean;
  isLoadingAvailablePlayers: boolean;
  isLoadingGame: boolean;
  menuIsOpen: boolean;
}

const initialState: GameState = {
  showAddPlayerDialog: false,
  currentGameId: '',
  isLoadingAvailablePlayers: false,
  isLoadingGame: false,
  menuIsOpen: false,
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
        isLoadingGame: true,
      };
    case GameActionTypes.GameUnsubscribed:
      return { ...state, currentGameId: '', isLoadingGame: false };
    case GameActionTypes.GameMenuOpened:
      return { ...state, menuIsOpen: true };
    case GameActionTypes.GameMenuHidden:
      return { ...state, menuIsOpen: false };
    default:
      return state;
  }
};
