import React, { FC } from 'react';
import PlusIcon from 'mdi-material-ui/Plus';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Fab,
  Typography,
  Box,
} from '@material-ui/core';
import DeleteIcon from 'mdi-material-ui/Delete';
import styled from 'styled-components/macro';
import { ListSubheaderProps } from '@material-ui/core/ListSubheader';
import { FabProps } from '@material-ui/core/Fab';
import StickyListSubHeader from 'components/StickyListSubHeader';
import { TypographyProps } from '@material-ui/core/Typography';
import { GamePlayerViewModel } from '../../../view-models/game-player-view-model';

interface PlayerListItemProps {
  canBeRemoved: boolean;
  onRemovePlayer: (playerId: string) => void;
  player: GamePlayerViewModel;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
  canBeRemoved,
  onRemovePlayer,
  player,
}) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={player.user.displayName} src={player.user.avatarUrl} />
      </ListItemAvatar>

      <ListItemText>
        <Box pr={1}>{player.user.displayName}</Box>
      </ListItemText>

      {canBeRemoved && (
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => onRemovePlayer(player.user.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>

    <Divider variant="inset" component="li" />
  </>
);

const ListSubheader = styled(StickyListSubHeader as FC<ListSubheaderProps>)`
  display: flex;
`;

const SubHeaderTitle = styled(Typography as FC<TypographyProps>)`
  && {
    flex: 1;
    line-height: 48px;
  }
`;

const AddPlayerButton = styled(Fab as FC<FabProps>)`
  && {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    min-height: 30px;
    align-self: center;
  }
`;

interface Props {
  currentPlayerId: string;
  onShowAddPlayerDialog: () => void;
  onRemovePlayer: (playerId: string) => void;
  players: GamePlayerViewModel[];
}

const PlayerList: FC<Props> = ({
  currentPlayerId,
  onShowAddPlayerDialog,
  onRemovePlayer,
  players,
}) => (
  <List
    subheader={
      <ListSubheader>
        <SubHeaderTitle>Spelare</SubHeaderTitle>
        <AddPlayerButton
          size="small"
          color="primary"
          onClick={() => onShowAddPlayerDialog()}
        >
          <PlusIcon />
        </AddPlayerButton>
      </ListSubheader>
    }
  >
    {players.map(
      player =>
        player.user && (
          <PlayerListItem
            key={player.id}
            canBeRemoved={currentPlayerId !== player.id}
            onRemovePlayer={onRemovePlayer}
            player={player}
          />
        )
    )}
  </List>
);

export default PlayerList;
