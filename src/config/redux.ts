import { AppState } from 'react-native';
import {
  getFirebase,
  ExtendedAuthInstance,
  ExtendedStorageInstance,
  ExtendedFirebaseInstance,
} from 'react-redux-firebase';
import { getFirestore as reduxGetFirestore } from 'redux-firestore';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from 'store/root-reducer';
import { firebaseEnhancers } from './firebase';
import Firestore from '../typings/firestore';

export interface ExtraArguments {
  getFirebase: () => ExtendedFirebaseInstance &
    ExtendedAuthInstance &
    ExtendedStorageInstance;
  getFirestore: () => Firestore;
}

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = [...firebaseEnhancers];

if (
  process.env.NODE_ENV === 'development' &&
  typeof reduxDevToolsExtension === 'function'
) {
  enhancers.push(reduxDevToolsExtension());
}

const getFirestore = reduxGetFirestore as () => Firestore;

const firebaseArgs: ExtraArguments = { getFirebase, getFirestore };

const configureStore = () => {
  let store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(firebaseArgs)),
      compose(...enhancers)
    )
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

export interface AppAction<T, P = {}> {
  type: T;
  payload: P;
}
export default configureStore;
