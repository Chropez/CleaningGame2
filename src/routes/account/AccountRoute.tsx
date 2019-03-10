import Logo from 'components/Logo';
import SecondaryBackground from 'components/SecondaryBackground';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import styled from 'themes/styled';
import AnonymousOnlyRoute from 'utils/AnonymousOnlyRoute';
import LoginRouteComponent from './routes/login';

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
        <AnonymousOnlyRoute
          exact={true}
          path="/account/login"
          component={() => <LoginRouteComponent />}
        />
        <AnonymousOnlyRoute
          component={() => <Redirect to="/account/login" />}
        />
      </Switch>
    </Content>
  </Wrapper>
);

export default AccountRouteComponent;
