import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { homeReducer } from 'routes/home/duck';

export interface IApplicationState {
  firebase: any;
  firestore: any;
  home: {
    greet: string;
  };
}

export default combineReducers<IApplicationState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  home: homeReducer,
});
