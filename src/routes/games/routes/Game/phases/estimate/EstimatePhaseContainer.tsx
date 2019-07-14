import React, { FC, useEffect } from 'react';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import { Button, Box, Typography } from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import {
  goToPreviousStep,
  estimateTask,
  subscribeToEstimatePhase,
  unsubscribeToEstimatePhase,
  selectTasksWithEstimation
} from './estimate-phase-duck';
import EstimationBoard from './EstimationBoard';
import { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components/macro';
import { selectGameId } from '../../game-duck';

const ButtonMessage = styled(Typography as FC<TypographyProps>)`
  && {
    font-size: 0.6rem;
  }
`;

const EstimatePhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  // let tasks = useSelector(selectGameTasks);
  let gameId = useSelector(selectGameId);
  let tasksWithEstimation = useSelector(selectTasksWithEstimation);

  let totalPlayers = 3;
  let playersDoneEstimating = 2;

  let tasksEstimated = tasksWithEstimation.filter(
    taskWithEstimation => taskWithEstimation.estimation !== undefined
  ).length;

  let tasksLength = tasksWithEstimation.length;
  let playerIsDoneEstimating = tasksEstimated === tasksLength;

  // let allPlayersAreDoneEstimating = false;

  let disabledButtonMessage = playerIsDoneEstimating
    ? `(${playersDoneEstimating}/${totalPlayers} spelare)`
    : `(${tasksEstimated}/${tasksLength})`;

  useEffect(() => {
    dispatch(subscribeToEstimatePhase(gameId));
    return () => dispatch(unsubscribeToEstimatePhase(gameId));
  }, [dispatch, gameId]);

  return (
    <GamePhaseWrapper>
      <GamePhaseContentWrapper>
        <Box mt={2} mb={2}>
          <Typography>
            Nu ska städuppgifterna betygsättas. 1 är lättast, 5 är jobbigast.
            Den som är snabbast får välja uppgifter först!
          </Typography>
          <EstimationBoard
            tasksWithEstimation={tasksWithEstimation}
            onEstimate={(taskId, estimate, estimationId) =>
              dispatch(estimateTask(taskId, estimate, estimationId))
            }
          />
        </Box>
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
          disabled={!playerIsDoneEstimating}
          color="primary"
          variant="contained"
          aria-label="Next stage"
          // onClick={() => dispatch(goToNextStep())}
        >
          Fortsätt <br />
          {!playerIsDoneEstimating && (
            <ButtonMessage>{disabledButtonMessage}</ButtonMessage>
          )}
        </Button>
      </BottomButtonBar>
    </GamePhaseWrapper>
  );
};

export default EstimatePhaseContainer;
