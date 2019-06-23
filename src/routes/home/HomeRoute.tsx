import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { ApplicationState } from 'store/root-reducer';
import HomeAppBar from './components/HomeAppBar';
import ProfileContent from './components/ProfileContent';
import { hideMenu, showMenu } from './home-duck';
import GamesContainer from './components/games/GamesContainer';

const HomeRoute: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let avatarUrl = useSelector(
    (state: ApplicationState) => state.firebase.auth.photoURL
  );
  let menuIsOpen = useSelector(
    (state: ApplicationState) => state.home.menuIsOpen
  );
  let name = useSelector(
    (state: ApplicationState) => state.firebase.auth.displayName
  );

  return (
    <>
      <HomeAppBar
        menuIsOpen={menuIsOpen}
        onHideMenu={() => dispatch(hideMenu())}
        onLogout={() => dispatch(logout())}
        onShowMenu={() => dispatch(showMenu())}
      />

      <ProfileContent avatarUrl={avatarUrl} name={name} />

      <GamesContainer />
    </>
  );
};

export default HomeRoute;
