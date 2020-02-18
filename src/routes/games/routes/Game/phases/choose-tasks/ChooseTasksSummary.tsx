import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

const ChooseTasksSummary: FC = () => (
  <>
    <Box p={2}>
      <Typography>
        Nu har alla valt sina uppgifter. Om ni inte är nöjda med uppdelningen
        kan ni nu byta med varandra.
        <br />
        Tips! Det är roligare att städa om det är rättvist!
      </Typography>
    </Box>
  </>
);
export default ChooseTasksSummary;
