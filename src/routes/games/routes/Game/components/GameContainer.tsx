import React, { FC, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import GamePlayersContainer from './players/PlayersContainer';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToGame, unsubscribeToGame, selectGame } from '../game-duck';
import {
  selectGamePlayers,
  showAddPlayerDialog,
  selectShowAddPlayerModal,
  hideAddPlayerDialog,
  getAvailablePlayers,
  selectIsLoadingAvailablePlayers,
  selectAvailablePlayers,
  addPlayerToGame,
  removePlayerFromGame,
  selectCurrentUserId
} from './players/players-duck';
import GameAppBar from './GameAppBar';
import TasksContainer from './add-tasks/TasksContainer';

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
  let currentPlayerId = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(subscribeToGame(gameId));
    return () => dispatch(unsubscribeToGame(gameId));
  }, [dispatch, gameId]);

  async function loadAddPlayerDialog() {
    dispatch(getAvailablePlayers());
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
            Andra spelare kan bli inbjudna av dig eller gå med genom att söka på
            spelet <strong>{game.name}</strong>.
          </Typography>
        </Box>
        <GamePlayersContainer
          availablePlayers={availablePlayers}
          currentPlayerId={currentPlayerId}
          isLoadingAvailablePlayers={isLoadingAvailablePlayers}
          onAddPlayerToGame={id => dispatch(addPlayerToGame(id))}
          onShowAddPlayerDialog={loadAddPlayerDialog}
          onHidePlayersAddDialog={() => dispatch(hideAddPlayerDialog())}
          onRemovePlayer={id => dispatch(removePlayerFromGame(id))}
          players={gamePlayers}
          showAddPlayerModal={showAddPlayerModal}
        />
        <TasksContainer />
      </Container>
    </>
  );
};

export default GameContainer;
