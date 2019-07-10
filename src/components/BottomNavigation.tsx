import React, { ReactNode } from 'react';
import { FC } from 'react';
import styled from 'styled-components/macro';
import Box, { BoxProps } from '@material-ui/core/Box';

const StyledBottomNavigation = styled(Box as FC<BoxProps>)`
  && {
    background-color: ${({ theme }) => theme.palette.common.white};
    position: sticky;
    bottom: 0;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.shadows['4']};
    flex: 0;
  }
`;

interface Props {
  children?: ReactNode;
}
const BottomNavigation: FC<Props> = props => (
  <StyledBottomNavigation mt={4} {...props} />
);

export default BottomNavigation;
