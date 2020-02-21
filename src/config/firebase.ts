import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reduxFirestore } from 'redux-firestore';
import firebaseConfig from './keys';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  return firebase;
};

export const firestoreConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

export const firebaseEnhancers = [reduxFirestore(firebase)];
