import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from './components/GameContainer';

interface GamesParams {
  gameId: string;
}

const GameRoute: FC<RouteComponentProps<GamesParams>> = ({
  match: {
    params: { gameId }
  }
}) => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return <GameContainer gameId={gameId} />;
};

export default GameRoute;
