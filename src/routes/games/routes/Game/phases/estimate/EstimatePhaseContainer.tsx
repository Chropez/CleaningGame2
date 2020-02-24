import React, { FC, useEffect } from 'react';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToPreviousStep,
  estimateTask,
  subscribeToEstimatePhase,
  unsubscribeFromEstimatePhase,
  selectTasksWithEstimation,
  updateCurrentPlayerIsDoneEstimating,
  goToNextStep
} from './estimate-phase-duck';
import {
  selectGameId,
  selectGamePlayersViewModel,
  selectCurrentPlayer
} from '../../game-duck';
import EstimationBoardContainer from './EstimationBoardContainer';
import PlayerEstimationWaitList from './PlayerEstimationWaitList';

const EstimatePhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  let tasksWithEstimation = useSelector(selectTasksWithEstimation);
  let players = useSelector(selectGamePlayersViewModel);
  let currentPlayer = useSelector(selectCurrentPlayer);

  let totalPlayers = players.length;
  let playersDoneEstimating = players.filter(player => player.isDoneEstimating)
    .length;
  let allPlayersAreDoneEstimating = playersDoneEstimating === totalPlayers;

  let tasksEstimated = tasksWithEstimation.filter(
    taskWithEstimation => taskWithEstimation.estimation !== undefined
  ).length;

  let tasksLength = tasksWithEstimation.length;
  let allTasksEstimated = tasksEstimated === tasksLength;

  useEffect(() => {
    dispatch(subscribeToEstimatePhase(gameId));
    return () => dispatch(unsubscribeFromEstimatePhase(gameId));
  }, [dispatch, gameId]);

  return (
    <>
      {currentPlayer && !currentPlayer.isDoneEstimating && (
        <EstimationBoardContainer
          canContinue={allTasksEstimated}
          cantContinueButtonMessage={`(${tasksEstimated}/${tasksLength})`}
          onBackClick={() => dispatch(goToPreviousStep())}
          onContinueClick={() =>
            dispatch(updateCurrentPlayerIsDoneEstimating(true))
          }
          onEstimate={(taskId, estimate, estimationId) =>
            dispatch(estimateTask(taskId, estimate, estimationId))
          }
          tasksWithEstimation={tasksWithEstimation}
        />
      )}

      {currentPlayer && currentPlayer.isDoneEstimating && (
        <PlayerEstimationWaitList
          canContinue={allPlayersAreDoneEstimating}
          cantContinueButtonMessage={`(${playersDoneEstimating}/${totalPlayers} spelare)`}
          onBackClick={() =>
            dispatch(updateCurrentPlayerIsDoneEstimating(false))
          }
          onContinueClick={() => dispatch(goToNextStep(true))}
          players={players}
        />
      )}
    </>
  );
};

export default EstimatePhaseContainer;
