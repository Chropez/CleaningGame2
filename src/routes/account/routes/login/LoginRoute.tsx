import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import Link from 'components/Link';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import styled from 'themes/styled';
import ThirdPartyButton from '../../components/ThirdPartyButton';
import {
  FacebookColoredIcon,
  GoogleColoredIcon,
} from '../../components/ThirdPartyIcons';

const CreateAccountText = styled(Typography as SFC<TypographyProps>)`
  &.create-account__text {
    color: ${props => props.theme.secondaryBackground.textColor};
  }

  .create-account__link {
    color: ${props => props.theme.secondaryBackground.linkColor};
  }
`;

const LoginButtonWrapper = styled.div`
  flex-direction: column;
  flex: initial;
  display: flex;
  width: 95%;
  align-items: center;

  .login-button {
    margin-bottom: 0.7rem;
    max-width: 20rem;
  }
`;

const LoginRoute: FunctionComponent = () => (
  <>
    <LoginButtonWrapper>
      <ThirdPartyButton
        className="login-button"
        icon={<GoogleColoredIcon />}
        text="Logga in med Google"
      />
      <ThirdPartyButton
        className="login-button"
        icon={<FacebookColoredIcon />}
        text="Logga in med Facebook"
      />
    </LoginButtonWrapper>

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
      >
        Skapa ett här
      </Link>
    </CreateAccountText>
  </>
);

export default LoginRoute;
