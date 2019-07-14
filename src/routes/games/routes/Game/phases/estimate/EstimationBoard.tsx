import React, { FC } from 'react';
import { Paper, Box } from '@material-ui/core';
import TaskEstimate from './TaskEstimate';
import TaskWithEstimationViewModel from './task-with-estimation-view-model';

interface Props {
  onEstimate: (taskId: string, estimate: number, estimationId?: string) => void;
  tasksWithEstimation: TaskWithEstimationViewModel[];
}
const EstimationBoard: FC<Props> = ({ onEstimate, tasksWithEstimation }) => (
  <Paper>
    <Box mt={2}>
      {tasksWithEstimation.map(taskWithEstimation => (
        <Box p={2} key={taskWithEstimation.task.id}>
          <TaskEstimate
            estimate={
              taskWithEstimation.estimation !== undefined
                ? taskWithEstimation.estimation.estimate
                : undefined
            }
            onEstimate={estimate =>
              onEstimate(
                taskWithEstimation.task.id!,
                estimate,
                taskWithEstimation.estimation
                  ? taskWithEstimation.estimation.id
                  : undefined
              )
            }
            taskName={taskWithEstimation.task.name}
          />
        </Box>
      ))}
    </Box>
  </Paper>
);

export default EstimationBoard;
