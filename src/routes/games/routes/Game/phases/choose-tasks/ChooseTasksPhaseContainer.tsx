import React, { FC, useEffect } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import BottomButtonBar from 'components/BottomButtonBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameId, selectCurrentUserId } from '../../game-duck';
import {
  goToPreviousStep,
  goToNextStep,
  subscribeToChooseTasksPhase,
  unsubscribeFromChooseTasksPhase,
  selectPlayerTurn,
  selectAvailableTasksViewModel,
  selectTasksForPlayer,
  chooseTask,
  selectTotalTasks,
  selectTotalEstimationPoints,
  selectMinEstimationPointsPerPlayer,
  selectMaxEstimationPointsPerPlayer
} from './choose-tasks-duck';
import ChooseTasksContainer from './ChooseTaskContainer';
import { Button } from '@material-ui/core';
import ChooseTasksSummary from './ChooseTasksSummary';

const ChooseTasksPhaseContainer: FC = () => {
  let dispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  let availableTasks = useSelector(selectAvailableTasksViewModel);
  let playerTurn = useSelector(selectPlayerTurn);
  let currentUserId = useSelector(selectCurrentUserId);
  let playerWithTasks = useSelector(selectTasksForPlayer);
  let playersAreChoosingTasks = availableTasks.length > 0;
  let totalTasks = useSelector(selectTotalTasks);
  let totalEstimationPoints = useSelector(selectTotalEstimationPoints);
  let minEstimationPointsPerPlayer = useSelector(
    selectMinEstimationPointsPerPlayer
  );
  let maxEstimationPointsPerPlayer = useSelector(
    selectMaxEstimationPointsPerPlayer
  );

  let isCurrentPlayerTurn =
    playerTurn && playerTurn.user && playerTurn.user.id === currentUserId;

  useEffect(() => {
    dispatch(subscribeToChooseTasksPhase(gameId));
    return () => {
      dispatch(unsubscribeFromChooseTasksPhase(gameId));
    };
  }, [dispatch, gameId]);

  return (
    <>
      <GamePhaseWrapper>
        <GamePhaseContentWrapper>
          {playersAreChoosingTasks ? (
            <ChooseTasksContainer
              isCurrentPlayerTurn={isCurrentPlayerTurn}
              playerTurn={playerTurn}
              playerWithTasks={playerWithTasks}
              availableTasks={availableTasks}
              onChooseTask={taskId => dispatch(chooseTask(taskId))}
              totalTasks={totalTasks}
              totalEstimationPoints={totalEstimationPoints}
              minEstimationPointsPerPlayer={minEstimationPointsPerPlayer}
              maxEstimationPointsPerPlayer={maxEstimationPointsPerPlayer}
            />
          ) : (
            <ChooseTasksSummary />
          )}
        </GamePhaseContentWrapper>

        <BottomButtonBar>
          <Button
            color="default"
            variant="outlined"
            aria-label="Previous stage"
            onClick={() => dispatch(goToPreviousStep())}
          >
            Tillbaka
          </Button>
          <Button
            color="primary"
            variant="contained"
            aria-label="Next stage"
            onClick={() => dispatch(goToNextStep())}
          >
            Fortsätt
          </Button>
        </BottomButtonBar>
      </GamePhaseWrapper>
    </>
  );
};

export default ChooseTasksPhaseContainer;
