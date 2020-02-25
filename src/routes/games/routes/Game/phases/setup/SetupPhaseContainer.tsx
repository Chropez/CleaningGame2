import React, { FC, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Snackbar,
  IconButton
} from '@material-ui/core';
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
  removePlayerFromGame
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
  unsubscribeFromGameTasks,
  selectInvitationUrlCopiedSnackbarIsOpen,
  closeInvitationUrlCopiedSnackbar,
  openInvitationUrlCopiedSnackbar
} from './setup-phase-duck';
import {
  selectGame,
  selectGamePlayersViewModel,
  selectGameId
} from '../../game-duck';
import { selectCurrentUserId } from 'application/selectors';
import { Close as CloseIcon } from 'mdi-material-ui';

const SetupPhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);
  let gameId = useSelector(selectGameId);

  let gamePlayers = useSelector(selectGamePlayersViewModel);
  let showAddPlayerModal = useSelector(selectShowAddPlayerModal);
  let isLoadingAvailablePlayers = useSelector(selectIsLoadingAvailablePlayers);
  let availablePlayers = useSelector(selectAvailablePlayers);
  let currentPlayerId = useSelector(selectCurrentUserId);

  let newTaskText = useSelector(selectNewTaskText);
  let tasks = useSelector(selectGameTasks);

  let invitationUrlCopiedSnackbarIsOpen = useSelector(
    selectInvitationUrlCopiedSnackbarIsOpen
  );

  useEffect(() => {
    dispatch(subscribeToGameTasks(gameId));
    return () => dispatch(unsubscribeFromGameTasks(gameId));
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

  let invitationUrl = `${window.location.protocol}//${window.location.hostname}/games/${gameId}/invitation/${game.invitationId}`;

  let onShareClick = () => {
    if (!navigator.share) {
      throw new Error('Cannot share game');
    }
    navigator.share({
      title: 'Städspelet',
      text: 'Du har blivit inbjuden att spela städspelet!',
      url: invitationUrl
    });
  };

  let onCopyInvitationUrl = () => {
    navigator.clipboard.writeText(invitationUrl);
    dispatch(openInvitationUrlCopiedSnackbar());
  };

  return (
    <GamePhaseWrapper>
      <GamePhaseContentWrapper>
        <Box p={2}>
          <Typography>
            Glöm inte att bjuda in dina städkompanjoner till spelet.
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
          canShare={navigator.share !== undefined}
          onShareClick={onShareClick}
          shareLink={invitationUrl}
          onCopyInvitationUrl={onCopyInvitationUrl}
        />
        <TasksContainer
          onAddTask={() => dispatch(addTask())}
          onChange={newText => dispatch(newTaskTextChanged(newText))}
          onRemoveTask={taskId => dispatch(removeTask(taskId))}
          newTaskText={newTaskText}
          tasks={tasks}
        />
      </GamePhaseContentWrapper>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={invitationUrlCopiedSnackbarIsOpen}
        autoHideDuration={3000}
        onClose={() => dispatch(closeInvitationUrlCopiedSnackbar())}
        message="Länken har kopierats"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => dispatch(closeInvitationUrlCopiedSnackbar())}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
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
