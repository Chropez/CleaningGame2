import { AppActionCreator, AppThunkDispatch } from 'store';
import Game from 'models/game';
import { getId } from 'animal-id';
import Firestore from 'typings/firestore';

enum GamesActionTypes {
  CreateGameRequested = 'GAMES_CREATE_GAME_REQUESTED',
  AllUserGamesSubscribed = 'GAMES_ALL_USER_GAMES_SUBSCRIBED',
  AllUserGamesUnsubscribed = 'GAMES_ALL_USER_GAMES_UNSUBSCRIBED',
  GameNameCheckRequested = 'GAMES_GAME_NAME_CHECK_REQUESTED',
  GameNameWasAvailable = 'GAMES_GAME_NAME_WAS_AVAILABLE',
  GameNameWasUnavailable = 'GAMES_GAME_NAME_WAS_UNAVAILABLE'
}

export const subscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesSubscribed });
  getFirestore().setListener({
    collection: 'games',
    orderBy: [['createdAt', 'desc']],
    populates: [{ child: 'createdById', root: 'users' }]
  });
};

export const unsubscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesUnsubscribed });
  getFirestore().unsetListener({ collection: 'games' });
};

const getAvailableGameName = async (
  dispatch: AppThunkDispatch,
  firestore: Firestore
): Promise<string> => {
  let gameId = getId();

  dispatch({
    type: GamesActionTypes.GameNameCheckRequested,
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

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeIdHumanReadable(gameId: string) {
  return gameId
    .split('-')
    .map(id => capitalizeFirstLetter(id))
    .join(' ');
}

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
    type: GamesActionTypes.CreateGameRequested,
    payload: { ...game, documentId: gameId }
  });

  firestore.set({ collection: 'games', doc: gameId }, game);
};
