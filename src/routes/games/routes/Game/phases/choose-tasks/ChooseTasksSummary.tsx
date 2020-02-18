import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import TasksViewModel from '../../view-models/tasks-view-model';
import EstimationSummary from '../../components/task-summary/EstimationSummary';
interface Props {
  tasks: TasksViewModel[];
  totalPlayers: number;
}
const ChooseTasksSummary: FC<Props> = ({ tasks, totalPlayers }) => (
  <>
    <Box p={2}>
      <Typography>
        Nu har alla valt sina uppgifter. Om ni inte är nöjda med uppdelningen
        kan ni nu byta med varandra.
        <br />
        Tips! Det är roligare att städa om det är rättvist!
      </Typography>
    </Box>
    <Box p={2}>
      <EstimationSummary tasks={tasks} totalPlayers={totalPlayers} />
    </Box>
  </>
);
export default ChooseTasksSummary;
