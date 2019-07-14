import { ApplicationState } from 'store/root-reducer';
import AvailableGamePlayerModel from './available-game-player-view-model';
import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import User from 'models/user';
import {
  selectGamePlayers,
  selectGameId
} from 'routes/games/routes/Game/game-duck';
import { DocumentQuery } from 'typings/firestore';
import GamePlayer from 'models/game-player';

enum PlayerActionTypes {
  ShowAddPlayerDialog = 'GAMES/GAME/PLAYERS/SHOW_ADD_PLAYER_DIALOG',
  HideAddPlayerDialog = 'GAMES/GAME/PLAYERS/HIDE_ADD_PLAYER_DIALOG',
  FetchAvailablePlayersRequested = 'GAMES/GAME/PLAYERS/FETCH_AVAILABLE_PLAYERS_REQUESTED',
  FetchAvailablePlayersSucceeded = 'GAMES/GAME/PLAYERS/FETCH_AVAILABLE_PLAYERS_SUCCEEDED',
  AddPlayerToGameRequested = 'GAMES/GAME/PLAYERS/ADD_PLAYER_TO_GAME_REQUESTED',
  AddPlayerToGameSucceeded = 'GAMES/GAME/PLAYERS/ADD_PLAYER_TO_GAME_SUCCEEDED',
  RemovePlayerFromGameRequested = 'GAMES/GAME/PLAYERS/REMOVE_PLAYER_FROM_GAME_REQUESTED',
  RemovePlayerFromGameSucceeded = 'GAMES/GAME/PLAYERS/REMOVE_PLAYER_FROM_GAME_SUCCEEDED'
}

// Selectors

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
): AvailableGamePlayerModel[] => {
  let gamePlayers = selectGamePlayers(state);

  return (
    selectUsers(state)
      .map((user: User) => ({
        user,
        addedToGame:
          gamePlayers.find(gamePlayer => gamePlayer.userId === user.id) !==
          undefined
      }))

      // Remove your own user
      .filter(player => player.user.id !== selectCurrentUserId(state))
  );
};

// Queries

export const setPlayerToGameQuery = (
  gameId: string,
  userId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'setPlayerToGame',
  subcollections: [{ collection: 'players', doc: userId }]
});

export const deletePlayerFromGameQuery = (
  gameId: string,
  userId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'removePlayerToGame',
  subcollections: [{ collection: 'players', doc: userId }]
});

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

export const addPlayerToGame: AppActionCreator = (
  gameId: string,
  userId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  let player: GamePlayer = {
    userId,
    isDoneEstimating: false,
    createdAt: firestore.Timestamp.now().toMillis()
  };

  dispatch({
    type: PlayerActionTypes.AddPlayerToGameRequested,
    payload: { ...player }
  });

  await firestore.set(setPlayerToGameQuery(gameId, userId), player);

  dispatch({ type: PlayerActionTypes.AddPlayerToGameSucceeded });
};

export const removePlayerFromGame: AppActionCreator = (
  playerId: string
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let firestore = getFirestore();
  let gameId = selectGameId(state);

  dispatch({ type: PlayerActionTypes.RemovePlayerFromGameRequested });

  await firestore.delete(deletePlayerFromGameQuery(gameId, playerId));

  dispatch({ type: PlayerActionTypes.RemovePlayerFromGameSucceeded });
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
