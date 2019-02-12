import * as React from 'react';
import { FunctionComponent } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import addText from './thunk';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IApplicationState } from 'store/root-reducer';

interface IState {
  login: {
    text: string;
  };
}

const mapState = (state: IState) => ({
  text: state.login.text
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
