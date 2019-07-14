import React, { FC } from 'react';
import { Paper, Box } from '@material-ui/core';
import TaskEstimate from './TaskEstimate';
import Task from 'models/task';

interface Props {
  onEstimate: (taskId: string, estimate: number) => void;
  tasks: Task[];
}
const EstimationBoard: FC<Props> = ({ onEstimate, tasks }) => (
  <Paper>
    <Box mt={2}>
      {tasks.map(task => (
        <Box p={2} key={task.id}>
          <TaskEstimate
            taskName={task.name}
            onEstimate={estimate => onEstimate(task.id!, estimate)}
          />
        </Box>
      ))}
    </Box>
  </Paper>
);

export default EstimationBoard;
