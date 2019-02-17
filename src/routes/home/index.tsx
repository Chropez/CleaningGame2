import * as React from 'react';
import { FunctionComponent } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from 'store/root-reducer';
import addText from './thunk';

interface IState {
  login: {
    text: string;
  };
}

const mapState = (state: IState) => ({
  text: state.login.text,
});

const HomeRouteComponent: FunctionComponent = () => {
  let { text } = useMappedState(mapState);
  let dispatch: ThunkDispatch<IApplicationState, {}, AnyAction> = useDispatch();

  return (
    <div>
      <div onClick={() => dispatch(addText())}>{text}</div>
    </div>
  );
};

export default HomeRouteComponent;
