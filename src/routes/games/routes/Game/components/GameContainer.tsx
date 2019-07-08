import React, { FC, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToGame, unsubscribeToGame, selectGame } from '../game-duck';
import GameAppBar from './GameAppBar';
import { GamePhase } from 'models/game';
import SetupPhaseContainer from './phases/setup/SetupPhaseContainer';

interface Props {
  gameId: string;
}
const GameContainer: FC<Props> = ({ gameId }) => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);

  useEffect(() => {
    dispatch(subscribeToGame(gameId));
    return () => dispatch(unsubscribeToGame(gameId));
  }, [dispatch, gameId]);

  if (!game) {
    return null;
  }

  return (
    <>
      <GameAppBar gameName={game.name} />
      <Container maxWidth="md">
        {game.phase === GamePhase.Setup && <SetupPhaseContainer />}
      </Container>
    </>
  );
};

export default GameContainer;
