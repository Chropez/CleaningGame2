import { Typography } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { TypographyProps } from '@material-ui/core/Typography';
import Link from 'components/Link';
import FacebookBox from 'mdi-material-ui/FacebookBox';
import Google from 'mdi-material-ui/Google';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import styled from 'themes/styled';

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

  .create-account__link {
    color: ${props => props.theme.secondaryBackground.linkColor};
  }
`;

const LoginRoute: FunctionComponent = () => (
  <>
    <LoginWithGoogleButton />
    <LoginWithFacebookButton />
    <CreateAccountText
      className="create-account__text"
      color="default"
      variant="body2"
    >
      Har du inte ett konto?&nbsp;
      <Link
        color="primary"
        className="create-account__link"
        href="/account/sign-up"
        component={undefined}
      >
        Skapa ett här
      </Link>
    </CreateAccountText>
  </>
);

export default LoginRoute;
