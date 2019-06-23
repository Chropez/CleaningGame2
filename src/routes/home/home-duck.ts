import { AppActionCreator } from 'store';

enum HomeActionTypes {
  ShowMenu = 'HOME_SHOW_MENU',
  HideMenu = 'HOME_HIDE_MENU',
  CreateGame = 'HOME_CREATE_GAME'
}

interface ShowMenuAction {
  type: HomeActionTypes.ShowMenu;
}

interface HideMenuAction {
  type: HomeActionTypes.HideMenu;
}

export const showMenu: AppActionCreator<ShowMenuAction> = () => dispatch => {
  dispatch({ type: HomeActionTypes.ShowMenu });
};

export const hideMenu: AppActionCreator<HideMenuAction> = () => dispatch => {
  dispatch({ type: HomeActionTypes.HideMenu });
};

type Actions = ShowMenuAction | HideMenuAction;

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
