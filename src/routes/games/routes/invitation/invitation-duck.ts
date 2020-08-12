import { ApplicationState } from 'store/root-reducer';
import { AppActionCreator } from 'store';
import Game from 'models/game';
import { AppAction } from 'config/redux';
import { createSelector } from 'reselect';
import { selectCurrentUserId } from 'application/selectors';
import GamePlayer from 'models/game-player';
import { timestamp } from 'utils/firestore';
import { DocumentQuery } from 'typings/firestore';
import * as H from 'history';

enum InvitationActionTypes {
  FetchGameRequested = 'GAMES/INVITATION/FETCH_GAME_REQUESTED',
  FetchGameSucceeded = 'GAMES/INVITATION/FETCH_GAME_SUCCEEDED',
  GameMenuOpened = 'GAMES/INVITATION/GAME_MENU_OPENED',
  GameMenuHidden = 'GAMES/INVITATION/GAME_MENU_HIDDEN',
  InvitationAcceptedRequested = 'GAMES/INVITATION/INVITATION_ACCEPTED_REQUESTED',
  InvitationAcceptedSucceeded = 'GAMES/INVITATION/INVITATION_ACCEPTED_SUCCEEDED',
}

// Selectors

export const selectIsLoading = (state: ApplicationState): boolean =>
  state.routes.games.invitation.isLoading;

export const selectInvitationGames = (state: ApplicationState): Game[] =>
  state.firestore.ordered.invitationGame;

export const selectInvitationGameId = (state: ApplicationState): string =>
  state.routes.games.invitation.gameId;

export const selectInvitationId = (state: ApplicationState): string =>
  state.routes.games.invitation.invitationId;

export const selectGame = createSelector(
  [selectInvitationGames, selectInvitationGameId, selectInvitationId],
  (invitationGames, gameId, invitationId): Game | undefined =>
    invitationGames.filter(
      game => game.id === gameId && game.invitationId === invitationId
    )[0]
);

export const selectUserAlreadyJoinedGame = createSelector(
  [selectGame, selectCurrentUserId],
  (game, currentUserId): boolean =>
    game !== undefined &&
    game.participants.some(participantId => participantId === currentUserId)
);

export const selectMenuIsOpen = (state: ApplicationState) =>
  state.routes.games.invitation.menuIsOpen;

// Queries
const gameInvitationGameQuery = (gameId: string, invitationId: string) => ({
  collection: 'games',
  populates: [
    {
      child: 'participants',
      root: 'users',
    },
  ],
  where: [['invitationId', '==', invitationId]],
  // doc: gameId,
  storeAs: 'invitationGame',
});

export const setPlayerToGameQuery = (
  gameId: string,
  userId: string
): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'setPlayerToGameWhenAcceptingInvitation',
  subcollections: [{ collection: 'players', doc: userId }],
});

export const updateGameQuery = (gameId: string): DocumentQuery => ({
  collection: 'games',
  doc: gameId,
  storeAs: 'updateGameQuery',
});

// Actions

export const fetchInvitationGame: AppActionCreator = (
  gameId: string,
  invitationId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();

  dispatch({
    type: InvitationActionTypes.FetchGameRequested,
    payload: { gameId, invitationId },
  });

  await firestore.get(gameInvitationGameQuery(gameId, invitationId));

  dispatch({
    type: InvitationActionTypes.FetchGameSucceeded,
  });
};

export const showMenu: AppActionCreator = () => dispatch =>
  dispatch({ type: InvitationActionTypes.GameMenuOpened });

export const hideMenu: AppActionCreator = () => dispatch =>
  dispatch({ type: InvitationActionTypes.GameMenuHidden });

export const acceptInvitation: AppActionCreator = (
  history: H.History,
  gameId: string,
  invitationId: string
) => async (dispatch, getState, { getFirestore }) => {
  let firestore = getFirestore();
  let state = getState();
  let userId = selectCurrentUserId(state)!;
  let game = selectGame(state);

  if (game?.id !== gameId || game.invitationId !== invitationId) {
    new Error('Could not accept invitation. Invitation did not match the game');
  }

  let player: GamePlayer = {
    userId,
    createdAt: timestamp(firestore),
  };

  dispatch({ type: InvitationActionTypes.InvitationAcceptedRequested });

  await firestore.set(setPlayerToGameQuery(gameId, userId), player);

  let updatedGame: Partial<Game> = {
    participants: firestore.FieldValue.arrayUnion(userId),
  };

  await firestore.update(updateGameQuery(gameId), updatedGame);

  dispatch({ type: InvitationActionTypes.InvitationAcceptedSucceeded });

  history.push(`/games/${gameId}`);
};

// Reducer

type Actions =
  | AppAction<
      InvitationActionTypes.FetchGameRequested,
      { gameId: string; invitationId: string }
    >
  | AppAction<InvitationActionTypes.FetchGameSucceeded>
  | AppAction<InvitationActionTypes.GameMenuOpened>
  | AppAction<InvitationActionTypes.GameMenuHidden>;

export interface InvitationState {
  gameId: string;
  invitationId: string;
  isLoading: boolean;
  menuIsOpen: boolean;
}

const initialState: InvitationState = {
  gameId: '',
  invitationId: '',
  isLoading: false,
  menuIsOpen: false,
};

export const invitationReducer = (
  state: InvitationState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case InvitationActionTypes.FetchGameRequested:
      return {
        ...state,
        gameId: action.payload.gameId,
        invitationId: action.payload.invitationId,
        isLoading: true,
      };
    case InvitationActionTypes.FetchGameSucceeded:
      return {
        ...state,
        isLoading: false,
      };
    case InvitationActionTypes.GameMenuOpened:
      return { ...state, menuIsOpen: true };
    case InvitationActionTypes.GameMenuHidden:
      return { ...state, menuIsOpen: false };
    default:
      return state;
  }
};
