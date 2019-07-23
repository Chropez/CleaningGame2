import React, { FC } from 'react';
import { Paper as MuiPaper, Box } from '@material-ui/core';
import InfoGroup from './InfoGroup';
import styled from 'styled-components/macro';
import { PaperProps } from '@material-ui/core/Paper';

const Paper = styled(MuiPaper as FC<PaperProps>)`
  width: 100%;
`;

interface Props {
  totalTasks: string;
  totalEstimationPoints: string;
  minEstimationPoints: string;
  maxEstimationPoints: string;
}

const EstimationSummary: FC<Props> = ({
  totalTasks,
  totalEstimationPoints,
  minEstimationPoints,
  maxEstimationPoints
}) => (
  <Paper>
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <InfoGroup primaryText={totalTasks} secondaryText="Städuppgifter" />
      <InfoGroup
        primaryText={totalEstimationPoints}
        secondaryText="Totalpoäng"
      />
      <InfoGroup
        primaryText={minEstimationPoints}
        secondaryText="Minst per spelare"
      />
      <InfoGroup
        primaryText={maxEstimationPoints}
        secondaryText="Högst per spelare"
      />
    </Box>
  </Paper>
);

export default EstimationSummary;
