import React, { FC } from 'react';
import { Container as MuiContainer } from '@material-ui/core';
import { ContainerProps } from '@material-ui/core/Container';
import styled from 'styled-components/macro';

const Container = styled(MuiContainer as FC<ContainerProps>)`
  && {
    padding-right: 0;
    padding-left: 0;
  }
`;

const GamePhaseContentWrapper: FC<ContainerProps> = props => (
  <Container maxWidth="md" {...props} />
);

export default GamePhaseContentWrapper;
