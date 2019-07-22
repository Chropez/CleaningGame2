/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import { selectGame, updateGameByIdQuery } from '../../game-duck';

enum ChooseTasksActionTypes {
  NextGamePhaseRequested = 'GAMES/GAME/CHOOSE_TASKS/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_TASKS/NEXT_GAME_PHASE_SUCCEEDED',
  PreviousGamePhaseRequested = 'GAMES/GAME/CHOOSE_TASKS/PREVIOUS_GAME_PHASE_REQUESTED',
  PreviousGamePhaseSucceeded = 'GAMES/GAME/CHOOSE_TASKS/PREVIOUS_GAME_PHASE_SUCCEEDED',
  ChooseTasksPhaseSubscribed = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASKS_PHASE_SUBSCRIBED',
  ChooseTasksPhaseUnsubscribed = 'GAMES/GAME/CHOOSE_TASKS/CHOOSE_TASKS_PHASE_UNSUBSCRIBED'
}

// Selectors

// Queries

// Actions

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.ChoosePlayerOrder) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.ChoosePlayerOrder }; // todo next

  dispatch({
    type: ChooseTasksActionTypes.NextGamePhaseRequested,
    payload: { phase }
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
  dispatch({ type: ChooseTasksActionTypes.NextGamePhaseSucceeded });
};

export const goToPreviousStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.ChoosePlayerOrder) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();
  let phase = { phase: GamePhase.Estimate };

  dispatch({
    type: ChooseTasksActionTypes.PreviousGamePhaseRequested,
    payload: phase
  });
  await firestore.update(updateGameByIdQuery(game.id!), phase);
  dispatch({ type: ChooseTasksActionTypes.PreviousGamePhaseSucceeded });
};

export const subscribeToChoosePlayerOrderPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  // await firestore.setListeners(getChoosePlayerOrderPhaseQueries(gameId));

  dispatch({
    type: ChooseTasksActionTypes.ChooseTasksPhaseSubscribed
  });
};

export const unsubscribeFromChoosePlayerOrderPhase: AppActionCreator = (
  gameId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  await firestore.unsetListeners(getChoosePlayerOrderPhaseQueries(gameId));

  dispatch({
    type: ChooseTasksActionTypes.ChooseTasksPhaseUnsubscribed
  });
};

// Reducer

type Actions =
  | AppAction<ChooseTasksActionTypes.NextGamePhaseRequested>
  | AppAction<ChooseTasksActionTypes.NextGamePhaseSucceeded>
  | AppAction<ChooseTasksActionTypes.PreviousGamePhaseRequested>
  | AppAction<ChooseTasksActionTypes.PreviousGamePhaseSucceeded>;

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
