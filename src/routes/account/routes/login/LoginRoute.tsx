import Logo from 'components/Logo';
import SecondaryBackground from 'components/SecondaryBackground';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from 'store';
import styled from 'themes/styled';
import { loginWithFacebook, loginWithGoogle } from '../../account-actions';
import ThirdPartyButton from '../../components/ThirdPartyButton';
import {
  FacebookColoredIcon,
  GoogleColoredIcon
} from '../../components/ThirdPartyIcons';

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
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <Content>
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
      </Content>
    </Wrapper>
  );
};

export default LoginRoute;
