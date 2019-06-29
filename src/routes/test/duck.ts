/* eslint-disable no-console */
import { AppActionCreator } from 'store';

enum TestActionTypes {
  AddText = 'TEST_ADD_TEXT',
  RemoveText = 'TEST_REMOVE_TEXT'
}

interface AddTextAction {
  type: TestActionTypes.AddText;
  newText: string;
}

interface RemoveTextAction {
  type: TestActionTypes.RemoveText;
}

type Actions = AddTextAction | RemoveTextAction;

export const addText: AppActionCreator = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const fb = getFirebase();
  const fs = getFirestore();

  console.log(state);
  console.log(fb);
  console.log(fs.collection);

  dispatch({
    type: TestActionTypes.AddText,
    newText: 'World'
  });
};

export const deleteText: AppActionCreator = () => dispatch =>
  dispatch({ type: TestActionTypes.RemoveText });

interface State {
  greet: string;
}

const initialState: State = {
  greet: 'me'
};

export const testReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case TestActionTypes.AddText: {
      return { ...state, greet: `${state.greet}  ${action.newText}` };
    }
    case TestActionTypes.RemoveText: {
      return { ...state, greet: ' ' };
    }
    default: {
      return state;
    }
  }
};
