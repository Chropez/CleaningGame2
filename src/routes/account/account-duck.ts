import { AppActionCreator } from 'store';

enum AccountActionTypes {
  LoginWithGoogle = 'ACCOUNT/LOGIN_GOOGLE',
  LoginWithFacebook = 'ACCOUNT/LOGIN_FACEBOOK',
  Logout = 'ACCOUNT/LOGOUT'
}

// ActionCreators

export const loginWithGoogle: AppActionCreator = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'google', type: 'redirect' });
  dispatch({ type: AccountActionTypes.LoginWithGoogle });
};

export const loginWithFacebook: AppActionCreator = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  // login with google in firebase
  let firebase = getFirebase();
  firebase.login({ provider: 'facebook', type: 'redirect' });
  dispatch({ type: AccountActionTypes.LoginWithFacebook });
};

export const logout: AppActionCreator = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  // login with google in firebase
  let firebase = getFirebase();

  dispatch({ type: AccountActionTypes.Logout });
  firebase.logout();
};
