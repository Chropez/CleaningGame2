import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AccountRoute from './account';
import HomeRouteComponent from './home';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route path="/account" component={() => <AccountRoute />} />
      <Route path="/home" component={() => <HomeRouteComponent />} />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
