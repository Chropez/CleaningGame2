import React, { FC } from 'react';
import { Typography, Box } from '@material-ui/core';
import GamePlayersContainer from './players/PlayersContainer';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, selectGameTasks } from '../../../game-duck';
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

  return (
    <>
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
    </>
  );
};

export default SetupPhaseContainer;
