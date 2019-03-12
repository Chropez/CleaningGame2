import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnonymousOnlyRoute from 'utils/AnonymousOnlyRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import AccountRoute from './account';
import StartRoute from './start';
import TestRouteComponent from './test';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <ProtectedRoute exact={true} path="/" component={() => <StartRoute />} />
      <AnonymousOnlyRoute
        path="/account/login"
        component={() => <AccountRoute />}
      />

      <ProtectedRoute path="/test" component={() => <TestRouteComponent />} />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
