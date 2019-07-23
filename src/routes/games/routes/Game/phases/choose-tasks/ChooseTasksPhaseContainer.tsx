import React, { FC, useEffect } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import { Box, Typography, Button } from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameId } from '../../game-duck';
import {
  goToPreviousStep,
  goToNextStep,
  subscribeToChooseTasksPhase,
  unsubscribeFromChooseTasksPhase,
  selectPlayerTurn
} from './choose-tasks-duck';
import TaskCard from '../../components/TaskCard';
import { selectTasksViewModel } from '../choose-player-order/choose-player-order-duck';

const ChooseTasksPhaseContainer: FC = () => {
  let dispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  //   let players = useSelector(selectOrderedPlayersViewModel);
  let tasks = useSelector(selectTasksViewModel);
  let playerTurn = useSelector(selectPlayerTurn);

  useEffect(() => {
    dispatch(subscribeToChooseTasksPhase(gameId));
    return () => {
      dispatch(unsubscribeFromChooseTasksPhase(gameId));
    };
  }, [dispatch, gameId]);

  return (
    <>
      <GamePhaseWrapper>
        <GamePhaseContentWrapper>
          <Box p={2}>
            <Typography>Nu är det dags att välja uppgifter</Typography>
          </Box>
          <Box p={2}>{playerTurn && playerTurn.user.displayName}</Box>

          <Box p={2} pt={0}>
            Content
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                taskName={task.name}
                estimate={task.averageEstimate}
              />
            ))}
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

export default ChooseTasksPhaseContainer;
