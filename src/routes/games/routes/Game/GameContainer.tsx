import React, { FC, useEffect } from 'react';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToGame, unsubscribeToGame, selectGame } from './game-duck';
import GameAppBar from './components/GameAppBar';
import { GamePhase } from 'models/game';
import SetupPhaseContainer from './phases/setup/SetupPhaseContainer';
import EstimatePhaseContainer from './phases/estimate/EstimatePhaseContainer';

interface Props {
  gameId: string;
}
const GameContainer: FC<Props> = ({ gameId }) => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);

  useEffect(() => {
    dispatch(subscribeToGame(gameId));
    return () => dispatch(unsubscribeToGame(gameId));
  }, [dispatch, gameId]);

  if (game === undefined) {
    return null;
  }

  return (
    <>
      <GameAppBar gameName={game.name} />

      {game.phase === GamePhase.Setup && <SetupPhaseContainer />}
      {game.phase === GamePhase.Estimate && <EstimatePhaseContainer />}
    </>
  );
};

export default GameContainer;
