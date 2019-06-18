import { AppActionCreator } from 'store';

enum HomeActionTypes {
  showMenu = 'HOME_SHOW_MENU',
  hideMenu = 'HOME_HIDE_MENU'
}

interface ShowMenuAction {
  type: HomeActionTypes.showMenu;
}

interface HideMenuAction {
  type: HomeActionTypes.hideMenu;
}

export const showMenu: AppActionCreator<ShowMenuAction> = () => dispatch => {
  dispatch({ type: HomeActionTypes.showMenu });
};

export const hideMenu: AppActionCreator<HideMenuAction> = () => dispatch => {
  dispatch({ type: HomeActionTypes.hideMenu });
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
    case HomeActionTypes.showMenu:
      return { ...state, menuIsOpen: true };
    case HomeActionTypes.hideMenu:
      return { ...state, menuIsOpen: false };

    default:
      return state;
  }
};
