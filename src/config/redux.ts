import { AppState } from 'react-native';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore as reduxGetFirestore } from 'redux-firestore';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from 'store/root-reducer';
import { firebaseEnhancers } from './firebase';
import Firestore from '../typings/firestore';

export interface ExtraArguments {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFirebase: () => any; // typeof firebase;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFirestore: () => Firestore;
}

const getFirestore = reduxGetFirestore as () => Firestore;

const firebaseArgs: ExtraArguments = { getFirebase, getFirestore };

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(firebaseArgs)),
      compose(...firebaseEnhancers)
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

export default configureStore;
