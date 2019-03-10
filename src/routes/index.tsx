import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'utils/ProtectedRoute';
import AccountRoute from './account';
import TestRouteComponent from './test';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route path="/account" component={() => <AccountRoute />} />
      <ProtectedRoute path="/test" component={() => <TestRouteComponent />} />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
