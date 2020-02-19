import React, { FC } from 'react';
import { Paper as MuiPaper, Box } from '@material-ui/core';
import InfoGroup from './InfoGroup';
import styled from 'styled-components/macro';
import { PaperProps } from '@material-ui/core/Paper';

const Paper = styled(MuiPaper as FC<PaperProps>)`
  width: 100%;
`;

interface Props {
  totalTasks: number;
  totalEstimationPoints: number;
  minEstimationPointsPerPlayer: number;
  maxEstimationPointsPerPlayer: number;
}

const EstimationSummary: FC<Props> = ({
  totalTasks,
  totalEstimationPoints,
  minEstimationPointsPerPlayer,
  maxEstimationPointsPerPlayer
}) => (
  <Paper>
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <InfoGroup
        primaryText={totalTasks.toString()}
        secondaryText="Städuppgifter"
      />
      <InfoGroup
        primaryText={totalEstimationPoints.toString()}
        secondaryText="Totalpoäng"
      />
      <InfoGroup
        primaryText={minEstimationPointsPerPlayer.toString()}
        secondaryText="Minst per spelare"
      />
      <InfoGroup
        primaryText={maxEstimationPointsPerPlayer.toString()}
        secondaryText="Högst per spelare"
      />
    </Box>
  </Paper>
);
export default EstimationSummary;
