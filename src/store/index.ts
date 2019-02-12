import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import rootReducer, { IApplicationState } from 'store/root-reducer';

export default createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<IApplicationState>)
);
