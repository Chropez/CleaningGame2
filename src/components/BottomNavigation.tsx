import React from 'react';
import { FC } from 'react';
import styled from 'styled-components/macro';

const StyledBottomNavigation = styled.div`
  min-height: 200px;
  background-color: ${({ theme }) => theme.mixins.toolbar.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadows[2]};
`;

const BottomNavigation: FC = () => <StyledBottomNavigation />;

export default BottomNavigation;
