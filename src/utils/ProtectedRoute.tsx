import * as React from 'react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { IApplicationState } from 'store/root-reducer';

type IProps = RouteProps;

const ProtectedRoute: FunctionComponent<IProps> = props => {
  let isLoggedIn = useSelector(
    (state: IApplicationState) => !state.firebase.auth.isEmpty,
  );
  let isLoaded = useSelector(
    (state: IApplicationState) => state.firebase.auth.isLoaded,
  );

  if (!isLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to="/account/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
