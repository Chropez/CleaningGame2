import React, { FC } from 'react';
import { Paper as MuiPaper, Box } from '@material-ui/core';
import InfoGroup from './InfoGroup';
import styled from 'styled-components/macro';
import { PaperProps } from '@material-ui/core/Paper';
import TasksViewModel from '../../view-models/tasks-view-model';

const Paper = styled(MuiPaper as FC<PaperProps>)`
  width: 100%;
`;

interface Props {
  tasks: TasksViewModel[];
  totalPlayers: number;
}

const TASK_DISTRIBUTION_MIN_THRESHOLD = 0.85;
const TASK_DISTRIBUTION_MAX_THRESHOLD = 1.15;

function roundHalf(num: number) {
  return Math.round(num * 2) / 2;
}
const EstimationSummary: FC<Props> = ({ tasks, totalPlayers }) => {
  let totalTasks = tasks.length.toString();
  let totalEstimationPoints = tasks.reduce(
    (total, task) => task.averageEstimate + total,
    0
  );

  let percentagePerPlayer = 1 / totalPlayers;

  let minEstimationPoints = roundHalf(
    totalEstimationPoints *
      percentagePerPlayer *
      TASK_DISTRIBUTION_MIN_THRESHOLD
  );

  let maxEstimationPoints = roundHalf(
    totalEstimationPoints *
      percentagePerPlayer *
      TASK_DISTRIBUTION_MAX_THRESHOLD
  );
  return (
    <Paper>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <InfoGroup primaryText={totalTasks} secondaryText="Städuppgifter" />
        <InfoGroup
          primaryText={totalEstimationPoints.toString()}
          secondaryText="Totalpoäng"
        />
        <InfoGroup
          primaryText={minEstimationPoints.toString()}
          secondaryText="Minst per spelare"
        />
        <InfoGroup
          primaryText={maxEstimationPoints.toString()}
          secondaryText="Högst per spelare"
        />
      </Box>
    </Paper>
  );
};

export default EstimationSummary;
