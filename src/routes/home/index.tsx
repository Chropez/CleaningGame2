import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import { addText, deleteText } from './duck';

const mapState = (state: IApplicationState) => ({
  text: state.home.greet,
});

const HomeRouteComponent: FunctionComponent = () => {
  let { text } = useMappedState(mapState);
  let dispatch: AppThunkDispatch = useDispatch();

  return (
    <div>
      <div>Hello {text}.</div>
      <button onClick={() => dispatch(addText())}>Add text</button>
      <button onClick={() => dispatch(deleteText())}>DELETE</button>
    </div>
  );
};

export default HomeRouteComponent;
