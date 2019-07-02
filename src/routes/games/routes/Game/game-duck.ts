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
  FetchAvailablePlayersRequest = 'GAMES/GAME/FETCH_AVAILABLE_PLAYERS_REQUEST',
  FetchAvailablePlayersSuccess = 'GAMES/GAME/FETCH_AVAILABLE_PLAYERS_SUCCESS'
}

const getGameByIdQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'activeGame',
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

export const loadAvailablePlayers: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();

  dispatch({ type: GameActionTypes.FetchAvailablePlayersRequest });

  await firestore.get({
    collection: 'users'
  });

  dispatch({ type: GameActionTypes.FetchAvailablePlayersSuccess });
};

// Selectors

export const selectGame = (state: ApplicationState): Game =>
  state.firestore.data.activeGame;

export const selectGamePlayers = (state: ApplicationState): User[] => {
  if (
    !state.firestore.data ||
    !state.firestore.data.activeGame ||
    !state.firestore.data.activeGame.playerIds
  ) {
    return [];
  }

  let playerIds = state.firestore.data.activeGame.playerIds;
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
  state.firestore.ordered && state.firestore.ordered.users
    ? state.firestore.ordered.users
    : [];

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
      .filter(player => player.user.id !== state.firebase.auth.uid)
  );
};

type Actions =
  | AppAction<GameActionTypes.GameSubscribed, { id: string }>
  | AppAction<GameActionTypes.GameUnsubscribed>
  | AppAction<GameActionTypes.ShowAddPlayerDialog>
  | AppAction<GameActionTypes.HideAddPlayerDialog>
  | AppAction<GameActionTypes.FetchAvailablePlayersRequest>
  | AppAction<GameActionTypes.FetchAvailablePlayersSuccess>;

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
      return { ...state, currentGame: action.payload.id };
    case GameActionTypes.GameUnsubscribed:
      return { ...state, currentGame: '' };

    case GameActionTypes.FetchAvailablePlayersRequest:
      return { ...state, isLoadingAvailablePlayers: true };
    case GameActionTypes.FetchAvailablePlayersSuccess:
      return { ...state, isLoadingAvailablePlayers: false };
    default:
      return state;
  }
};
