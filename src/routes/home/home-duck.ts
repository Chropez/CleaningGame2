import { AppActionCreator } from 'store';
import { AppAction } from 'config/redux';

enum HomeActionTypes {
  ShowMenu = 'HOME_SHOW_MENU',
  HideMenu = 'HOME_HIDE_MENU',
  CreateGame = 'HOME_CREATE_GAME'
}

export const showMenu: AppActionCreator = () => dispatch => {
  dispatch({ type: HomeActionTypes.ShowMenu });
};

export const hideMenu: AppActionCreator = () => dispatch => {
  dispatch({ type: HomeActionTypes.HideMenu });
};

type Actions =
  | AppAction<HomeActionTypes.ShowMenu>
  | AppAction<HomeActionTypes.HideMenu>;

export interface HomeState {
  menuIsOpen: boolean;
}

const initialState: HomeState = {
  menuIsOpen: false
};

export const homeReducer = (
  state: HomeState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case HomeActionTypes.ShowMenu:
      return { ...state, menuIsOpen: true };
    case HomeActionTypes.HideMenu:
      return { ...state, menuIsOpen: false };
    default:
      return state;
  }
};
