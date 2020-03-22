import * as React from 'react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApplicationState } from 'store/root-reducer';

type Props = RouteProps;

const ProtectedRoute: FunctionComponent<Props> = ({ children, ...rest }) => {
  let isLoggedIn = useSelector(
    (state: ApplicationState) => !state.firebase.auth.isEmpty
  );
  let isLoaded = useSelector(
    (state: ApplicationState) => state.firebase.auth.isLoaded
  );

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isLoaded) {
          return null;
        }

        if (!isLoggedIn) {
          return (
            <Redirect
              to={{ pathname: '/account/login', state: { from: location } }}
            />
          );
        }

        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;
