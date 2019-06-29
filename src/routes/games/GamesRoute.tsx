import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

interface GamesParams {
  gameId: string;
}

const GamesRoute: FC<RouteComponentProps<GamesParams>> = ({
  match: {
    params: { gameId }
  }
}) => {
  return (
    <Container>
      <h1>hello {gameId} </h1>
    </Container>
  );
};

export default GamesRoute;
