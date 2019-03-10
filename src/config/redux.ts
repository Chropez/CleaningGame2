import firebase from 'firebase';
import { AppState } from 'react-native';
import { getFirebase } from 'react-redux-firebase';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import { getFirestore } from 'redux-firestore';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from 'store/root-reducer';
import { firebaseEnhancers } from './firebase';

export interface ExtraArguments {
  getFirebase: () => any; // typeof firebase;
  getFirestore: () => firebase.firestore.Firestore;
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk.withExtraArgument({ getFirebase, getFirestore } as ExtraArguments),
      ),
      compose(...firebaseEnhancers),
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('store/root-reducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export type ThunkResult<R> = ThunkAction<
  R,
  AppState,
  ExtraArguments,
  AnyAction
>;

export default configureStore;
