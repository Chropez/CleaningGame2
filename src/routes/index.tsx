import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import HomeRouteComponent from 'routes/home';
import LoginRouteComponent from 'routes/account/routes/login';

let RoutesComponent: FunctionComponent<{}> = () => {
  return (
    <Switch>
      {/* <Route exact={true} path='/' component={() => <HomeRouteComponent />} /> */}
      <Route
        exact={true}
        path="/login"
        component={() => <LoginRouteComponent />}
      />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  );
};

export default RoutesComponent;
