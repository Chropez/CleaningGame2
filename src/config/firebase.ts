import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reduxFirestore } from 'redux-firestore';

import firebaseConfig from './keys';
import { ReactReduxFirebaseConfig } from 'react-redux-firebase';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  return firebase;
};

export const firestoreConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

export const firebaseEnhancers = [reduxFirestore(firebase)];
