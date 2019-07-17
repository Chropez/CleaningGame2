import React, { FC, useEffect } from 'react';
import {
  Fab as MuiFab,
  Container,
  Box,
  ListSubheader
} from '@material-ui/core';
import AddIcon from 'mdi-material-ui/Plus';
import MagnifyIcon from 'mdi-material-ui/Magnify';
import styled from 'styled-components/macro';
import { FabProps } from '@material-ui/core/Fab';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import {
  createGame,
  subscribeToGames,
  unsubscribeFromGames,
  selectGames,
  selectUsers
} from './games-duck';
import Game from 'models/game';
import User from 'models/user';
import Link from 'components/Link';
import { LinkProps } from '@material-ui/core/Link';

const AddFab = styled(MuiFab as FC<FabProps>)`
  && {
    position: fixed;
    right: 25px;
    bottom: 25px;
  }
`;

const SearchFab = styled(MuiFab as FC<FabProps>)`
  && {
    position: fixed;
    right: 32px;
    bottom: 94px;
  }
`;

const StyledLink = styled(Link as FC<LinkProps>)`
  &&:hover {
    text-decoration: none;
  }
`;

const GamesContainer: FC = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  let games = useSelector(selectGames);
  let users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(subscribeToGames());
    return () => dispatch(unsubscribeFromGames());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md">
        <Box p={2}>
          <ListSubheader>Spelare</ListSubheader>

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
