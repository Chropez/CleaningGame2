import { ApplicationState } from 'store/root-reducer';

export const selectCurrentUserId = (state: ApplicationState): string =>
  state.firebase.auth.uid;
