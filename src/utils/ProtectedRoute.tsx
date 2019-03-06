import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useMappedState } from 'redux-react-hook';
import { IApplicationState } from 'store/root-reducer';

type IProps = RouteProps;

const mapState = (state: IApplicationState) => ({
  isLoaded: state.firebase.auth.isLoaded,
  isLoggedIn: !state.firebase.auth.isEmpty,
});

const ProtectedRoute: FunctionComponent<IProps> = props => {
  let { isLoaded, isLoggedIn } = useMappedState(mapState);

  if (!isLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to="account" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
