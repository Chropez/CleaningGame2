import React, { FC } from 'react';
import { AppThunkDispatch } from 'store';
import { useDispatch } from 'react-redux';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import { Button, Box, Typography } from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import { goToPreviousStep, estimateTask } from './estimate-phase-duck';
import EstimationBoard from './EstimationBoard';
import { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components/macro';
import Task from 'models/task';

const ButtonMessage = styled(Typography as FC<TypographyProps>)`
  && {
    font-size: 0.6rem;
  }
`;

const EstimatePhaseContainer: FC = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  // let tasks = useSelector(selectGameTasks);

  let canGoToNextStep = false;
  let totalPlayers = 3;
  let playersDoneEstimating = 2;
  let tasksEstimated = 5;
  let tasksLength = 5;
  let playerIsDoneEstimating = tasksEstimated === tasksLength;

  let disabledButtonMessage = playerIsDoneEstimating
    ? `(${playersDoneEstimating}/${totalPlayers} spelare)`
    : `(${tasksEstimated}/${tasksLength})`;

  return (
    <GamePhaseWrapper>
      <GamePhaseContentWrapper>
        <Box mt={2} mb={2}>
          <Typography>
            Nu ska städuppgifterna betygsättas. 1 är lättast, 5 är jobbigast.
            Den som är snabbast får välja uppgifter först!
          </Typography>
          <EstimationBoard
            tasks={[] as Task[]}
            onEstimate={(taskId, estimate) =>
              dispatch(estimateTask(taskId, estimate))
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
          disabled={!canGoToNextStep}
          color="primary"
          variant="contained"
          aria-label="Next stage"
          // onClick={() => dispatch(goToNextStep())}
        >
          Fortsätt <br />
          {!canGoToNextStep && (
            <ButtonMessage>{disabledButtonMessage}</ButtonMessage>
          )}
        </Button>
      </BottomButtonBar>
    </GamePhaseWrapper>
  );
};

export default EstimatePhaseContainer;
