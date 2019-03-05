import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { AppState } from 'react-native';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import rootReducer from 'store/root-reducer';
import { firebaseEnhancers } from './firebase';

export interface ExtraArguments {
  getFirebase: any;
  getFirestore: any;
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    // initialState,
    {},
    compose(
      // applyMiddleware(thunk as ThunkMiddleware<IApplicationState>),
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
