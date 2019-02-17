import { combineReducers } from 'redux';

type Action = {
  type: string;
  payload: string;
};

export interface IApplicationState {
  home: Object;
  login: {
    text: string;
  };
}

export default combineReducers<IApplicationState>({
  home: () => {
    /* combined reducers */
    return {};
  },
  login: (state = { text: 'awesome' }, action: Action) => {
    switch (action.type) {
      case 'ADD_TEXT': {
        return {
          ...state,
          text: `${state.text} <3 ${action.payload}`,
        };
      }

      default: {
        return state;
      }
    }
  },
});
