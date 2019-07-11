import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';
import { GamePhase } from 'models/game';
import { selectGame } from '../../game-duck';

enum SetupPhaseTypes {
  NextGamePhaseRequested = 'GAMES/GAME/SETUP_PHASE/NEXTT_GAME_PHASE_REQUESTED',
  NextGamePhaseSucceeded = 'GAMES/GAME/SETUP_PHASE/NEXTT_GAME_PHASE_SUCCEEDED'
}

export const goToNextStep: AppActionCreator = () => (
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
  firestore.update(
    { collection: 'games', doc: game.id },
    { phase: GamePhase.Estimate }
  );
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
