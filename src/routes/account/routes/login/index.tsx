import * as React from 'react';
import { FunctionComponent } from 'react';
import styled from 'themes/styled';
// import Logo from 'components/Logo';
import { withTheme } from '@material-ui/core/styles';
import Logo from 'components/Logo';

const Container = withTheme()(styled.div`
  background-image: linear-gradient(
    to right bottom,
    #62a3ff,
    #579af6,
    #4b91ed,
    #3e89e5,
    #3080dc,
    #2779d4,
    #1e71cc,
    #116ac4,
    #0d62bb,
    #085ab1,
    #0452a8,
    #004a9f
  );

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`);

const LoginRouteComponent: FunctionComponent = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default LoginRouteComponent;
