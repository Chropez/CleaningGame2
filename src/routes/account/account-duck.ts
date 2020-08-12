import { AppActionCreator } from 'store';

enum AccountActionTypes {
  LoginWithGoogle = 'ACCOUNT/LOGIN_GOOGLE',
  LoginWithFacebook = 'ACCOUNT/LOGIN_FACEBOOK',
  Logout = 'ACCOUNT/LOGOUT',
}

// ActionCreators

export const loginWithGoogle: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  // login with google in firebase
  let firebase = getFirebase();

  let createdUser = await firebase.login({ provider: 'google', type: 'popup' });

  dispatch({ type: AccountActionTypes.LoginWithGoogle, payload: createdUser });
};

export const loginWithFacebook: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  // login with google in firebase
  let firebase = getFirebase();

  let createdUser = await firebase.login({
    provider: 'facebook',
    type: 'popup',
  });

  dispatch({
    type: AccountActionTypes.LoginWithFacebook,
    payload: createdUser,
  });
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
