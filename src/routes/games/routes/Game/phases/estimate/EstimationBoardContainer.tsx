import React, { FC } from 'react';
import PageWrapper from 'components/PageWrapper';
import PageContentWrapper from 'components/PageContentWrapper';
import { Box, Typography, Button } from '@material-ui/core';
import EstimationBoard from './EstimationBoard';
import BottomButtonBar from 'components/BottomButtonBar';
import { Small } from 'components/typography';
import TaskWithEstimationViewModel from './task-with-estimation-view-model';

interface Props {
  canContinue: boolean;
  cantContinueButtonMessage: string;
  onBackClick: () => void;
  onEstimate: (taskId: string, estimate: number, estimationId?: string) => void;
  onContinueClick: () => void;
  tasksWithEstimation: TaskWithEstimationViewModel[];
}

const EstimationBoardContainer: FC<Props> = ({
  canContinue,
  cantContinueButtonMessage,
  onBackClick,
  onContinueClick,
  onEstimate,
  tasksWithEstimation,
}) => (
  <PageWrapper>
    <PageContentWrapper>
      <Box p={2}>
        <Typography>
          Nu ska städuppgifterna betygsättas. 1 är lättast, 5 är jobbigast. Den
          som är snabbast får välja uppgifter först!
        </Typography>
        <EstimationBoard
          tasksWithEstimation={tasksWithEstimation}
          onEstimate={onEstimate}
        />
      </Box>
    </PageContentWrapper>

    <BottomButtonBar>
      <Button color="default" aria-label="Previous stage" onClick={onBackClick}>
        Tillbaka
      </Button>
      <Button
        disabled={!canContinue}
        color="primary"
        variant="contained"
        aria-label="Next stage"
        onClick={onContinueClick}
      >
        Fortsätt
        <br />
        {!canContinue && <Small>{cantContinueButtonMessage}</Small>}
      </Button>
    </BottomButtonBar>
  </PageWrapper>
);

export default EstimationBoardContainer;
