import React, { FC, useEffect } from 'react';
import { AppThunkDispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToGame,
  unsubscribeFromGame,
  selectGame,
  selectMenuIsOpen,
  hideMenu,
  showMenu,
} from './game-duck';
import GameAppBar from 'components/CompactAppBar';
import { GamePhase } from 'models/game';
import SetupPhaseContainer from './phases/setup/SetupPhaseContainer';
import EstimatePhaseContainer from './phases/estimate/EstimatePhaseContainer';
import ChoosePlayerOrderPhaseContainer from './phases/choose-player-order/ChoosePlayerOrderPhaseContainer';
import ChooseTasksPhaseContainer from './phases/choose-tasks/ChooseTasksPhaseContainer';
import { logout } from 'routes/account/account-duck';

interface Props {
  gameId: string;
}
const GameContainer: FC<Props> = ({ gameId }) => {
  let dispatch: AppThunkDispatch = useDispatch();

  let game = useSelector(selectGame);
  let menuIsOpen = useSelector(selectMenuIsOpen);

  useEffect(() => {
    dispatch(subscribeToGame(gameId));
    return () => dispatch(unsubscribeFromGame(gameId));
  }, [dispatch, gameId]);

  if (game === undefined) {
    return null;
  }

  let onLogout = () => {
    dispatch(hideMenu());
    dispatch(logout());
  };

  return (
    <>
      <GameAppBar
        gameName={game.name}
        onShowMenu={() => dispatch(showMenu())}
        onHideMenu={() => dispatch(hideMenu())}
        onLogout={onLogout}
        menuIsOpen={menuIsOpen}
      />

      {game.phase === GamePhase.Setup && <SetupPhaseContainer />}
      {game.phase === GamePhase.Estimate && <EstimatePhaseContainer />}
      {game.phase === GamePhase.ChoosePlayerOrder && (
        <ChoosePlayerOrderPhaseContainer />
      )}
      {game.phase === GamePhase.ChooseTasks && <ChooseTasksPhaseContainer />}
    </>
  );
};

export default GameContainer;
