import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch } from 'redux-react-hook';
import { AppThunkDispatch } from 'store';
import styled from 'themes/styled';
import { loginWithFacebook, loginWithGoogle } from '../../account-actions';
import ThirdPartyButton from '../../components/ThirdPartyButton';
import {
  FacebookColoredIcon,
  GoogleColoredIcon,
} from '../../components/ThirdPartyIcons';

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

const LoginRoute: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();

  function handleLoginWithGoogleClick() {
    dispatch(loginWithGoogle());
  }

  function handleLoginWithFacebookClick() {
    dispatch(loginWithFacebook());
  }

  return (
    <>
      <LoginButtonWrapper>
        <ThirdPartyButton
          className="login-button"
          icon={<GoogleColoredIcon />}
          text="Logga in med Google"
          onClick={handleLoginWithGoogleClick}
        />
        <ThirdPartyButton
          className="login-button"
          icon={<FacebookColoredIcon />}
          text="Logga in med Facebook"
          onClick={handleLoginWithFacebookClick}
        />
      </LoginButtonWrapper>
    </>
  );
};

export default LoginRoute;
