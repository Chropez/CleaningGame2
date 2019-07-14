import React, { FC } from 'react';
import AvailableGamePlayerModel from './available-game-player-view-model';
import PlayersAddDialog from './PlayersAddDialog';
import PlayerList from './PlayerList';
import { GamePlayerViewModel } from '../../../game-player-view-model';

interface Props {
  availablePlayers: AvailableGamePlayerModel[];
  currentPlayerId: string;
  isLoadingAvailablePlayers: boolean;
  onShowAddPlayerDialog: () => void;
  onAddPlayerToGame: (playerId: string) => void;
  onHidePlayersAddDialog: () => void;
  onRemovePlayer: (playerId: string) => void;
  showAddPlayerModal: boolean;
  players: GamePlayerViewModel[];
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
