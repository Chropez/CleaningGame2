import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { homeReducer, IHomeState } from 'routes/home/duck';
import { testReducer } from 'routes/test/duck';

export interface IApplicationState {
  firebase: any;
  firestore: any;
  test: {
    greet: string;
  };
  home: IHomeState;
}

export default combineReducers<IApplicationState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer,
  home: homeReducer,
});
