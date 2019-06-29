import { AppActionCreator, AppThunkDispatch } from 'store';
import Game from 'models/game';
import { getId } from 'animal-id';
import Firestore from 'typings/firestore';

enum GamesActionTypes {
  CreateGame = 'GAMES_CREATE_GAME',
  SubscribeToGames = 'GAMES_SUBSCRIBE_TO_GAMES',
  UnsubscribeToGames = 'GAMES_UNSUBSCRIBE_TO_GAMES',
  GetAvailableGameName = 'GAMES_GET_AVAILABLE_GAME_NAME',
  GameNameCheckRequested = 'GAMES_GAME_NAME_CHECK_REQUESTED',
  GameNameAvailable = 'GAMES_GAME_NAME_AVAILABLE',
  GameNameUnavailable = 'GAMES_GAME_NAME_UNAVAILABLE'
}

export const subscribeToGames: AppActionCreator = () => (
  _,
  __,
  { getFirestore }
) => {
  getFirestore().setListener({
    collection: 'games',
    orderBy: [['createdAt', 'desc']],
    populates: [{ child: 'createdById', root: 'users' }]
  });
};

export const unsubscribeToGames: AppActionCreator = () => (
  _,
  __,
  { getFirestore }
) => getFirestore().unsetListener({ collection: 'games' });

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
    dispatch({ type: GamesActionTypes.GameNameUnavailable });
    return await getAvailableGameName(dispatch, firestore);
  }

  dispatch({ type: GamesActionTypes.GameNameAvailable });
  return gameId;
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

  let game: Game = {
    name: 'Game',
    createdAt: firestore.Timestamp.now().toMillis(),
    createdById: userId,
    playerIds: [userId]
  };

  dispatch({
    type: GamesActionTypes.CreateGame,
    payload: { ...game, documentId: gameId }
  });

  firestore.set({ collection: 'games', doc: getId() }, game);
};
