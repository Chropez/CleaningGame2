import { AnyAction } from 'redux';
import { AppActionCreator } from 'store';

enum LoginActionTypes {
  LoginWithGoogle = 'LOGIN_LOGIN_GOOGLE',
  LoginWithFacebook = 'LOGIN_LOGIN_FACEBOOK',
  LogOut = 'ACCOUNT_LOGOUT',
}

interface LoginWithGoogleAction {
  type: LoginActionTypes.LoginWithGoogle;
}

interface LoginWithFacebookAction {
  type: LoginActionTypes.LoginWithFacebook;
}

// type Actions = LoginWithGoogleAction | LoginWithFacebookAction;

// ActionCreators

export const logInWithGoogle: AppActionCreator<LoginWithGoogleAction> = () => (
  dispatch,
  getState,
  { getFirebase },
) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'google', type: 'redirect' });
  dispatch({ type: LoginActionTypes.LoginWithGoogle });
};

export const logInWithFacebook: AppActionCreator<
  LoginWithFacebookAction
> = () => (dispatch, getState, { getFirebase }) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'facebook', type: 'redirect' });
  dispatch({ type: LoginActionTypes.LoginWithFacebook });
};

export const logout: AppActionCreator<AnyAction> = () => (
  dispatch,
  getState,
  { getFirebase },
) => {
  // login with google in firebase
  let firebase = getFirebase();

  firebase.logout();
};
