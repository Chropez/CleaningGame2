import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebaseConfig from './keys';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

const firebaseEnhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true
  })
];

interface WindowWithReduxDevtools extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => void;
}
const reduxDevToolsExtension = (window as WindowWithReduxDevtools)
  .__REDUX_DEVTOOLS_EXTENSION__;

if (
  process.env.NODE_ENV === 'development' &&
  typeof reduxDevToolsExtension === 'function'
) {
  firebaseEnhancers.push(reduxDevToolsExtension());
}

export { firebaseEnhancers };
