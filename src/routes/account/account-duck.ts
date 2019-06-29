import { AppActionCreator } from 'store';

enum AccountActionTypes {
  LoginWithGoogle = 'ACCOUNT_LOGIN_GOOGLE',
  LoginWithFacebook = 'ACCOUNT_LOGIN_FACEBOOK',
  Logout = 'ACCOUNT_LOGOUT'
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
