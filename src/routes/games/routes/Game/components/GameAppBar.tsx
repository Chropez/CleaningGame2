import React, { FC } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';
import Link from 'components/Link';
import HomeIcon from 'mdi-material-ui/Home';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components/macro';
import { AppBarProps } from '@material-ui/core/AppBar';

const ToolbarText = styled(Typography as FC<TypographyProps>)`
  && {
    flex-grow: 1;
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`;

const AppBar = styled(MuiAppBar as FC<AppBarProps>)`
  && {
    top: 0;
    position: sticky;
  }
`;

interface Props {
  gameName: string;
}

const GameAppBar: FC<Props> = ({ gameName }) => (
  <AppBar>
    <Toolbar>
      <Link href="/" color="inherit">
        <IconButton edge="start" color="inherit" aria-label="Home">
          <HomeIcon />
        </IconButton>
      </Link>
      <ToolbarText variant="h6">{gameName}</ToolbarText>

      <IconButton edge="end" color="inherit" aria-label="Options">
        <DotsVerticalIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default GameAppBar;
