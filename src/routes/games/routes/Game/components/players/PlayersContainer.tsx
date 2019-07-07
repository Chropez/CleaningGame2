import React, { FC } from 'react';
import User from 'models/user';
import GamePlayerModel from './game-player-model';
import PlayersAddDialog from './PlayersAddDialog';
import PlayerList from './PlayerList';

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

const PlayersContainer: FC<Props> = ({
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
    <PlayersAddDialog
      isLoadingAvailablePlayers={isLoadingAvailablePlayers}
      availablePlayers={availablePlayers}
      onAddPlayer={onAddPlayerToGame}
      onClose={onHidePlayersAddDialog}
      show={showAddPlayerModal}
    />
    <PlayerList
      currentPlayerId={currentPlayerId}
      onRemovePlayer={onRemovePlayer}
      onShowAddPlayerDialog={onShowAddPlayerDialog}
      players={players}
    />
  </>
);

export default PlayersContainer;
