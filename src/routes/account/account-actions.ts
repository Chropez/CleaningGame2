import { AppActionCreator } from 'store';

enum AccountActionTypes {
  LoginWithGoogle = 'ACCOUNT_LOGIN_GOOGLE',
  LoginWithFacebook = 'ACCOUNT_LOGIN_FACEBOOK',
  Logout = 'ACCOUNT_LOGOUT',
}

interface LoginWithGoogleAction {
  type: AccountActionTypes.LoginWithGoogle;
}

interface LoginWithFacebookAction {
  type: AccountActionTypes.LoginWithFacebook;
}

interface LogoutAction {
  type: AccountActionTypes.Logout;
}

// type Actions = LoginWithGoogleAction | LoginWithFacebookAction;

// ActionCreators

export const loginWithGoogle: AppActionCreator<LoginWithGoogleAction> = () => (
  dispatch,
  getState,
  { getFirebase },
) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'google', type: 'redirect' });
  dispatch({ type: AccountActionTypes.LoginWithGoogle });
};

export const loginWithFacebook: AppActionCreator<
  LoginWithFacebookAction
> = () => (dispatch, getState, { getFirebase }) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'facebook', type: 'redirect' });
  dispatch({ type: AccountActionTypes.LoginWithFacebook });
};

export const logout: AppActionCreator<LogoutAction> = () => (
  dispatch,
  getState,
  { getFirebase },
) => {
  // login with google in firebase
  let firebase = getFirebase();

  dispatch({ type: AccountActionTypes.Logout });
  firebase.logout();
};
