import Logo from 'components/Logo';
import SecondaryBackground from 'components/SecondaryBackground';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'themes/styled';
import LoginRouteComponent from './routes/login';
import SignUpRoute from './routes/sign-up';

const Wrapper = styled(SecondaryBackground)`
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const AccountRouteComponent: FunctionComponent = () => (
  <Wrapper>
    <Header>
      <Logo />
    </Header>
    <Content>
      <Switch>
        <Route
          exact={true}
          path="/account/login"
          component={() => <LoginRouteComponent />}
        />
        <Route
          exact={true}
          path="/account/sign-up"
          component={() => <SignUpRoute />}
        />
        <Route component={() => <Redirect to="/account/login" />} />
      </Switch>
    </Content>
  </Wrapper>
);

export default AccountRouteComponent;
