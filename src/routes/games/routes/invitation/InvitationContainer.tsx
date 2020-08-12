import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGame,
  fetchInvitationGame,
  selectUserAlreadyJoinedGame,
  selectIsLoading,
  showMenu,
  hideMenu,
  selectMenuIsOpen,
  acceptInvitation,
} from './invitation-duck';
import { Redirect, useHistory } from 'react-router-dom';
import InvitationAppBar from './InvitationAppBar';
import { logout } from 'routes/account/account-duck';
import PageWrapper from 'components/PageWrapper';
import PageContentWrapper from 'components/PageContentWrapper';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  CardActions,
} from '@material-ui/core';

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
  const history = useHistory();

  let onLogout = () => {
    dispatch(hideMenu());
    dispatch(logout());
  };

  let onAcceptInvitationClick = () => {
    dispatch(acceptInvitation(history, gameId, invitationId));
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
        <PageContentWrapper maxWidth="md">
          <Box p={2}>
            {!game && (
              <Typography>
                Kunde inte hitta spelet. Kontrollera att länken fungerar
              </Typography>
            )}

            {game && (
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Inbjudan till städspel!
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Du har blivit inbjuden till spelet{' '}
                    <strong>{game.name}</strong>
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onAcceptInvitationClick}
                  >
                    Acceptera Inbjudan
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>
        </PageContentWrapper>
      </PageWrapper>
    </InvitationAppBar>
  );
};

export default InvitationContainer;
