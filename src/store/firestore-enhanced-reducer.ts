import { ApplicationState } from './root-reducer';
import { AnyAction } from 'redux';

const ActionTypes = {
  ListenerResponse: '@@reduxFirestore/LISTENER_RESPONSE',
  GetSuccess: '@@reduxFirestore/GET_SUCCESS',
};

// Reducer that listens to firestore changes
export default function firestoreEnhancedReducers(
  state: ApplicationState,
  action: AnyAction
) {
  switch (action.type) {
    case ActionTypes.ListenerResponse:
    case ActionTypes.GetSuccess:
    default:
      return state;
  }
}
