import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar/Toolbar';
import Logo from 'components/Logo';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import { FunctionComponent, SFC, useRef } from 'react';
import * as React from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import styled from 'themes/styled';
import { hideMenu, showMenu } from '../duck';

const LargeAppBar = styled(AppBar as SFC<AppBarProps>)`
  background-image: ${props => props.theme.secondaryBackground.bgImage};
`;

const LargeToolbar = styled(Toolbar as SFC<ToolbarProps>)`
  flex-direction: column;
  height: 300px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
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

const mapState = (state: IApplicationState) => ({
  menuIsOpen: state.home.menuIsOpen,
});

const HomeAppBar: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let { menuIsOpen } = useMappedState(mapState);
  let menuAnchorRef = useRef<HTMLElement | null>(null);

  return (
    <LargeAppBar position="sticky">
      <LargeToolbar disableGutters={true}>
        <TopBar>
          <span ref={menuAnchorRef} />
          <IconButton color="inherit" onClick={() => dispatch(showMenu())}>
            <DotsVerticalIcon />
          </IconButton>

          <TopRightMenu
            anchorEl={menuAnchorRef.current}
            open={menuIsOpen}
            onClose={() => dispatch(hideMenu())}
            PopoverClasses={{ paper: 'top-right-menu' }}
          >
            <MenuItem onClick={() => dispatch(logout())}>Logga Ut</MenuItem>
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
