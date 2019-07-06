import { ApplicationState } from 'store/root-reducer';
import { selectGame } from '../../game-duck';
import GamePlayerModel from './game-player-model';
import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import User from 'models/user';

enum PlayerActionTypes {
  ShowAddPlayerDialog = 'GAMES/PLAYERS/SHOW_ADD_PLAYER_DIALOG',
  HideAddPlayerDialog = 'GAMES/PLAYERS/HIDE_ADD_PLAYER_DIALOG',
  FetchAvailablePlayersRequested = 'GAMES/PLAYERS/FETCH_AVAILABLE_PLAYERS_REQUESTED',
  FetchAvailablePlayersSucceeded = 'GAMES/PLAYERS/FETCH_AVAILABLE_PLAYERS_SUCCEEDED',
  AddPlayerToGameRequested = 'GAMES/PLAYERS/ADD_PLAYER_TO_GAME_REQUESTED',
  AddPlayerToGameSucceeded = 'GAMES/PLAYERS/ADD_PLAYER_TO_GAME_SUCCEEDED',
  RemovePlayerFromGameRequested = 'GAMES/PLAYERS/REMOVE_PLAYER_FROM_GAME_REQUESTED',
  RemovePlayerFromGameSucceeded = 'GAMES/PLAYERS/REMOVE_PLAYER_FROM_GAME_SUCCEEDED'
}

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
  state.routes.games.game.players.showAddPlayerDialog;

export const selectIsLoadingAvailablePlayers = (state: ApplicationState) =>
  state.routes.games.game.players.isLoadingAvailablePlayers;

const selectUsers = (state: ApplicationState): User[] =>
  state.firestore.ordered && state.firestore.ordered.currentGameAvailablePlayers
    ? state.firestore.ordered.currentGameAvailablePlayers
    : [];

export const selectCurrentUserId = (state: ApplicationState): string =>
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

export const showAddPlayerDialog: AppActionCreator = () => dispatch => {
  dispatch({ type: PlayerActionTypes.ShowAddPlayerDialog });
};

export const hideAddPlayerDialog: AppActionCreator = () => dispatch =>
  dispatch({ type: PlayerActionTypes.HideAddPlayerDialog });

export const getAvailablePlayers: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();

  dispatch({ type: PlayerActionTypes.FetchAvailablePlayersRequested });

  await firestore.get({
    collection: 'users',
    storeAs: 'currentGameAvailablePlayers'
  });

  dispatch({ type: PlayerActionTypes.FetchAvailablePlayersSucceeded });
};

export const addPlayerToGame: AppActionCreator = (playerId: string) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let firestore = getFirestore();
  let { id: gameId } = selectGame(state);

  dispatch({ type: PlayerActionTypes.AddPlayerToGameRequested });
  await firestore.update(
    { collection: 'games', doc: gameId },
    { playerIds: firestore.FieldValue.arrayUnion(playerId) }
  );

  dispatch({ type: PlayerActionTypes.AddPlayerToGameSucceeded });
};

export const removePlayerFromGame: AppActionCreator = (
  playerId: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();
  let { id: gameId } = selectGame(state);

  dispatch({ type: PlayerActionTypes.RemovePlayerFromGameRequested });
  await firestore.update(
    { collection: 'games', doc: gameId },
    { playerIds: firestore.FieldValue.arrayRemove(playerId) }
  );

  dispatch({ type: PlayerActionTypes.AddPlayerToGameSucceeded });
};

type Actions =
  | AppAction<PlayerActionTypes.ShowAddPlayerDialog>
  | AppAction<PlayerActionTypes.HideAddPlayerDialog>
  | AppAction<PlayerActionTypes.FetchAvailablePlayersRequested>
  | AppAction<PlayerActionTypes.FetchAvailablePlayersSucceeded>;

export interface PlayersState {
  showAddPlayerDialog: boolean;
  isLoadingAvailablePlayers: boolean;
}

const initialState: PlayersState = {
  showAddPlayerDialog: false,
  isLoadingAvailablePlayers: false
};

export const playerReducer = (
  state: PlayersState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case PlayerActionTypes.ShowAddPlayerDialog:
      return { ...state, showAddPlayerDialog: true };
    case PlayerActionTypes.HideAddPlayerDialog:
      return { ...state, showAddPlayerDialog: false };

    case PlayerActionTypes.FetchAvailablePlayersRequested:
      return { ...state, isLoadingAvailablePlayers: true };
    case PlayerActionTypes.FetchAvailablePlayersSucceeded:
      return { ...state, isLoadingAvailablePlayers: false };
    default:
      return state;
  }
};
