import { AppAction } from 'config/redux';
import { AppActionCreator } from 'store';
import { ApplicationState } from 'store/root-reducer';

enum ApplicationActionTypes {
  realViewHeightUnitUpdated = 'APPLICATION/REAL_VIEW_HEIGHT_UNIT_UPDATED',
}

// Selectors
export const selectRealVhUnit = (state: ApplicationState) =>
  state.routes.application.realViewHeightUnit;

// Actions

export const updateRealViewHeightUnit: AppActionCreator = (
  vhUnit: number
) => dispatch =>
  dispatch({
    type: ApplicationActionTypes.realViewHeightUnitUpdated,
    payload: { realViewHeightUnit: vhUnit },
  });

// Reducer

type Actions = AppAction<
  ApplicationActionTypes.realViewHeightUnitUpdated,
  { realViewHeightUnit: number }
>;

export interface ApplicationRouteState {
  realViewHeightUnit: number;
}

const initialState: ApplicationRouteState = {
  realViewHeightUnit: window.innerHeight * 0.01,
};

export const applicationRouteReducer = (
  state: ApplicationRouteState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ApplicationActionTypes.realViewHeightUnitUpdated:
      return {
        ...state,
        realViewHeightUnit: action.payload.realViewHeightUnit,
      };
    default:
      return state;
  }
};
