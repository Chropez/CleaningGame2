import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameContainer from './GameContainer';

const GameRoute: FC = () => {
  let { gameId } = useParams();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return <GameContainer gameId={gameId!} />;
};

export default GameRoute;
