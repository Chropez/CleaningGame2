import React, { FC } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import GamePlayersContainer from './players/PlayersContainer';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
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
import TasksContainer from './add-tasks/TasksContainer';
import {
  newTaskTextChanged,
  selectNewTaskText,
  addTask,
  removeTask
} from './add-tasks/add-tasks-duck';
import BottomNavigation from 'components/BottomNavigation';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import { goToNextStep } from './setup-phase-duck';
import { selectGameTasks, selectGame } from '../../game-duck';

const SetupPhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);

  let gamePlayers = useSelector(selectGamePlayers);
  let showAddPlayerModal = useSelector(selectShowAddPlayerModal);
  let isLoadingAvailablePlayers = useSelector(selectIsLoadingAvailablePlayers);
  let availablePlayers = useSelector(selectAvailablePlayers);
  let currentPlayerId = useSelector(selectCurrentUserId);

  let newTaskText = useSelector(selectNewTaskText);
  let tasks = useSelector(selectGameTasks);

  async function loadAddPlayerDialog() {
    dispatch(getAvailablePlayers());
    dispatch(showAddPlayerDialog());
  }

  if (!game) {
    return null;
  }

  let canGoToNextStep =
    tasks.length > 1 &&
    gamePlayers.length > 1 &&
    tasks.length >= gamePlayers.length;

  return (
    <GamePhaseWrapper>
      <GamePhaseContentWrapper>
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
        <TasksContainer
          onAddTask={() => dispatch(addTask())}
          onChange={newText => dispatch(newTaskTextChanged(newText))}
          onRemoveTask={taskId => dispatch(removeTask(taskId))}
          newTaskText={newTaskText}
          tasks={tasks}
        />
      </GamePhaseContentWrapper>
      <BottomNavigation>
        <Box p={2}>
          <Button
            disabled={!canGoToNextStep}
            color="primary"
            variant="contained"
            fullWidth={true}
            aria-label="Next step"
            onClick={() => dispatch(goToNextStep())}
          >
            Nästa
          </Button>
        </Box>
      </BottomNavigation>
    </GamePhaseWrapper>
  );
};

export default SetupPhaseContainer;
