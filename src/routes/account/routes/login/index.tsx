import Logo from 'components/Logo';
import SecondaryBackground from 'components/SecondaryBackground';
import { FunctionComponent } from 'react';
import * as React from 'react';

const LoginRouteComponent: FunctionComponent = () => {
  return (
    <SecondaryBackground>
      <Logo />
    </SecondaryBackground>
  );
};

export default LoginRouteComponent;
