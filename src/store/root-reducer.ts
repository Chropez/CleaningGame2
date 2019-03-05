import { combineReducers } from 'redux';
import { homeReducer } from 'routes/home/duck';

export interface IApplicationState {
  home: {
    greet: string;
  };
}

export default combineReducers<IApplicationState>({
  home: homeReducer,
});
