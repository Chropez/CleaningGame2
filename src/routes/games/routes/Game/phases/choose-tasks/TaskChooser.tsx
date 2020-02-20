import React, { FC } from 'react';
import { Typography, Box } from '@material-ui/core';
import TaskCard from '../../components/TaskCard';
import TasksViewModel from '../../view-models/tasks-view-model';
import TaskCardsContainer from '../../components/TaskCardContainer';

interface Props {
  availableTasks: TasksViewModel[];
  onChooseTask: (taskId: string) => void;
}

const TaskChooser: FC<Props> = ({ availableTasks, onChooseTask }) => (
  <>
    <Box mb={2}>
      <Typography variant="h6" align="center">
        Din tur!
      </Typography>
    </Box>
    <TaskCardsContainer>
      {availableTasks.map(task => (
        <TaskCard
          estimate={task.averageEstimate}
          taskName={task.name}
          key={task.id}
          onClickCard={() => onChooseTask(task.id!)}
        />
      ))}
    </TaskCardsContainer>
  </>
);

export default TaskChooser;
