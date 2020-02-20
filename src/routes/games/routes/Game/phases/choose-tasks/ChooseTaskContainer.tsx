import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import TasksViewModel from '../../view-models/tasks-view-model';
import { GamePlayerViewModel } from '../../view-models/game-player-view-model';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';
import TaskChooser from './TaskChooser';
import PlayerTasks from './PlayerTasks';
import { Box } from '@material-ui/core';
import calculatePlayerPoints from 'routes/games/utils/calculate-player-points';
import PlayerTasksTitle from '../../components/PlayerTasksTitle';

interface Props {
  availableTasks: TasksViewModel[];
  isCurrentPlayerTurn: boolean;
  playerTurn: GamePlayerViewModel;
  playerWithTasks: PlayerTasksViewModel[];
  onChooseTask: (taskId: string) => void;
  minEstimationPointsPerPlayer: number;
  maxEstimationPointsPerPlayer: number;
}

const ChooseTasksContainer: FC<Props> = ({
  availableTasks,
  isCurrentPlayerTurn,
  playerTurn,
  playerWithTasks,
  onChooseTask,
  minEstimationPointsPerPlayer,
  maxEstimationPointsPerPlayer
}) => (
  <>
    <Box m={2}>
      <Typography>
        Dags att välja uppgifter. Det bästa är om alla får mellan{' '}
        <strong>{minEstimationPointsPerPlayer}</strong> och{' '}
        <strong>{maxEstimationPointsPerPlayer}</strong> poäng.
      </Typography>
    </Box>
    {isCurrentPlayerTurn && (
      <Box m={2}>
        <TaskChooser
          availableTasks={availableTasks}
          onChooseTask={onChooseTask}
        />
      </Box>
    )}

    {!isCurrentPlayerTurn && playerTurn && (
      <Box m={2}>
        <Typography variant="h6" align="center">
          Nu väljer <strong>{playerTurn.user.displayName}</strong>
        </Typography>
      </Box>
    )}

    {playerWithTasks.map(
      player =>
        player.tasks.length > 0 && (
          <Box mb={2} key={player.id}>
            <PlayerTasksTitle
              title={player.user.displayName}
              playerPoints={calculatePlayerPoints(player.tasks)}
            />

            <Box m={2} mt={1}>
              <PlayerTasks tasks={player.tasks} />
            </Box>
          </Box>
        )
    )}
  </>
);

export default ChooseTasksContainer;
