import React, { FC, useEffect } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import GamePlayersContainer from './players/PlayersContainer';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import BottomButtonBar from 'components/BottomButtonBar';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import {
  goToNextStep,
  selectGameTasks,
  subscribeToGameTasks,
  unsubscribeToGameTasks
} from './setup-phase-duck';
import { selectGame, selectGamePlayersViewModel } from '../../game-duck';

const SetupPhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);
  let gameId = game.id;

  let gamePlayers = useSelector(selectGamePlayersViewModel);
  let showAddPlayerModal = useSelector(selectShowAddPlayerModal);
  let isLoadingAvailablePlayers = useSelector(selectIsLoadingAvailablePlayers);
  let availablePlayers = useSelector(selectAvailablePlayers);
  let currentPlayerId = useSelector(selectCurrentUserId);

  let newTaskText = useSelector(selectNewTaskText);
  let tasks = useSelector(selectGameTasks);

  useEffect(() => {
    dispatch(subscribeToGameTasks(gameId));
    return () => dispatch(unsubscribeToGameTasks(gameId));
  }, [dispatch, gameId]);

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
            Glöm inte att bjuda in dina städkompanjoner till spelet eller be dem
            att söka på spelet <strong>{game.name}</strong>.
          </Typography>
        </Box>
        <GamePlayersContainer
          availablePlayers={availablePlayers}
          currentPlayerId={currentPlayerId}
          isLoadingAvailablePlayers={isLoadingAvailablePlayers}
          onAddPlayerToGame={userId =>
            dispatch(addPlayerToGame(gameId, userId))
          }
          onShowAddPlayerDialog={loadAddPlayerDialog}
          onHidePlayersAddDialog={() => dispatch(hideAddPlayerDialog())}
          onRemovePlayer={userId => dispatch(removePlayerFromGame(userId))}
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
      <BottomButtonBar>
        <Button
          disabled={!canGoToNextStep}
          color="primary"
          variant="contained"
          fullWidth={true}
          aria-label="Next stage"
          onClick={() => dispatch(goToNextStep())}
        >
          Nästa
        </Button>
      </BottomButtonBar>
    </GamePhaseWrapper>
  );
};

export default SetupPhaseContainer;
