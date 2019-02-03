import * as React from "react";
import { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const RoutesComponent: FunctionComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={() => <div>HOME</div>} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default RoutesComponent;
