import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginRoute from 'routes/account/routes/login';
import AccountRoute from './account/AccountRoute';

let Routes: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/account" component={() => <AccountRoute />} />
      <Route
        exact={true}
        path="/account/login"
        component={() => <LoginRoute />}
      />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default Routes;
