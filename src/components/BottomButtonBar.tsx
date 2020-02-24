import React from 'react';
import { FC } from 'react';
import styled from 'styled-components/macro';
import Box, { BoxProps } from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { ContainerProps } from '@material-ui/core/Container';

const BottomBarContainer = styled(Container as FC<ContainerProps>)`
  && {
    position: sticky;
    bottom: 0;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.shadows['4']};
    flex: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;

const StyledBottomButtonBar = styled(Box as FC<BoxProps>)`
  && {
    background-color: ${({ theme }) => theme.palette.background.paper};
    display: flex;
    flex-direction: row;
    & button {
      flex: 1;

      &:not(:first-child) {
        margin-left: ${({ theme }) => theme.spacing(0.5)}px;
      }

      &:not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(0.5)}px;
      }
    }
  }
`;

const BottomButtonBar: FC<BoxProps> = props => (
  <BottomBarContainer maxWidth="md">
    <StyledBottomButtonBar p={1} {...props} />
  </BottomBarContainer>
);

export default BottomButtonBar;
