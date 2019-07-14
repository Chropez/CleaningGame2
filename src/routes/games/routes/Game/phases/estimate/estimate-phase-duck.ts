import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import { selectGame } from '../../game-duck';
import TaskEstimation from 'models/task-estimation';
import { selectCurrentUserId } from '../setup/players/players-duck';

enum EstimatePhaseTypes {
  NextGamePhaseRequested = 'GAMES/GAME/ESTIMATE_PHASE/NEXT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/NEXT_GAME_PHASE_SUCCEEDED',
  PreviousGamePhaseRequested = 'GAMES/GAME/ESTIMATE_PHASE/PREVIOUS_GAME_PHASE_REQUESTED',
  PreviousGamePhaseSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/PREVIOUS_GAME_PHASE_SUCCEEDED',
  TaskEstimationRequested = 'GAMES/GAME/ESTIMATE_PHASE/TASK_ESTIMATION_REQUESTED',
  TaskEstimationSucceeded = 'GAMES/GAME/ESTIMATE_PHASE/TASK_ESTIMATION_SUCCEEDED'
}

export const goToNextStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.Estimate) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();

  dispatch({ type: EstimatePhaseTypes.NextGamePhaseRequested });
  await firestore.update(
    { collection: 'games', doc: game.id },
    { phase: GamePhase.ChoosePlayerOrder }
  );
};

export const goToPreviousStep: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let game = selectGame(state);

  if (game.phase !== GamePhase.Estimate) {
    throw new Error(
      'Ops! Time to "phase" the truth... Your game is in an impossible phase'
    );
  }

  let firestore = getFirestore();

  dispatch({ type: EstimatePhaseTypes.PreviousGamePhaseRequested });
  await firestore.update(
    { collection: 'games', doc: game.id },
    { phase: GamePhase.Setup }
  );
  dispatch({ type: EstimatePhaseTypes.PreviousGamePhaseSucceeded });
};

export const estimateTask: AppActionCreator = (
  taskId: string,
  estimate: number
) => async (dispatch, getState, { getFirestore }) => {
  let state = getState();
  let game = selectGame(state);
  let userId = selectCurrentUserId(state);

  let firestore = getFirestore();

  let taskEstimation: TaskEstimation = {
    userId,
    lastModified: firestore.Timestamp.now().toMillis(),
    estimate
  };

  dispatch({
    type: EstimatePhaseTypes.TaskEstimationRequested,
    payload: taskEstimation
  });

  await firestore.set(
    {
      collection: 'games',
      doc: game.id,
      subcollections: [
        {
          collection: 'tasks',
          doc: taskId,
          subcollections: [
            {
              collection: 'estimations',
              doc: userId
            }
          ]
        }
      ]
    },
    taskEstimation
  );

  dispatch({
    type: EstimatePhaseTypes.TaskEstimationSucceeded
  });
};

export const getTaskEstimations: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let state = getState();
  let firestore = getFirestore();

  let game = selectGame(state);
  let userId = selectCurrentUserId(state);

  firestore.setListener({
    collection: 'games',
    doc: game.id,
    subcollections: [
      {
        collection: 'tasks',
        doc: '*',
        subcollections: [
          {
            collection: 'estimations',
            where: [['userId', '==', userId]]
            // doc: userId,
          }
        ]
      }
    ]
  });
};

// Reducer

type Actions =
  | AppAction<EstimatePhaseTypes.NextGamePhaseRequested>
  | AppAction<EstimatePhaseTypes.NextGamePhaseSucceeded>
  | AppAction<EstimatePhaseTypes.PreviousGamePhaseRequested>
  | AppAction<EstimatePhaseTypes.PreviousGamePhaseSucceeded>;

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
