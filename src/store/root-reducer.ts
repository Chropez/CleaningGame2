import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { homeReducer, HomeState } from 'routes/home/duck';
import { testReducer } from 'routes/test/duck';

export interface ApplicationState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebase: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firestore: any;
  test: {
    greet: string;
  };
  home: HomeState;
}

export default combineReducers<ApplicationState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer,
  home: homeReducer
});
