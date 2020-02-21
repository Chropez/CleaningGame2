import React, { FC, useEffect, useMemo } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import BottomButtonBar from 'components/BottomButtonBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameId } from '../../game-duck';
import { selectCurrentUserId } from 'application/selectors';

import {
  chooseTask,
  changeTaskAssignee,
  goToPreviousStep,
  // goToNextStep,
  subscribeToChooseTasksPhase,
  unsubscribeFromChooseTasksPhase,
  selectPlayerTurn,
  selectAvailableTasksViewModel,
  selectTasksForPlayer,
  selectMinEstimationPointsPerPlayer,
  selectMaxEstimationPointsPerPlayer
} from './choose-tasks-duck';
import ChooseTasksContainer from './ChooseTaskContainer';
import { Button } from '@material-ui/core';
import ChooseTasksSummary from './ChooseTasksSummary';
import calculatePlayerPoints from 'routes/games/utils/calculate-player-points';

const ChooseTasksPhaseContainer: FC = () => {
  let dispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  let availableTasks = useSelector(selectAvailableTasksViewModel);
  let playerTurn = useSelector(selectPlayerTurn);
  let currentUserId = useSelector(selectCurrentUserId);
  let playersWithTasks = useSelector(selectTasksForPlayer);
  let playersAreChoosingTasks = availableTasks.length > 0;
  let minEstimationPointsPerPlayer = useSelector(
    selectMinEstimationPointsPerPlayer
  );
  let maxEstimationPointsPerPlayer = useSelector(
    selectMaxEstimationPointsPerPlayer
  );

  let hasUnfairPointDistribution = useMemo(
    () =>
      playersWithTasks.some(player => {
        let playerPoints = calculatePlayerPoints(player.tasks);
        return (
          playerPoints <= minEstimationPointsPerPlayer ||
          playerPoints >= maxEstimationPointsPerPlayer
        );
      }),
    [
      maxEstimationPointsPerPlayer,
      minEstimationPointsPerPlayer,
      playersWithTasks
    ]
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
              playersWithTasks={playersWithTasks}
              availableTasks={availableTasks}
              onChooseTask={taskId => dispatch(chooseTask(taskId))}
              minEstimationPointsPerPlayer={minEstimationPointsPerPlayer}
              maxEstimationPointsPerPlayer={maxEstimationPointsPerPlayer}
            />
          ) : (
            <ChooseTasksSummary
              hasUnfairPointDistribution={hasUnfairPointDistribution}
              playersWithTasks={playersWithTasks}
              onChangeTaskAssignee={(taskId, newAssigneeId) =>
                dispatch(changeTaskAssignee(taskId, newAssigneeId))
              }
              minEstimationPointsPerPlayer={minEstimationPointsPerPlayer}
              maxEstimationPointsPerPlayer={maxEstimationPointsPerPlayer}
            />
          )}
        </GamePhaseContentWrapper>

        <BottomButtonBar>
          <Button
            color="default"
            aria-label="Previous stage"
            onClick={() => dispatch(goToPreviousStep())}
          >
            Tillbaka
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            aria-label="Next stage"
            onClick={() => dispatch(goToNextStep())}
          >
            Fortsätt
          </Button> */}
        </BottomButtonBar>
      </GamePhaseWrapper>
    </>
  );
};

export default ChooseTasksPhaseContainer;
