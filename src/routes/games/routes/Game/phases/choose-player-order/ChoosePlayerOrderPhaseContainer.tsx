import React, { FC, useEffect } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import { Box, Typography, Button } from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToPreviousStep,
  goToNextStep,
  subscribeToChoosePlayerOrderPhase,
  unsubscribeFromChoosePlayerOrderPhase,
  changePlayerPickingOrder,
  selectTasksViewModel
} from './choose-player-order-duck';
import ChooseOrderContainer from './ChooseOrderContainer';
import { selectGameId, selectOrderedPlayersViewModel } from '../../game-duck';
import TaskSummaryContainer from './TaskSummaryContainer';

const ChoosePlayerOrderPhaseContainer: FC = () => {
  let dispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  let players = useSelector(selectOrderedPlayersViewModel);
  let tasks = useSelector(selectTasksViewModel);

  useEffect(() => {
    dispatch(subscribeToChoosePlayerOrderPhase(gameId));

    return () => {
      dispatch(unsubscribeFromChoosePlayerOrderPhase(gameId));
    };
  }, [dispatch, gameId]);

  return (
    <>
      <GamePhaseWrapper>
        <GamePhaseContentWrapper>
          <Box p={2}>
            <Typography>
              Innan ni börjar välja städuppgifter måste ni bestämma vem som
              börjar. Klunsa om det om ni inte gillar ordningen!
              {/* <Small>
                Den som betygsatte snabbast är nu först men om ni tycker att det
                är orättvist kan ni klunsa om det och ändra ordningen!
              </Small> */}
            </Typography>
          </Box>

          <Box p={2} pt={0}>
            <ChooseOrderContainer
              players={players}
              onChangeOrder={(playerId, newOrder) =>
                dispatch(changePlayerPickingOrder(playerId, newOrder))
              }
            />
          </Box>

          <Box p={2} pt={0}>
            <TaskSummaryContainer tasks={tasks} totalPlayers={players.length} />
          </Box>
        </GamePhaseContentWrapper>

        <BottomButtonBar>
          <Button
            color="default"
            variant="outlined"
            aria-label="Previous stage"
            onClick={() => dispatch(goToPreviousStep())}
          >
            Tillbaka
          </Button>
          <Button
            color="primary"
            variant="contained"
            aria-label="Next stage"
            onClick={() => dispatch(goToNextStep())}
          >
            Fortsätt
          </Button>
        </BottomButtonBar>
      </GamePhaseWrapper>
    </>
  );
};

export default ChoosePlayerOrderPhaseContainer;
