import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGame,
  fetchInvitationGame,
  selectUserAlreadyJoinedGame,
  selectIsLoading,
  showMenu,
  hideMenu,
  selectMenuIsOpen
} from './invitation-duck';
import { Redirect } from 'react-router-dom';
import InvitationAppBar from './InvitationAppBar';
import { logout } from 'routes/account/account-duck';
import PageWrapper from 'components/PageWrapper';
import PageContentWrapper from 'components/PageContentWrapper';
import { Box } from '@material-ui/core';

interface Props {
  gameId: string;
  invitationId: string;
}

const InvitationContainer: FC<Props> = ({ gameId, invitationId }) => {
  let dispatch = useDispatch();
  let game = useSelector(selectGame);
  let isLoading = useSelector(selectIsLoading);
  let userAlreadyJoinedGame = useSelector(selectUserAlreadyJoinedGame);
  let menuIsOpen = useSelector(selectMenuIsOpen);

  let onLogout = () => {
    dispatch(hideMenu());
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchInvitationGame(gameId, invitationId));
  }, [dispatch, gameId, invitationId]);

  if (isLoading) {
    return null;
  }

  if (userAlreadyJoinedGame) {
    return <Redirect to={`/games/${game!.id}`} />;
  }

  return (
    <InvitationAppBar
      gameId={gameId}
      onShowMenu={() => dispatch(showMenu())}
      onHideMenu={() => dispatch(hideMenu())}
      onLogout={onLogout}
      menuIsOpen={menuIsOpen}
    >
      <PageWrapper>
        <PageContentWrapper>
          <Box mt={2}>
            {!game && (
              <>Kunde inte hitta spelet. Kontrollera att länken fungerar</>
            )}

            {game && (
              <>
                Du har blivit inbjuden till spelet <strong>{game.name}</strong>
              </>
            )}
          </Box>
        </PageContentWrapper>
      </PageWrapper>
    </InvitationAppBar>
  );
};

export default InvitationContainer;
