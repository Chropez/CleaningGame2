import * as React from 'react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApplicationState } from 'store/root-reducer';

type Props = RouteProps;

const ProtectedRoute: FunctionComponent<Props> = props => {
  let isLoggedIn = useSelector(
    (state: ApplicationState) => !state.firebase.auth.isEmpty
  );
  let isLoaded = useSelector(
    (state: ApplicationState) => state.firebase.auth.isLoaded
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
