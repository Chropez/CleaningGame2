import React, { FC } from 'react';
import { Box, Typography, TypographyProps } from '@material-ui/core';
import PlayerTasksViewModel from '../../view-models/player-tasks-view-model';
import PlayerTasksTitle from '../../components/PlayerTasksTitle';
import PlayerTasks from './PlayerTasks';
import calculatePlayerPoints from 'routes/games/utils/calculate-player-points';
import styled from 'styled-components/macro';

const Subtitle = styled(Typography as FC<TypographyProps>)`
  max-width: 400px;
`;
interface Props {
  hasUnfairPointDistribution: boolean;
  playerWithTasks: PlayerTasksViewModel[];
}
const ChooseTasksSummary: FC<Props> = ({
  hasUnfairPointDistribution,
  playerWithTasks
}) => (
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
            …men det verkar som att uppdelningen är lite orättvis! Flytta gärna
            några uppgifter nedan mellan varandra för att göra det mer
            rättvist&nbsp;:)
          </Subtitle>
        </Box>
      )}
      {!hasUnfairPointDistribution && (
        <Typography>Ready to clean! Go to next step!</Typography>
      )}
    </Box>
    <Box mt={3}>
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
    </Box>
  </>
);
export default ChooseTasksSummary;
