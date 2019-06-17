import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import HomeAppBar from './components/HomeAppBar';
import ProfileContent from './components/ProfileContent';
import { hideMenu, showMenu } from './duck';

const HomeRoute: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let avatarUrl = useSelector(
    (state: IApplicationState) => state.firebase.auth.photoURL,
  );
  let menuIsOpen = useSelector(
    (state: IApplicationState) => state.home.menuIsOpen,
  );
  let name = useSelector(
    (state: IApplicationState) => state.firebase.auth.displayName,
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

      <div>
        <div style={{ height: '3000px' }}>CONTENT</div>
      </div>
    </>
  );
};

export default HomeRoute;
