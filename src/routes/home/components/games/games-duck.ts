import { AppActionCreator, AppThunkDispatch } from 'store';
import Game from 'models/game';
import { getId } from 'animal-id';
import Firestore from 'typings/firestore';
import { ApplicationState } from 'store/root-reducer';

enum GamesActionTypes {
  CreateGameRequest = 'GAMES/CREATE_GAME_REQUEST',
  AllUserGamesSubscribe = 'GAMES/ALL_USER_GAMES_SUBSCRIBE',
  AllUserGamesUnsubscribe = 'GAMES/ALL_USER_GAMES_UNSUBSCRIBE',
  GameNameCheckRequest = 'GAMES/GAME_NAME_CHECK_REQUEST',
  GameNameWasAvailable = 'GAMES/GAME_NAME_WAS_AVAILABLE',
  GameNameWasUnavailable = 'GAMES/GAME_NAME_WAS_UNAVAILABLE'
}

const getGamesQuery = () => ({
  collection: 'games',
  orderBy: [['createdAt', 'desc']],
  populates: [{ child: 'createdById', root: 'users' }]
});

export const subscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesSubscribe });
  getFirestore().setListener(getGamesQuery());
};

export const unsubscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesUnsubscribe });
  getFirestore().unsetListener(getGamesQuery());
};

const getAvailableGameName = async (
  dispatch: AppThunkDispatch,
  firestore: Firestore
): Promise<string> => {
  let gameId = getId();

  dispatch({
    type: GamesActionTypes.GameNameCheckRequest,
    payload: { gameId }
  });

  let game = await firestore.get({
    collection: 'games',
    doc: gameId,
    storeAs: 'availableGameName'
  });

  if (game.exists) {
    dispatch({ type: GamesActionTypes.GameNameWasUnavailable });
    return await getAvailableGameName(dispatch, firestore);
  }

  dispatch({ type: GamesActionTypes.GameNameWasAvailable });
  return gameId;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const makeIdHumanReadable = (gameId: string) => {
  return gameId
    .split('-')
    .map(id => capitalizeFirstLetter(id))
    .join(' ');
};

export const createGame: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let userId = state.firebase.auth.uid;

  let firestore = getFirestore();
  let gameId = await getAvailableGameName(dispatch, firestore);
  let name = makeIdHumanReadable(gameId);

  let game: Game = {
    name,
    createdAt: firestore.Timestamp.now().toMillis(),
    createdById: userId,
    playerIds: [userId]
  };

  dispatch({
    type: GamesActionTypes.CreateGameRequest,
    payload: { ...game, documentId: gameId }
  });

  firestore.set({ collection: 'games', doc: gameId }, game);
};

// Selectors

export const selectGames = (state: ApplicationState): Game[] =>
  state.firestore.ordered.games;

export const selectUsers = (state: ApplicationState) =>
  state.firestore.data && state.firestore.data.users;
