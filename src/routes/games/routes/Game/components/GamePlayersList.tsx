import React, { FC, SFC } from 'react';
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
import styled from 'themes/styled';
import { ListSubheaderProps } from '@material-ui/core/ListSubheader';
import { FabProps } from '@material-ui/core/Fab';
import User from 'models/user';

interface PlayerListItemProps {
  onRemovePlayer: (playerId: string) => void;
  player: User;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
  onRemovePlayer,
  player
}) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={player.displayName} src={player.avatarUrl} />
      </ListItemAvatar>
      <ListItemText primary={player.displayName} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => onRemovePlayer(player.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>

    <Divider variant="inset" component="li" />
  </>
);
const ListSubheader = styled(MuiListSubheader as SFC<ListSubheaderProps>)`
  display: flex;
`;

const SubHeaderTitle = styled.div`
  flex: 1;
`;

const AddPlayerButton = styled(Fab as SFC<FabProps>)`
  && {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    min-height: 30px;
    align-self: center;
  }
`;

interface Props {
  onShowAddPlayerDialog: () => void;
  onRemovePlayer: (playerId: string) => void;
  players: User[];
}

const GamePlayersList: FC<Props> = ({
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
        onRemovePlayer={onRemovePlayer}
        player={player}
      />
    ))}
  </List>
);

export default GamePlayersList;
