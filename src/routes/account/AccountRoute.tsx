import { Link, Typography } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { TypographyProps } from '@material-ui/core/Typography';
import Logo from 'components/Logo';
import SecondaryBackground from 'components/SecondaryBackground';
import Google from 'mdi-material-ui/Google';
import FacebookBox from 'mdi-material-ui/FacebookBox';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import styled from 'themes/styled';

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

const IconWrapper = styled.div`
  margin-right: 1rem;
  display: inline-flex;
`;

const LoginButton = styled(Button as SFC<ButtonProps>)`
  width: 95%;
  max-width: 20rem;

  &.login-button {
    margin-bottom: 1rem;
  }
`;

const LoginWithGoogleButton = () => (
  <LoginButton className="login-button" color="default" variant="contained">
    <IconWrapper>
      <Google />
    </IconWrapper>
    Logga in med Google
  </LoginButton>
);

const LoginWithFacebookButton = () => (
  <LoginButton className="login-button" color="default" variant="contained">
    <IconWrapper>
      <FacebookBox />
    </IconWrapper>
    Logga in med Facebook
  </LoginButton>
);

const CreateAccountText = styled(Typography as SFC<TypographyProps>)`
  &.create-account__text {
    color: ${props => props.theme.secondaryBackground.textColor};
  }

  a.create-account__link {
    color: ${props => props.theme.secondaryBackground.linkColor};
  }
`;

const AccountRouteComponent: FunctionComponent = () => (
  <Wrapper>
    <Header>
      <Logo />
    </Header>
    <Content>
      <LoginWithGoogleButton />
      <LoginWithFacebookButton />
      <CreateAccountText
        className="create-account__text"
        color="default"
        variant="body2"
      >
        Har du inte ett konto?&nbsp;
        <Link className="create-account__link" href="/account/create">
          Skapa ett här
        </Link>
      </CreateAccountText>
    </Content>
  </Wrapper>
);

export default AccountRouteComponent;
