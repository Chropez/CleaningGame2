import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnonymousOnlyRoute from 'utils/AnonymousOnlyRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import AccountRoute from './account';
import HomeRoute from './home';
import TestRouteComponent from './test';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <AnonymousOnlyRoute
        path="/account/login"
        component={() => <AccountRoute />}
      />

      <ProtectedRoute exact={true} path="/" component={() => <HomeRoute />} />
      <ProtectedRoute path="/games/:id" component={() => <HomeRoute />} />

      <ProtectedRoute path="/test" component={() => <TestRouteComponent />} />

      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
