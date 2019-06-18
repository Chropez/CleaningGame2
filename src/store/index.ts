import { ExtraArguments } from 'config/redux';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'store/root-reducer';

export type AppActionCreator<A extends Action> = ActionCreator<
  ThunkAction<void, ApplicationState, ExtraArguments, A>
>;

export type AppThunkDispatch = ThunkDispatch<
  ApplicationState,
  ExtraArguments,
  AnyAction
>;
