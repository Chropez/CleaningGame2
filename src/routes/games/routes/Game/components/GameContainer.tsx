import React, { FC, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import GamePlayers from './GamePlayers';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToGame,
  unsubscribeToGame,
  selectGame,
  selectGamePlayers
} from '../game-duck';
import GameAppBar from './GameAppBar';

interface Props {
  gameId: string;
}
const GameContainer: FC<Props> = ({ gameId }) => {
  let dispatch: AppThunkDispatch = useDispatch();
  let game = useSelector(selectGame);
  let gamePlayers = useSelector(selectGamePlayers);

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
        <Box mt={2} mb={2}>
          <Typography>
            Spelare kan bli inbjudna av dig eller gå med genom att söka på
            spelet <strong>{game.name}</strong>.
          </Typography>
        </Box>
        <GamePlayers players={gamePlayers} />
      </Container>
    </>
  );
};

export default GameContainer;
