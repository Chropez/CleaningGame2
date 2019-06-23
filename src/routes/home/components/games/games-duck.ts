import { AppActionCreator } from 'store';
import Game from 'models/game';

enum GamesActionTypes {
  CreateGame = 'GAMES_CREATE_GAME',
  SubscribeToGames = 'GAMES_SUBSCRIBE_TO_GAMES',
  UnsubscribeToGames = 'GAMES_UNSUBSCRIBE_TO_GAMES'
}

interface SubscribeToGamesAction {
  type: GamesActionTypes.SubscribeToGames;
}

interface UnsubscribeToGamesAction {
  type: GamesActionTypes.UnsubscribeToGames;
}

interface CreateGameAction {
  type: GamesActionTypes.CreateGame;
}

export const subscribeToGames: AppActionCreator<
  SubscribeToGamesAction
> = () => (_, __, { getFirestore }) =>
  getFirestore().setListener({
    collection: 'games',
    orderBy: [['createdAt', 'desc']],
    populates: [{ child: 'createdById', root: 'users' }]
  });

export const unsubscribeToGames: AppActionCreator<
  UnsubscribeToGamesAction
> = () => (_, __, { getFirestore }) =>
  getFirestore().unsetListener({ collection: 'games' });

export const createGame: AppActionCreator<CreateGameAction> = () => (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let userId = state.firebase.auth.uid;

  let firestore = getFirestore();

  let game: Game = {
    name: 'Game',
    createdAt: firestore.Timestamp.now().toMillis(),
    createdById: userId,
    playerIds: [userId]
  };

  dispatch({ type: GamesActionTypes.CreateGame, payload: game });

  firestore.add({ collection: 'games' }, game);
};
