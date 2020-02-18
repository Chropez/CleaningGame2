import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import TasksViewModel from '../../view-models/tasks-view-model';
import { GamePlayerViewModel } from '../../view-models/game-player-view-model';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';
import TaskChooser from './TaskChooser';
import PlayerTasks from './PlayerTasks';
import { Box } from '@material-ui/core';

interface Props {
  availableTasks: TasksViewModel[];
  isCurrentPlayerTurn: boolean;
  playerTurn: GamePlayerViewModel;
  playerWithTasks: PlayerTasksViewModel[];
  onChooseTask: (taskId: string) => void;
}

const ChooseTasksContainer: FC<Props> = ({
  availableTasks,
  isCurrentPlayerTurn,
  playerTurn,
  playerWithTasks,
  onChooseTask
}) => (
  <>
    <Box p={2}>
      <Typography>Nu är det dags att välja uppgifter</Typography>
    </Box>
    {isCurrentPlayerTurn && (
      <Box p={2} pt={0}>
        <TaskChooser
          availableTasks={availableTasks}
          onChooseTask={onChooseTask}
        />
      </Box>
    )}

    {!isCurrentPlayerTurn && playerTurn && (
      <Box p={2} pt={0}>
        <Typography variant="h2">
          Nu väljer <strong>{playerTurn.user.displayName}</strong>
        </Typography>
      </Box>
    )}

    {playerWithTasks.map(
      player =>
        player.tasks.length > 0 && (
          <Box p={2} pt={0} key={player.id}>
            <PlayerTasks
              tasks={player.tasks}
              playerName={player.user.displayName}
            />
          </Box>
        )
    )}
  </>
);

export default ChooseTasksContainer;
