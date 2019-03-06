import { AppActionCreator } from 'store';

enum HomeActionTypes {
  AddText = 'HOME_ADD_TEXT',
  RemoveText = 'HOME_REMOVE_TEXT',
}

interface AddTextAction {
  type: HomeActionTypes.AddText;
  newText: string;
}

interface RemoveTextAction {
  type: HomeActionTypes.RemoveText;
}

type Actions = AddTextAction | RemoveTextAction;

export const addText: AppActionCreator<AddTextAction> = (newText: string) => (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const state = getState();
  const fb = getFirebase();
  const fs = getFirestore();

  console.log(state);
  console.log(fb);
  console.log(fs.collection);

  dispatch({
    type: HomeActionTypes.AddText,
    newText: 'World',
  });
};

export const deleteText: AppActionCreator<RemoveTextAction> = () => dispatch =>
  dispatch({ type: HomeActionTypes.RemoveText });

interface State {
  greet: string;
}

const initialState: State = {
  greet: 'me',
};

export const homeReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case HomeActionTypes.AddText: {
      return { ...state, greet: `${state.greet}  ${action.newText}` };
    }
    case HomeActionTypes.RemoveText: {
      return { ...state, greet: ' ' };
    }
    default: {
      return state;
    }
  }
};
