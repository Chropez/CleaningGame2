import React, { FC } from 'react';

import styled from 'styled-components/macro';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';

const estimates: number[] = [1, 2, 3, 4, 5];

const EstimationPointContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const StyledEstimationButton = styled(Button as FC<ButtonProps>)`
  && {
    min-width: initial;
  }
`;

interface EstimationButtonProps {
  isSelected: boolean;
  point: number;
  onClick: () => void;
}

const EstimationButton: FC<EstimationButtonProps> = ({
  isSelected,
  onClick,
  point
}) => (
  <StyledEstimationButton
    variant={isSelected ? 'contained' : 'outlined'}
    onClick={onClick}
    color={isSelected ? 'primary' : 'default'}
  >
    {point}
  </StyledEstimationButton>
);

interface TaskEstimateProps {
  taskName: string;
  onEstimate: (estimate: number) => void;
}

const TaskEstimate: FC<TaskEstimateProps> = ({ taskName, onEstimate }) => (
  <>
    <Box mb={2}>
      <Typography>{taskName}</Typography>
    </Box>

    <EstimationPointContainer>
      {estimates.map((estimate, index) => (
        <EstimationButton
          key={`estimation-point-${index}-${estimate}`}
          isSelected={estimate === 3}
          point={estimate}
          onClick={() => onEstimate(estimate)}
        />
      ))}
    </EstimationPointContainer>
  </>
);

export default TaskEstimate;
