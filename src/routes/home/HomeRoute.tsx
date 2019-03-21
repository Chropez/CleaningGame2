import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { logout } from 'routes/account/account-actions';
import { AppThunkDispatch } from 'store';
import { IApplicationState } from 'store/root-reducer';
import HomeAppBar from './components/HomeAppBar';
import ProfileContent from './components/ProfileContent';
import { hideMenu, showMenu } from './duck';

const mapState = (state: IApplicationState) => ({
  avatarUrl: state.firebase.auth.photoURL,
  menuIsOpen: state.home.menuIsOpen,
  name: state.firebase.auth.displayName,
});

const HomeRoute: FunctionComponent = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let { avatarUrl, menuIsOpen, name } = useMappedState(mapState);

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
