import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import { selectGame } from '../../game-duck';
import { ApplicationState } from 'store/root-reducer';
import Task from 'models/task';

enum SetupPhaseTypes {
  GameTasksSubscribed = 'GAMES/GAME/SETUP_PHASE/TASKS_SUBSCRIBED',
  GameTasksUnsubscribed = 'GAMES/GAME/SETUP_PHASE/TASKS_UNSUBSCRIBED',
  NextGamePhaseRequested = 'GAMES/GAME/SETUP_PHASE/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/SETUP_PHASE/NEXT_GAME_PHASE_SUCCEEDED'
}

// Selectors

export const selectGameTasks = (state: ApplicationState): Task[] =>
  state.firestore.ordered.currentGameTasks || [];

// Actions

const getGameTasksQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'tasks', orderBy: [['createdAt', 'desc']] }],
  storeAs: 'currentGameTasks'
});

export const subscribeToGameTasks: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({
    type: SetupPhaseTypes.GameTasksSubscribed,
    payload: { id: gameId }
  });
  let firestore = getFirestore();
  firestore.setListener(getGameTasksQuery(gameId));
};

export const unsubscribeToGameTasks: AppActionCreator = (gameId: string) => (
  dispatch,
  _,
  { getFirestore }
) => {
  dispatch({
    type: SetupPhaseTypes.GameTasksSubscribed,
    payload: { id: gameId }
  });
  let firestore = getFirestore();
  firestore.unsetListener(getGameTasksQuery(gameId));
};

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.Setup) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();

  dispatch({ type: SetupPhaseTypes.NextGamePhaseRequested });
  await firestore.update(
    { collection: 'games', doc: game.id },
    { phase: GamePhase.Estimate }
  );
  dispatch({ type: SetupPhaseTypes.NextGamePhaseSucceeded });
};

// Reducer

type Actions =
  | AppAction<SetupPhaseTypes.NextGamePhaseRequested>
  | AppAction<SetupPhaseTypes.NextGamePhaseSucceeded>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SetupPhaseState {}

const initialState: SetupPhaseState = {};

export const setupPhaseReducer = (
  state: SetupPhaseState = initialState,
  action: Actions
) => {
  switch (action.type) {
    default:
      return state;
  }
};
