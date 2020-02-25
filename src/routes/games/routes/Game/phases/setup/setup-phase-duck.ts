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
  NextGamePhaseSucceeded = 'GAMES/GAME/SETUP_PHASE/NEXT_GAME_PHASE_SUCCEEDED',
  CopiedInvitationUrlSnackbarOpened = 'GAMES/GAME/SETUP_PHASE/COPIED_INVITATION_URL_SNACKBAR_OPENED',
  CopiedInvitationUrlSnackbarClosed = 'GAMES/GAME/SETUP_PHASE/COPIED_INVITATION_URL_SNACKBAR_CLOSED'
}

// Selectors

export const selectGameTasks = (state: ApplicationState): Task[] =>
  state.firestore.ordered.currentGameTasks || [];

export const selectInvitationUrlCopiedSnackbarIsOpen = (
  state: ApplicationState
): boolean =>
  state.routes.games.game.setupPhase.invitationUrlCopiedSnackbarIsOpen;

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

export const openInvitationUrlCopiedSnackbar: AppActionCreator = () => dispatch =>
  dispatch({ type: SetupPhaseTypes.CopiedInvitationUrlSnackbarOpened });

export const closeInvitationUrlCopiedSnackbar: AppActionCreator = () => dispatch =>
  dispatch({ type: SetupPhaseTypes.CopiedInvitationUrlSnackbarClosed });

// Reducer

type Actions =
  | AppAction<SetupPhaseTypes.NextGamePhaseRequested>
  | AppAction<SetupPhaseTypes.NextGamePhaseSucceeded>
  | AppAction<SetupPhaseTypes.CopiedInvitationUrlSnackbarOpened>
  | AppAction<SetupPhaseTypes.CopiedInvitationUrlSnackbarClosed>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SetupPhaseState {
  invitationUrlCopiedSnackbarIsOpen: boolean;
}

const initialState: SetupPhaseState = {
  invitationUrlCopiedSnackbarIsOpen: false
};

export const setupPhaseReducer = (
  state: SetupPhaseState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case SetupPhaseTypes.CopiedInvitationUrlSnackbarOpened:
      return { ...state, invitationUrlCopiedSnackbarIsOpen: true };
    case SetupPhaseTypes.CopiedInvitationUrlSnackbarClosed:
      return { ...state, invitationUrlCopiedSnackbarIsOpen: false };
    default:
      return state;
  }
};
