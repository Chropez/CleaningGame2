import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar/Toolbar';
import Logo from 'components/Logo';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import AccountMultiple from 'mdi-material-ui/AccountMultiple';
import { FunctionComponent, FC, useRef } from 'react';
import * as React from 'react';
import styled from 'styled-components/macro';

const LargeAppBar = styled(AppBar as FC<AppBarProps>)`
  && {
    background-image: ${props => props.theme.secondaryBackground.bgImage};
  }
`;

const LargeToolbar = styled(Toolbar as FC<ToolbarProps>)`
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  top: 0;
`;

const LogoWrapper = styled.div`
  text-align: center;
`;

const AppBarLogo = styled(Logo)`
  && {
    font-size: 1.8rem;
  }
`;

const TopRightMenu = styled(Menu as FC<MenuProps>)`
  && .top-right-menu {
    min-width: 150px;
  }
`;

interface Props {
  menuIsOpen: boolean;
  onHideMenu: () => void;
  onLogout: () => void;
  onShowMenu: () => void;
}

const HomeAppBar: FunctionComponent<Props> = ({
  children,
  menuIsOpen,
  onHideMenu,
  onLogout,
  onShowMenu,
}) => {
  let menuAnchorRef = useRef<HTMLElement | null>(null);

  return (
    <LargeAppBar position="static">
      <LargeToolbar disableGutters={true}>
        <TopBar>
          <span ref={menuAnchorRef} />

          <IconButton color="inherit">
            <AccountMultiple />
          </IconButton>

          <IconButton color="inherit" onClick={onShowMenu}>
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
        </TopBar>

        <LogoWrapper>
          <AppBarLogo />
        </LogoWrapper>
      </LargeToolbar>
      {children}
    </LargeAppBar>
  );
};

export default HomeAppBar;
