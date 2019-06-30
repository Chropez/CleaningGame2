import React, { FC, SFC, useEffect } from 'react';
import { Fab as MuiFab, Container, Box } from '@material-ui/core';
import AddIcon from 'mdi-material-ui/Plus';
import MagnifyIcon from 'mdi-material-ui/Magnify';
import styled from 'themes/styled';
import { FabProps } from '@material-ui/core/Fab';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import { createGame, subscribeToGames, unsubscribeToGames } from './games-duck';
import { ApplicationState } from 'store/root-reducer';
import Game from 'models/game';
import User from 'models/user';
import { H1 } from 'components/typography';
import Link from 'components/Link';
import { LinkProps } from '@material-ui/core/Link';

const AddFab = styled(MuiFab as SFC<FabProps>)`
  && {
    position: fixed;
    right: 25px;
    bottom: 25px;
  }
`;

const SearchFab = styled(MuiFab as SFC<FabProps>)`
  && {
    position: fixed;
    right: 32px;
    bottom: 94px;
  }
`;

const StyledLink = styled(Link as SFC<LinkProps>)`
  &&:hover {
    text-decoration: none;
  }
`;

const GamesContainer: FC = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  let games: Game[] = useSelector(
    (state: ApplicationState) => state.firestore.ordered.games
  );
  let users = useSelector(
    (state: ApplicationState) =>
      state.firestore.data && state.firestore.data.users
  );

  useEffect(() => {
    dispatch(subscribeToGames());
    return () => dispatch(unsubscribeToGames());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md">
        <Box p={2}>
          <H1>Städspel</H1>

          <>
            {games &&
              games.map((game: Game) => (
                <StyledLink
                  key={game.id}
                  color="inherit"
                  href={`/games/${game.id}`}
                >
                  {game.id}
                  <br />
                  {game.name} <br />
                  {users[game.createdById] &&
                    (users[game.createdById] as User).displayName}
                  <br />
                  {new Date(game.createdAt).toString()}
                  <hr />
                </StyledLink>
              ))}
          </>
        </Box>
      </Container>
      <SearchFab color="default" size="small" aria-label="Search">
        <MagnifyIcon />
      </SearchFab>
      <AddFab
        color="secondary"
        aria-label="Add"
        onClick={() => dispatch(createGame())}
      >
        <AddIcon />
      </AddFab>
    </>
  );
};

export default GamesContainer;
