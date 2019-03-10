import { ExtraArguments } from 'config/redux';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from 'store/root-reducer';

export type AppActionCreator<A extends Action> = ActionCreator<
  ThunkAction<void, IApplicationState, ExtraArguments, A>
>;

export type AppThunkDispatch = ThunkDispatch<
  IApplicationState,
  ExtraArguments,
  AnyAction
>;
