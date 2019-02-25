import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AccountRoute from './account';

const Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route path="/account" component={() => <AccountRoute />} />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
