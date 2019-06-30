import { AppActionCreator } from 'store';
import Game from 'models/game';
import { ApplicationState } from 'store/root-reducer';
import User from 'models/user';

enum GameActionTypes {
  GameSubscribed = 'GAME_GAME_SUBSCRIBED',
  GameUnsubscribed = 'GAME_GAME_UNSUBSCRIBED'
}

export const subscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameSubscribed, payload: gameId });
  let firestore = getFirestore();
  firestore.setListener({
    collection: 'games',
    doc: gameId,
    storeAs: 'activeGame',
    populates: [{ child: 'playerIds', root: 'users' }]
  });
};

export const unsubscribeToGame: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({ type: GameActionTypes.GameUnsubscribed, payload: gameId });
  let firestore = getFirestore();
  firestore.unsetListener({
    collection: 'games',
    doc: gameId,
    storeAs: 'activeGame',
    populates: [{ child: 'playerIds', root: 'users' }]
  });
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
  return playerIds.map((id: string) => state.firestore.data.users[id]);
};
