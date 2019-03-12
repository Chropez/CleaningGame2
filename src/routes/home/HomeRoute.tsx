import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { AppBarProps } from '@material-ui/core/AppBar';
import { ToolbarProps } from '@material-ui/core/Toolbar';
import Logo from 'components/Logo';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import * as React from 'react';
import { FunctionComponent, SFC, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import styled from 'styled-components';
import appStyled from 'themes/styled';
import { hideMenu, showMenu } from './duck';

const LargeAppBar = appStyled(AppBar as SFC<AppBarProps>)`
  /* height: 300px; */
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

const mapState = (state: IApplicationState) => ({
  menuIsOpen: state.home.menuIsOpen,
});

const HomeRoute: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let { menuIsOpen } = useMappedState(mapState);
  let [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  function handleIconButtonClick(
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
  ) {
    setMenuAnchor(evt.currentTarget);
    dispatch(showMenu());
  }

  function handleMenuClose() {
    setMenuAnchor(null);
    dispatch(hideMenu());
  }
  return (
    <>
      <LargeAppBar position="sticky">
        <LargeToolbar disableGutters={true}>
          <TopBar>
            <IconButton color="inherit" onClick={handleIconButtonClick}>
              <DotsVerticalIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={menuAnchor}
              open={menuIsOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => dispatch(logout())}>Logga Ut</MenuItem>
            </Menu>
          </TopBar>
          <LogoWrapper>
            <AppBarLogo />
          </LogoWrapper>
        </LargeToolbar>
      </LargeAppBar>
      <div>
        <div style={{ height: '3000px' }}>testasdasd</div>
      </div>
    </>
  );
};

export default HomeRoute;
