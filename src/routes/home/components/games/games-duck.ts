import { AppActionCreator, AppThunkDispatch } from 'store';
import Game, { GamePhase } from 'models/game';
import { getId } from 'animal-id';
import Firestore from 'typings/firestore';
import { ApplicationState } from 'store/root-reducer';
import { addPlayerToGame } from 'routes/games/routes/Game/phases/setup/players/players-duck';
import { timestamp } from 'utils/firestore';
import * as H from 'history';

enum GamesActionTypes {
  CreateGameRequested = 'GAMES/CREATE_GAME_REQUESTED',
  CreateGameSucceeded = 'GAMES/CREATE_GAME_SUCCEEDED',
  AllUserGamesSubscribed = 'GAMES/ALL_USER_GAMES_SUBSCRIBED',
  AllUserGamesUnsubscribed = 'GAMES/ALL_USER_GAMES_UNSUBSCRIBED',
  GameNameCheckRequested = 'GAMES/GAME_NAME_CHECK_REQUESTED',
  GameNameWasAvailable = 'GAMES/GAME_NAME_WAS_AVAILABLE',
  GameNameWasUnavailable = 'GAMES/GAME_NAME_WAS_UNAVAILABLE'
}

// Selectors

export const selectGames = (state: ApplicationState): Game[] =>
  state.firestore.ordered.games || [];

export const selectUsers = (state: ApplicationState) =>
  state.firestore.data && state.firestore.data.users;

// Queries

const getGamesQuery = () => ({
  collection: 'games',
  orderBy: [['createdAt', 'desc']],
  populates: [
    { child: 'createdById', root: 'users' },
    { child: 'players', root: 'players' }
  ]
});
const getPlayersQuery = () => ({
  collection: 'players'
});

// Actions

export const subscribeToGames: AppActionCreator = () => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GamesActionTypes.AllUserGamesSubscribed });
  const firestore = getFirestore();
  firestore.setListeners([getGamesQuery(), getPlayersQuery()]);
};

export const unsubscribeFromGames: AppActionCreator = () => (
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

export const createGame: AppActionCreator = (history: H.History) => async (
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
    createdAt: timestamp(firestore),
    createdById: userId,
    phase: GamePhase.Setup
  };

  dispatch({
    type: GamesActionTypes.CreateGameRequested,
    payload: { ...game, documentId: gameId }
  });

  await firestore.set({ collection: 'games', doc: gameId }, game);

  dispatch({
    type: GamesActionTypes.CreateGameSucceeded
  });

  dispatch(addPlayerToGame(gameId, userId));

  history.push(`/games/${gameId}`);
};
