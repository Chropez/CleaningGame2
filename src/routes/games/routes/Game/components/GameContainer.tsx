import React, { FC, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import GamePlayersContainer from './GamePlayersContainer';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToGame,
  unsubscribeToGame,
  selectGame,
  selectGamePlayers,
  showAddPlayerDialog,
  selectShowAddPlayerModal,
  hideAddPlayerDialog,
  loadAvailablePlayers,
  selectIsLoadingAvailablePlayers,
  selectAvailablePlayers
} from '../game-duck';
import GameAppBar from './GameAppBar';

interface Props {
  gameId: string;
}
const GameContainer: FC<Props> = ({ gameId }) => {
  let dispatch: AppThunkDispatch = useDispatch();
  let game = useSelector(selectGame);
  let gamePlayers = useSelector(selectGamePlayers);
  let showAddPlayerModal = useSelector(selectShowAddPlayerModal);
  let isLoadingAvailablePlayers = useSelector(selectIsLoadingAvailablePlayers);
  let availablePlayers = useSelector(selectAvailablePlayers);

  useEffect(() => {
    dispatch(subscribeToGame(gameId));
    return () => dispatch(unsubscribeToGame(gameId));
  }, [dispatch, gameId]);

  async function loadAddPlayerDialog() {
    dispatch(loadAvailablePlayers());
    dispatch(showAddPlayerDialog());
  }

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
        <GamePlayersContainer
          availablePlayers={availablePlayers}
          isLoadingAvailablePlayers={isLoadingAvailablePlayers}
          onAddPlayerToGame={id => console.log(`Adding ${id}`)}
          onShowAddPlayerDialog={loadAddPlayerDialog}
          onHidePlayersAddDialog={() => dispatch(hideAddPlayerDialog())}
          onRemovePlayer={() => console.log('removing player')}
          players={gamePlayers}
          showAddPlayerModal={showAddPlayerModal}
        />
      </Container>
    </>
  );
};

export default GameContainer;
