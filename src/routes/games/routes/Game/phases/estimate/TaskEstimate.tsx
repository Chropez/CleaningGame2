import React, { FC } from 'react';

import styled from 'styled-components/macro';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';

const estimateOptions: number[] = [1, 2, 3, 4, 5];

const EstimationPointContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const StyledEstimationButton = styled(Button as FC<ButtonProps>)`
  && {
    min-width: initial;

    .MuiButton-containedPrimary {
      border: 1px solid transparent;
    }
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
  estimate?: number;
  onEstimate: (estimate: number) => void;
  taskName: string;
}

const TaskEstimate: FC<TaskEstimateProps> = ({
  estimate,
  onEstimate,
  taskName
}) => (
  <>
    <Box mb={2}>
      <Typography>{taskName}</Typography>
    </Box>

    <EstimationPointContainer>
      {estimateOptions.map((estimateOption, index) => (
        <EstimationButton
          key={`estimation-point-${index}-${estimate}`}
          isSelected={estimateOption === estimate}
          point={estimateOption}
          onClick={() => onEstimate(estimateOption)}
        />
      ))}
    </EstimationPointContainer>
  </>
);

export default TaskEstimate;
