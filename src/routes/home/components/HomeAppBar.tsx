import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar/Toolbar';
import Logo from 'components/Logo';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import { FunctionComponent, SFC, useRef } from 'react';
import * as React from 'react';
import styled from 'themes/styled';

const LargeAppBar = styled(AppBar as SFC<AppBarProps>)`
  && {
    background-image: ${props => props.theme.secondaryBackground.bgImage};
  }
`;

const LargeToolbar = styled(Toolbar as SFC<ToolbarProps>)`
  flex-direction: column;
  height: 150px;
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
    font-size: 2.5rem;
  }
`;

const TopRightMenu = styled(Menu as SFC<MenuProps>)`
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
  menuIsOpen,
  onHideMenu,
  onLogout,
  onShowMenu
}) => {
  let menuAnchorRef = useRef<HTMLElement | null>(null);

  return (
    <LargeAppBar position="static">
      <LargeToolbar disableGutters={true}>
        <TopBar>
          <span ref={menuAnchorRef} />
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
    </LargeAppBar>
  );
};

export default HomeAppBar;
