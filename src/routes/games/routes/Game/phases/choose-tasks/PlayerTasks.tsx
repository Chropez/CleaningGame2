import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import TaskCard from '../../components/TaskCard';
import TasksViewModel from '../../view-models/tasks-view-model';
import TaskCardsContainer from '../../components/TaskCardContainer';

interface Props {
  playerName: string;
  tasks: TasksViewModel[];
}

const PlayerTasks: FC<Props> = ({ playerName, tasks }) => (
  <>
    <Typography variant="h2">{playerName}</Typography>
    <TaskCardsContainer>
      {tasks.map(task => (
        <TaskCard
          estimate={task.averageEstimate}
          taskName={task.name}
          key={task.id}
        />
      ))}
    </TaskCardsContainer>
  </>
);

export default PlayerTasks;
