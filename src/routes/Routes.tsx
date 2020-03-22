import React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnonymousOnlyRoute from 'utils/routes/AnonymousOnlyRoute';
import ProtectedRoute from 'utils/routes/ProtectedRoute';
import AccountRoute from './account';
import HomeRoute from './home';
import { GameRoute } from './games';
import PrivacyPolicy from './terms/privacy-policy';
import TermsAndConditions from './terms/terms-and-conditions';
import InvitationRoute from './games/routes/invitation/InvitationRoute';

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <ProtectedRoute exact={true} path="/">
        <HomeRoute />
      </ProtectedRoute>
      <ProtectedRoute path="/games/:gameId/invitation/:invitationId">
        <InvitationRoute />
      </ProtectedRoute>
      <ProtectedRoute path="/games/:gameId">
        <GameRoute />
      </ProtectedRoute>
      <Route path="/terms/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route path="/terms/terms-and-conditions">
        <TermsAndConditions />
      </Route>
      <AnonymousOnlyRoute path="/account/login">
        <AccountRoute />
      </AnonymousOnlyRoute>

      <Route render={() => <Redirect to="/account/login" />} />
    </Switch>
  );
};

export default Routes;
