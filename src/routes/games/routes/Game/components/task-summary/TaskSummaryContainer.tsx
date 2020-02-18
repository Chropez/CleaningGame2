import React, { FC } from 'react';
import EstimationSummary from './EstimationSummary';
import TaskCard from '../TaskCard';
import TasksViewModel from '../../view-models/tasks-view-model';
import { Box, Typography } from '@material-ui/core';
import TaskCardsContainer from '../TaskCardContainer';

interface Props {
  tasks: TasksViewModel[];
  totalPlayers: number;
}

const TASK_DISTRIBUTION_MIN_THRESHOLD = 0.85;
const TASK_DISTRIBUTION_MAX_THRESHOLD = 1.15;

function roundHalf(num: number) {
  return Math.round(num * 2) / 2;
}

const TaskSummaryContainer: FC<Props> = ({ tasks, totalPlayers }) => {
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
    <>
      <Typography variant="h2">Resultat</Typography>

      <Box mb={2}>
        <EstimationSummary
          totalTasks={totalTasks.toString()}
          totalEstimationPoints={totalEstimationPoints.toString()}
          minEstimationPoints={minEstimationPoints.toString()}
          maxEstimationPoints={maxEstimationPoints.toString()}
        />
      </Box>

      <TaskCardsContainer>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            taskName={task.name}
            estimate={task.averageEstimate}
          />
        ))}
      </TaskCardsContainer>
    </>
  );
};

export default TaskSummaryContainer;
