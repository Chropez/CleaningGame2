import * as React from 'react';
import { FunctionComponent } from 'react';
import styled from 'themes/styled';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;
`;

const Application: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Application;
