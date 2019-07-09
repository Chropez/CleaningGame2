import React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const Application: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Application;
