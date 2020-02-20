import React, { FC, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TypographyProps,
  IconButton,
  Menu,
  MenuItem,
  Fade
} from '@material-ui/core';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';
import PlayerTasksTitle from '../../components/PlayerTasksTitle';
import calculatePlayerPoints from 'routes/games/utils/calculate-player-points';
import styled from 'styled-components/macro';
import TaskCardsContainer from '../../components/TaskCardContainer';
import TaskCard from '../../components/TaskCard';
import ShareIcon from 'mdi-material-ui/Share';

const Subtitle = styled(Typography as FC<TypographyProps>)`
  max-width: 400px;
`;

interface Props {
  hasUnfairPointDistribution: boolean;
  playersWithTasks: PlayerTasksViewModel[];
  onChangeTaskAssignee: (taskId: string, newAssigneeId: string) => void;
  minEstimationPointsPerPlayer: number;
  maxEstimationPointsPerPlayer: number;
}

const ChooseTasksSummary: FC<Props> = ({
  hasUnfairPointDistribution,
  playersWithTasks,
  onChangeTaskAssignee,
  minEstimationPointsPerPlayer,
  maxEstimationPointsPerPlayer
}) => {
  let [
    changeAssigneeMenuAnchor,
    setChangeAssigneeMenuAnchor
  ] = useState<Element | null>(null);
  let [changeAssigneeMenuIsOpen, setChangeAssigneeMenuIsOpen] = useState(false);
  let [currentTaskAssignee, setChangeCurrentTaskAssignee] = useState('');
  let [currentTaskId, setCurrentTaskId] = useState<string | undefined>();

  let moveTaskToList = useMemo(
    () => playersWithTasks.filter(player => player.id !== currentTaskAssignee),
    [currentTaskAssignee, playersWithTasks]
  );

  let openMoveTaskMenu = (
    anchor: Element,
    playerId: string,
    taskId: string
  ) => {
    setChangeAssigneeMenuAnchor(anchor);
    setChangeAssigneeMenuIsOpen(true);
    setChangeCurrentTaskAssignee(playerId);
    setCurrentTaskId(taskId);
  };

  let closeMoveTaskMenu = () => {
    setChangeAssigneeMenuIsOpen(false);
  };

  let changeTaskAssignee = (newAssigneeId: string) => {
    onChangeTaskAssignee(currentTaskId!, newAssigneeId);
    closeMoveTaskMenu();
  };

  return (
    <>
      <Box m={3}>
        <Box m={1}>
          <Typography variant="h6" align="center">
            Nu har alla uppgifter valts!
          </Typography>
        </Box>
        {hasUnfairPointDistribution && (
          <Box display="flex" justifyContent="center">
            <Subtitle variant="subtitle1">
              …men det verkar som att uppdelningen är lite orättvis! Flytta
              gärna några uppgifter nedan mellan varandra så att ni får mellan{' '}
              {minEstimationPointsPerPlayer} och {maxEstimationPointsPerPlayer}{' '}
              poäng.
              <br />
              Det blir roligare så&nbsp;:)
            </Subtitle>
          </Box>
        )}
        {!hasUnfairPointDistribution && (
          <Box display="flex" justifyContent="center">
            <Subtitle variant="subtitle1">
              Allt ser bra ut och ni kan nu börja städa!
            </Subtitle>
          </Box>
        )}
      </Box>
      <Box mt={3}>
        {playersWithTasks.map(
          player =>
            player.tasks.length > 0 && (
              <Box mb={2} key={player.id}>
                <PlayerTasksTitle
                  title={player.user.displayName}
                  playerPoints={calculatePlayerPoints(player.tasks)}
                />

                <Box m={2} mt={1}>
                  <TaskCardsContainer>
                    {player.tasks.map(task => (
                      <TaskCard
                        estimate={task.averageEstimate}
                        taskName={task.name}
                        key={task.id}
                        actionButton={
                          <IconButton
                            size="small"
                            aria-label="Move task"
                            onClick={event => {
                              openMoveTaskMenu(
                                event.currentTarget as Element,
                                player.id!,
                                task.id!
                              );
                            }}
                          >
                            <ShareIcon />
                          </IconButton>
                        }
                      />
                    ))}
                  </TaskCardsContainer>
                </Box>
              </Box>
            )
        )}
      </Box>

      <Menu
        id="fade-menu"
        anchorEl={changeAssigneeMenuAnchor}
        open={changeAssigneeMenuIsOpen}
        onClose={closeMoveTaskMenu}
        TransitionComponent={Fade}
      >
        <Box pr={2} pl={2}>
          <Typography variant="overline">Skicka till</Typography>
        </Box>

        {moveTaskToList.map(otherPlayers => (
          <MenuItem
            key={otherPlayers.id}
            onClick={() => {
              changeTaskAssignee(otherPlayers.id!);
            }}
          >
            {otherPlayers.user.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default ChooseTasksSummary;
