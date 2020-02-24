import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import { selectGame, updateGameByIdQuery } from '../../game-duck';
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

export const subscribeToGameTasks: AppActionCreator = (
  gameId: string
) => async (dispatch, _, { getFirestore }) => {
  let firestore = getFirestore();

  await firestore.setListener(getGameTasksQuery(gameId));

  dispatch({
    type: SetupPhaseTypes.GameTasksSubscribed,
    payload: { id: gameId }
  });
};

export const unsubscribeFromGameTasks: AppActionCreator = (
  gameId: string
) => async (dispatch, _, { getFirestore }) => {
  let firestore = getFirestore();

  await firestore.unsetListener(getGameTasksQuery(gameId));

  dispatch({
    type: SetupPhaseTypes.GameTasksSubscribed,
    payload: { id: gameId }
  });
};

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state)!;

  if (game.phase !== GamePhase.Setup) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();

  dispatch({ type: SetupPhaseTypes.NextGamePhaseRequested });
  await firestore.update(updateGameByIdQuery(game.id!), {
    phase: GamePhase.Estimate
  });
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
