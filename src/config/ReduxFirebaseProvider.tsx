import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { initializeFirebase, firestoreConfig } from './firebase';
import { createFirestoreInstance } from 'redux-firestore';
import configureStore from './redux';

interface Props {
  children: JSX.Element[];
}

const firebase = initializeFirebase();
const store = configureStore();

const ReduxFirebaseProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firestoreConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      {children}
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default ReduxFirebaseProvider;
