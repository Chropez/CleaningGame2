import React, { FC } from 'react';
import styled from 'styled-components/macro';
import {
  Paper as MuiPaper,
  PaperProps,
  Box,
  Typography,
  Chip,
} from '@material-ui/core';

const TitlePaper = styled(MuiPaper as FC<PaperProps>)`
  && {
    width: 100%;
    border-radius: 0;
  }
`;

interface Props {
  title: string;
  playerPoints: number;
}

const PlayerTasksTitle: FC<Props> = ({ title, playerPoints }) => (
  <TitlePaper>
    <Box
      p={2}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography variant="h6">{title}</Typography>
      <Box>
        <Chip color="primary" label={`Poäng: ${playerPoints}`} />
      </Box>
    </Box>
  </TitlePaper>
);

export default PlayerTasksTitle;
