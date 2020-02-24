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

interface ExtendedReactReduxFirebaseConfig extends ReactReduxFirebaseConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileFactory: (userData: any, profileData: any, firebase: any) => any;
  createProfileOnSignup: boolean;
}

export const firestoreConfig: Partial<ExtendedReactReduxFirebaseConfig> = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  autoPopulateProfile: true,
  updateProfileOnLogin: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileFactory: (userData: any, profileData: any, firebase: any) => {
    console.log(userData);
    console.log(profileData);
    console.log(firebase);
    debugger;
  },
  createProfileOnSignup: true
};

export const firebaseEnhancers = [reduxFirestore(firebase)];
