import React, { FC } from 'react';
import EstimationSummary from '../../components/task-summary/EstimationSummary';
import TaskCard from '../../components/TaskCard';
import TasksViewModel from '../../view-models/tasks-view-model';
import { Box, Typography } from '@material-ui/core';
import TaskCardsContainer from '../../components/TaskCardContainer';

interface Props {
  tasks: TasksViewModel[];
  totalPlayers: number;
}

const TaskSummaryContainer: FC<Props> = ({ tasks, totalPlayers }) => (
  <>
    <Typography variant="h2">Resultat</Typography>

    <Box mb={2}>
      <EstimationSummary tasks={tasks} totalPlayers={totalPlayers} />
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

export default TaskSummaryContainer;
