import React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import useRealVh from 'utils/useRealVh';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const Application: FunctionComponent = ({ children }) => {
  useRealVh();

  return <Container>{children}</Container>;
};

export default Application;
