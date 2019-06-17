import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import { addText, deleteText } from './duck';

const TestRouteComponent: FunctionComponent = () => {
  let text = useSelector((state: IApplicationState) => state.test.greet);
  let dispatch: AppThunkDispatch = useDispatch();

  return (
    <div>
      <div>Hello {text}.</div>
      <button onClick={() => dispatch(addText())}>Add text</button>
      <button onClick={() => dispatch(deleteText())}>DELETE</button>

      <hr />
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
};

export default TestRouteComponent;
