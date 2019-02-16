import * as React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  flex: 1 0 100%;
`;

const Application: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Application;
