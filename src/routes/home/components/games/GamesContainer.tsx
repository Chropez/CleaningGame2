import React, { FC, useEffect } from 'react';
import {
  Fab as MuiFab,
  Container,
  Box,
  ListSubheader,
} from '@material-ui/core';
import AddIcon from 'mdi-material-ui/Plus';
import styled from 'styled-components/macro';
import { FabProps } from '@material-ui/core/Fab';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import {
  createGame,
  subscribeToGames,
  unsubscribeFromGames,
  selectGames,
  selectUsers,
} from './games-duck';
import Game from 'models/game';
import { useHistory } from 'react-router-dom';
import GameCard from './GameCard';
import User from 'models/user';
import { selectCurrentUserId } from 'application/selectors';

const AddFab = styled(MuiFab as FC<FabProps>)`
  && {
    position: fixed;
    right: 25px;
    bottom: 25px;
  }
`;

// Todo: Add feature
// const SearchFab = styled(MuiFab as FC<FabProps>)`
//   && {
//     position: fixed;
//     right: 32px;
//     bottom: 94px;
//   }
// `;

const GamesContainer: FC = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const history = useHistory();

  let games = useSelector(selectGames);
  let users = useSelector(selectUsers)!;
  let currentUserId = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(subscribeToGames());
    return () => dispatch(unsubscribeFromGames());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md">
        <Box p={2} pb={18}>
          <ListSubheader>Dina Städspel</ListSubheader>

          <>
            {games &&
              games.map((game: Game) => (
                <Box key={game.id} mb={2}>
                  <GameCard
                    gameName={game.name}
                    gameId={game.id!}
                    currentPlayerId={currentUserId}
                    participants={game.participants
                      .filter(participants => participants)
                      .map(participantId => users[participantId] as User)}
                  />
                </Box>
              ))}
          </>
        </Box>
      </Container>

      {/* Todo: Add Feature
      <SearchFab color="default" size="small" aria-label="Search">
        <MagnifyIcon />
      </SearchFab> */}
      <AddFab
        color="secondary"
        aria-label="Add"
        onClick={() => dispatch(createGame(history))}
      >
        <AddIcon />
      </AddFab>
    </>
  );
};

export default GamesContainer;
