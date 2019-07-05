import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import User from 'models/user';
import { AppAction } from 'config/redux';
import GamePlayerModel from './game-player-model';

enum GameActionTypes {
  GameSubscribed = 'GAMES/GAME/GAME_SUBSCRIBED',
  GameUnsubscribed = 'GAMES/GAME/GAME_UNSUBSCRIBED',
  ShowAddPlayerDialog = 'GAMES/GAME/SHOW_ADD_PLAYER_DIALOG',
  HideAddPlayerDialog = 'GAMES/GAME/HIDE_ADD_PLAYER_DIALOG',
  FetchAvailablePlayersRequested = 'GAMES/GAME/FETCH_AVAILABLE_PLAYERS_REQUESTED',
  FetchAvailablePlayersSucceeded = 'GAMES/GAME/FETCH_AVAILABLE_PLAYERS_SUCCEEDED',
  AddPlayerToGameRequested = 'GAMES/GAME/ADD_PLAYER_TO_GAME_REQUESTED',
  AddPlayerToGameSucceeded = 'GAMES/GAME/ADD_PLAYER_TO_GAME_SUCCEEDED',
  RemovePlayerFromGameRequested = 'GAMES/GAME/REMOVE_PLAYER_FROM_GAME_REQUESTED',
  RemovePlayerFromGameSucceeded = 'GAMES/GAME/REMOVE_PLAYER_FROM_GAME_SUCCEEDED'
}
// Selectors

export const selectGame = (state: ApplicationState): Game =>
  state.firestore.data.currentGame
    ? state.firestore.ordered.currentGame[0]
    : state.firestore.data.currentGame;

export const selectGamePlayers = (state: ApplicationState): User[] => {
  if (
    !state.firestore.data ||
    !state.firestore.data.currentGame ||
    !state.firestore.data.currentGame.playerIds
  ) {
    return [];
  }

  let playerIds = state.firestore.data.currentGame.playerIds;
  return playerIds
    .map((id: string) => {
      let player = state.firestore.data.users[id];
      return { ...player, id };
    })
    .filter((p: User) => p !== undefined);
};

export const selectShowAddPlayerModal = (state: ApplicationState) =>
  state.routes.games.game.showAddPlayerDialog;

export const selectIsLoadingAvailablePlayers = (state: ApplicationState) =>
  state.routes.games.game.isLoadingAvailablePlayers;

const selectUsers = (state: ApplicationState): User[] =>
  state.firestore.ordered && state.firestore.ordered.currentGameAvailablePlayers
    ? state.firestore.ordered.currentGameAvailablePlayers
    : [];

export const selectCurrentUserId = (state: ApplicationState) =>
  state.firebase.auth.uid;

export const selectAvailablePlayers = (
  state: ApplicationState
): GamePlayerModel[] => {
  let game = selectGame(state);
  return (
    selectUsers(state)
      .map((user: User) => ({
        user,
        addedToGame:
          game.playerIds !== undefined && game.playerIds.includes(user.id)
      }))

      // Remove your own user
      .filter(player => player.user.id !== selectCurrentUserId(state))
  );
};

// Actions
const getGameByIdQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'currentGame',
  populates: [{ child: 'playerIds', root: 'users' }]
});

export const subscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameSubscribed, payload: { id: gameId } });
  let firestore = getFirestore();
  firestore.setListener(getGameByIdQuery(gameId));
};

export const unsubscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameUnsubscribed, payload: gameId });
  let firestore = getFirestore();
  firestore.unsetListener(getGameByIdQuery(gameId));
};

export const showAddPlayerDialog: AppActionCreator = () => dispatch => {
  dispatch({ type: GameActionTypes.ShowAddPlayerDialog });
};

export const hideAddPlayerDialog: AppActionCreator = () => dispatch =>
  dispatch({ type: GameActionTypes.HideAddPlayerDialog });

export const getAvailablePlayers: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();

  dispatch({ type: GameActionTypes.FetchAvailablePlayersRequested });

  await firestore.get({
    collection: 'users',
    storeAs: 'currentGameAvailablePlayers'
  });

  dispatch({ type: GameActionTypes.FetchAvailablePlayersSucceeded });
};

export const addPlayerToGame: AppActionCreator = (playerId: string) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let firestore = getFirestore();
  let { id: gameId } = selectGame(state);

  dispatch({ type: GameActionTypes.AddPlayerToGameRequested });
  await firestore.update(
    { collection: 'games', doc: gameId },
    { playerIds: firestore.FieldValue.arrayUnion(playerId) }
  );

  dispatch({ type: GameActionTypes.AddPlayerToGameSucceeded });
};

export const removePlayerFromGame: AppActionCreator = (
  playerId: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();
  let { id: gameId } = selectGame(state);

  dispatch({ type: GameActionTypes.RemovePlayerFromGameRequested });
  await firestore.update(
    { collection: 'games', doc: gameId },
    { playerIds: firestore.FieldValue.arrayRemove(playerId) }
  );

  dispatch({ type: GameActionTypes.AddPlayerToGameSucceeded });
};

type Actions =
  | AppAction<GameActionTypes.GameSubscribed, { id: string }>
  | AppAction<GameActionTypes.GameUnsubscribed>
  | AppAction<GameActionTypes.ShowAddPlayerDialog>
  | AppAction<GameActionTypes.HideAddPlayerDialog>
  | AppAction<GameActionTypes.FetchAvailablePlayersRequested>
  | AppAction<GameActionTypes.FetchAvailablePlayersSucceeded>;

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
    case GameActionTypes.ShowAddPlayerDialog:
      return { ...state, showAddPlayerDialog: true };
    case GameActionTypes.HideAddPlayerDialog:
      return { ...state, showAddPlayerDialog: false };

    case GameActionTypes.GameSubscribed:
      return { ...state, currentGameId: action.payload.id };
    case GameActionTypes.GameUnsubscribed:
      return { ...state, currentGame: '' };

    case GameActionTypes.FetchAvailablePlayersRequested:
      return { ...state, isLoadingAvailablePlayers: true };
    case GameActionTypes.FetchAvailablePlayersSucceeded:
      return { ...state, isLoadingAvailablePlayers: false };
    default:
      return state;
  }
};
