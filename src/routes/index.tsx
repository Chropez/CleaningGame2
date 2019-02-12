import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeRouteComponent from 'routes/home';

const RoutesComponent: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path='/' component={() => <HomeRouteComponent />} />
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  );
};

export default RoutesComponent;
