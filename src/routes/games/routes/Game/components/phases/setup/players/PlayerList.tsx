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
  ListSubheader as MuiListSubheader,
  Fab
} from '@material-ui/core';
import DeleteIcon from 'mdi-material-ui/Delete';
import styled from 'styled-components/macro';
import { ListSubheaderProps } from '@material-ui/core/ListSubheader';
import { FabProps } from '@material-ui/core/Fab';
import User from 'models/user';

interface PlayerListItemProps {
  canBeRemoved: boolean;
  onRemovePlayer: (playerId: string) => void;
  player: User;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
  canBeRemoved,
  onRemovePlayer,
  player
}) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={player.displayName} src={player.avatarUrl} />
      </ListItemAvatar>
      <ListItemText primary={player.displayName} />

      {canBeRemoved && (
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => onRemovePlayer(player.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>

    <Divider variant="inset" component="li" />
  </>
);
const ListSubheader = styled(MuiListSubheader as FC<ListSubheaderProps>)`
  display: flex;
`;

const SubHeaderTitle = styled.div`
  flex: 1;
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
  players: User[];
}

const PlayerList: FC<Props> = ({
  currentPlayerId,
  onShowAddPlayerDialog,
  onRemovePlayer,
  players
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
    {players.map(player => (
      <PlayerListItem
        key={player.id}
        canBeRemoved={currentPlayerId !== player.id}
        onRemovePlayer={onRemovePlayer}
        player={player}
      />
    ))}
  </List>
);

export default PlayerList;
