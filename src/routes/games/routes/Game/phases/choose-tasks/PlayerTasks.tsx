import React, { FC } from 'react';
import TaskCard from '../../components/TaskCard';
import TasksViewModel from '../../view-models/tasks-view-model';
import TaskCardsContainer from '../../components/TaskCardContainer';

interface Props {
  tasks: TasksViewModel[];
}

const PlayerTasks: FC<Props> = ({ tasks }) => (
  <>
    <TaskCardsContainer>
      {tasks.map(task => (
        <TaskCard
          estimate={task.averageEstimate}
          taskName={task.name}
          key={task.id}
          hideShadow={true}
        />
      ))}
    </TaskCardsContainer>
  </>
);

export default PlayerTasks;
