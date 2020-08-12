import React, { FC } from 'react';
import GameAppBar from 'components/CompactAppBar';

interface Props {
  gameId: string;
  children: JSX.Element | JSX.Element[];
  menuIsOpen: boolean;
  onHideMenu: () => void;
  onLogout: () => void;
  onShowMenu: () => void;
}

const InvitationAppBar: FC<Props> = ({
  children,
  gameId,
  menuIsOpen,
  onHideMenu,
  onLogout,
  onShowMenu,
}) => (
  <>
    <GameAppBar
      gameName={gameId}
      menuIsOpen={menuIsOpen}
      onHideMenu={onHideMenu}
      onLogout={onLogout}
      onShowMenu={onShowMenu}
    />
    {children}
  </>
);

export default InvitationAppBar;
