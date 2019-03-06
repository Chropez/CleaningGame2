import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnonymousOnlyRoute from 'utils/AnonymousOnlyRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import AccountRoute from './account';
import HomeRouteComponent from './home';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <AnonymousOnlyRoute path="/account" component={() => <AccountRoute />} />
      <ProtectedRoute path="/home" component={() => <HomeRouteComponent />} />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
