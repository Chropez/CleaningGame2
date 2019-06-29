import { ExtraArguments } from 'config/redux';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'store/root-reducer';

export type AppActionCreator = ActionCreator<
  ThunkAction<void, ApplicationState, ExtraArguments, AnyAction>
>;

export type AppThunkDispatch = ThunkDispatch<
  ApplicationState,
  ExtraArguments,
  AnyAction
>;
