import { AppActionCreator } from 'store';
import Game from 'models/game';
import { getId, useAnimals, useAdjectives } from 'animal-id';

enum GamesActionTypes {
  CreateGame = 'GAMES_CREATE_GAME',
  SubscribeToGames = 'GAMES_SUBSCRIBE_TO_GAMES',
  UnsubscribeToGames = 'GAMES_UNSUBSCRIBE_TO_GAMES',
  GetAvailableGameName = 'GAMES_GET_AVAILABLE_GAME_NAME',
  CheckAvailableNameRequest = 'GAMES_CHECK_AVAILABLE_NAME_REQUEST'
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

const getAvailableGameName: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();
  let gameId = getId();

  dispatch({
    type: GamesActionTypes.CheckAvailableNameRequest,
    payload: { gameId }
  });

  // let game =
  await firestore.get({
    collection: 'games',
    doc: gameId,
    storeAs: 'availableGameName'
  });

  // if (game.exists) {
  //   return await getAvailableGameName(firestore);
  // }

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
  useAdjectives(['annoying', 'annoying-p']);
  useAnimals(['parrot']);
  let id = await getAvailableGameName(firestore);
  let game: Game = {
    name: 'Game',
    createdAt: firestore.Timestamp.now().toMillis(),
    createdById: userId,
    playerIds: [userId]
  };

  dispatch({ type: GamesActionTypes.CreateGame, payload: { ...game, id } });

  // firestore.set({ collection: 'games', doc: getId() }, game);
};
