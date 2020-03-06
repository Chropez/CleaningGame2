import React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnonymousOnlyRoute from 'utils/routes/AnonymousOnlyRoute';
import ProtectedRoute from 'utils/routes/ProtectedRoute';
import AccountRoute from './account';
import HomeRoute from './home';
import TestRouteComponent from './test';
import { GameRoute } from './games';
import PrivacyPolicy from './terms/privacy-policy';
import TermsAndConditions from './terms/terms-and-conditions';
import InvitationRoute from './games/routes/invitation/InvitationRoute';

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <AnonymousOnlyRoute
        path="/account/login"
        component={() => <AccountRoute />}
      />

      <ProtectedRoute exact={true} path="/" component={HomeRoute} />
      <ProtectedRoute
        path="/games/:gameId/invitation/:invitationId"
        component={InvitationRoute}
      />
      <ProtectedRoute path="/games/:gameId" component={GameRoute} />
      <ProtectedRoute path="/test" component={TestRouteComponent} />
      <Route path="/terms/privacy-policy" component={PrivacyPolicy} />
      <Route
        path="/terms/terms-and-conditions"
        component={TermsAndConditions}
      />
      <ProtectedRoute path="/test" render={() => <TestRouteComponent />} />
      <Route render={() => <Redirect to="/account/login" />} />
    </Switch>
  );
};

export default Routes;
