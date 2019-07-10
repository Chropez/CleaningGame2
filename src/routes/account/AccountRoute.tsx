import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import AnonymousOnlyRoute from 'utils/routes/AnonymousOnlyRoute';
import LoginRouteComponent from './routes/login';

const AccountRouteComponent: FunctionComponent = () => (
  <Switch>
    <AnonymousOnlyRoute
      exact={true}
      path="/account/login"
      component={() => <LoginRouteComponent />}
    />
    <AnonymousOnlyRoute component={() => <Redirect to="/account/login" />} />
  </Switch>
);

export default AccountRouteComponent;
