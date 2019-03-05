import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography/Typography';
import Link from 'components/Link';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import ThirdPartyButton from 'routes/account/components/ThirdPartyButton';
import {
  FacebookColoredIcon,
  GoogleColoredIcon,
} from 'routes/account/components/ThirdPartyIcons';
import styled from 'themes/styled';

const LoginTextText = styled(Typography as SFC<TypographyProps>)`
  &.login__text {
    color: ${props => props.theme.secondaryBackground.textColor};
  }

  .login__link {
    color: ${props => props.theme.secondaryBackground.linkColor};
  }
`;

const SignupButtonWrapper = styled.div`
  flex-direction: column;
  flex: initial;
  display: flex;
  width: 95%;
  align-items: center;

  .signup-button {
    margin-bottom: 0.7rem;
    max-width: 20rem;
  }
`;

const SignUpRoute: FunctionComponent = () => (
  <>
    <SignupButtonWrapper>
      <ThirdPartyButton
        className="signup-button"
        icon={<GoogleColoredIcon />}
        text="Skapa med Google"
      />
      <ThirdPartyButton
        className="signup-button"
        icon={<FacebookColoredIcon />}
        text="Skapa med Facebook"
      />
    </SignupButtonWrapper>

    <LoginTextText className="login__text" color="default" variant="body2">
      Har du redan ett konto?&nbsp;
      <Link
        color="primary"
        className="create-account__link"
        href="/account/login"
      >
        Logga in
      </Link>
    </LoginTextText>
  </>
);

export default SignUpRoute;
