import React, { FC } from 'react';
import AvailableGamePlayerModel from './available-game-player-view-model';
import PlayersAddDialog from './PlayersAddDialog';
import PlayerList from './PlayerList';
import { GamePlayerViewModel } from '../../../view-models/game-player-view-model';

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
  canShare: boolean;
  onShareClick: () => void;
  shareLink: string;
  onCopyInvitationUrl: () => void;
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
  players,
  canShare,
  onShareClick,
  shareLink,
  onCopyInvitationUrl
}) => (
  <>
    <PlayersAddDialog
      isLoadingAvailablePlayers={isLoadingAvailablePlayers}
      availablePlayers={availablePlayers}
      onAddPlayer={onAddPlayerToGame}
      onClose={onHidePlayersAddDialog}
      show={showAddPlayerModal}
      canShare={canShare}
      onShareClick={onShareClick}
      shareLink={shareLink}
      onCopyInvitationUrl={onCopyInvitationUrl}
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
