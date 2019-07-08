import { AppActionCreator, AppThunkDispatch } from 'store';
import Game, { GamePhase } from 'models/game';
import { getId } from 'animal-id';
import Firestore from 'typings/firestore';
import { ApplicationState } from 'store/root-reducer';

enum GamesActionTypes {
  CreateGameRequested = 'GAMES/CREATE_GAME_REQUESTED',
  AllUserGamesSubscribed = 'GAMES/ALL_USER_GAMES_SUBSCRIBED',
  AllUserGamesUnsubscribed = 'GAMES/ALL_USER_GAMES_UNSUBSCRIBED',
  GameNameCheckRequested = 'GAMES/GAME_NAME_CHECK_REQUESTED',
  GameNameWasAvailable = 'GAMES/GAME_NAME_WAS_AVAILABLE',
  GameNameWasUnavailable = 'GAMES/GAME_NAME_WAS_UNAVAILABLE'
}

const getGamesQuery = () => ({
  collection: 'games',
  orderBy: [['createdAt', 'desc']],
  populates: [
    { child: 'createdById', root: 'users' },
    { child: 'playerIds', root: 'users' }
  ]
});

export const subscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesSubscribed });
  getFirestore().setListener(getGamesQuery());
};

export const unsubscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesUnsubscribed });
  getFirestore().unsetListener(getGamesQuery());
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
    playerIds: [userId],
    phase: GamePhase.Setup
  };

  dispatch({
    type: GamesActionTypes.CreateGameRequested,
    payload: { ...game, documentId: gameId }
  });

  firestore.set({ collection: 'games', doc: gameId }, game);
};

// Selectors

export const selectGames = (state: ApplicationState): Game[] =>
  state.firestore.ordered.games;

export const selectUsers = (state: ApplicationState) =>
  state.firestore.data && state.firestore.data.users;
