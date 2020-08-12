import React, { FC, useRef } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuProps,
  MenuItem,
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

const TopRightMenu = styled(Menu as FC<MenuProps>)`
  && .top-right-menu {
    min-width: 150px;
  }
`;

interface Props {
  gameName: string;
  menuIsOpen: boolean;
  onHideMenu: () => void;
  onLogout: () => void;
  onShowMenu: () => void;
}

const CompactAppBar: FC<Props> = ({
  gameName,
  menuIsOpen,
  onHideMenu,
  onLogout,
  onShowMenu,
}) => {
  let menuAnchorRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AppBar>
      <Toolbar>
        <Link href="/" color="inherit">
          <IconButton edge="start" color="inherit" aria-label="Home">
            <HomeIcon />
          </IconButton>
        </Link>
        <ToolbarText variant="h6">{gameName}</ToolbarText>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="Options"
          onClick={onShowMenu}
          ref={menuAnchorRef}
        >
          <DotsVerticalIcon />
        </IconButton>

        <TopRightMenu
          anchorEl={menuAnchorRef.current}
          open={menuIsOpen}
          onClose={onHideMenu}
          PopoverClasses={{ paper: 'top-right-menu' }}
        >
          <MenuItem onClick={onLogout}>Logga Ut</MenuItem>
        </TopRightMenu>
      </Toolbar>
    </AppBar>
  );
};

export default CompactAppBar;
