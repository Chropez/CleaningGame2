import React, { FC, SFC, useEffect } from 'react';
import { Fab as MuiFab, Container } from '@material-ui/core';
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
      <Container>
        <>
          {games &&
            games.map((game: Game) => (
              <div key={game.id}>
                {game.id}
                <br />
                {game.name} <br />
                {users[game.createdById] &&
                  (users[game.createdById] as User).displayName}
                <br />
                {new Date(game.createdAt).toString()}
                <hr />
              </div>
            ))}
        </>
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
