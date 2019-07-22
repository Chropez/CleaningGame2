import React, { FC, useEffect } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import { Box, Typography, Button } from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameId } from '../../game-duck';
import { goToPreviousStep, goToNextStep } from './choose-tasks-duck';

const ChooseTasksPhaseContainer: FC = () => {
  let dispatch = useDispatch();
  let gameId = useSelector(selectGameId);
  //   let players = useSelector(selectOrderedPlayersViewModel);
  //   let tasks = useSelector(selectTasksViewModel);

  useEffect(() => {
    // dispatch(subscribeToChoosePlayerOrderPhase(gameId));
    // return () => {
    //   dispatch(unsubscribeFromChoosePlayerOrderPhase(gameId));
    // };
  }, [dispatch, gameId]);

  return (
    <>
      <GamePhaseWrapper>
        <GamePhaseContentWrapper>
          <Box p={2}>
            <Typography>Nu ska ni</Typography>
          </Box>

          <Box p={2} pt={0}>
            Content
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
