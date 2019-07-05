import React, { FC } from 'react';
import GamePlayersAddDialog from './GamePlayersAddDialog';
import User from 'models/user';
import GamePlayersList from './GamePlayersList';
import GamePlayerModel from '../game-player-model';

interface Props {
  availablePlayers: GamePlayerModel[];
  currentPlayerId: string;
  isLoadingAvailablePlayers: boolean;
  onShowAddPlayerDialog: () => void;
  onAddPlayerToGame: (playerId: string) => void;
  onHidePlayersAddDialog: () => void;
  onRemovePlayer: (playerId: string) => void;
  showAddPlayerModal: boolean;
  players: User[];
}

const GamePlayersContainer: FC<Props> = ({
  availablePlayers,
  currentPlayerId,
  isLoadingAvailablePlayers,
  onShowAddPlayerDialog,
  onAddPlayerToGame,
  onHidePlayersAddDialog,
  onRemovePlayer,
  showAddPlayerModal,
  players
}) => (
  <>
    <GamePlayersAddDialog
      isLoadingAvailablePlayers={isLoadingAvailablePlayers}
      availablePlayers={availablePlayers}
      onAddPlayer={onAddPlayerToGame}
      onClose={onHidePlayersAddDialog}
      show={showAddPlayerModal}
    />
    <GamePlayersList
      currentPlayerId={currentPlayerId}
      onRemovePlayer={onRemovePlayer}
      onShowAddPlayerDialog={onShowAddPlayerDialog}
      players={players}
    />
  </>
);

export default GamePlayersContainer;
