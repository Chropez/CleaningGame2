import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import rootReducer, { IApplicationState } from 'store/root-reducer';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<IApplicationState>)
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./root-reducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
