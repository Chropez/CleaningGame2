import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import HomeRouteComponent from 'routes/home';
import LoginRouteComponent from 'routes/account/routes/login';
import AccountRouteComponent from './account';

let RoutesComponent: FunctionComponent<{}> = () => {
  return (
    <Switch>
      {/* <Route exact={true} path='/' component={() => <HomeRouteComponent />} /> */}
      <Route
        exact={true}
        path="/account"
        component={() => <AccountRouteComponent />}
      />
      <Route
        exact={true}
        path="/account/login"
        component={() => <LoginRouteComponent />}
      />
      <Route render={() => <Redirect to="/account" />} />
    </Switch>
  );
};

export default RoutesComponent;
