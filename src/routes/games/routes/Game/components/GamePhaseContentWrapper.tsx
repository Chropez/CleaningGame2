import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { ContainerProps } from '@material-ui/core/Container';

const GamePhaseContentWrapper: FC<ContainerProps> = props => (
  <Container maxWidth="md" {...props} />
);

export default GamePhaseContentWrapper;
