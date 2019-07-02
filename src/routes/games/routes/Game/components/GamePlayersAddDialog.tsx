import React, { FC, Fragment } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemAvatar,
  ListItem,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip
} from '@material-ui/core';
import GamePlayerModel from '../game-player-model';
import CheckIcon from 'mdi-material-ui/Check';

interface Props {
  availablePlayers: GamePlayerModel[];
  isLoadingAvailablePlayers: boolean;
  onClose: () => void;
  onAddPlayer: (playerId: string) => void;
  show: boolean;
}

const GamePlayersAddDialog: FC<Props> = ({
  availablePlayers,
  isLoadingAvailablePlayers,
  onAddPlayer,
  onClose,
  show
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={show && !isLoadingAvailablePlayers}
    >
      <DialogTitle>Lägg till spelare</DialogTitle>
      <DialogContent>
        <List>
          {availablePlayers.map(player => (
            <Fragment key={player.user.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={player.user.displayName}
                    src={player.user.avatarUrl}
                  />
                </ListItemAvatar>
                <ListItemText primary={player.user.displayName} />
                <ListItemSecondaryAction>
                  {player.addedToGame ? (
                    <Chip
                      label={
                        <>
                          Added <CheckIcon fontSize="small" />
                        </>
                      }
                      variant="outlined"
                    />
                  ) : (
                    <Button
                      color="primary"
                      size="small"
                      onClick={() => onAddPlayer(player.user.id)}
                    >
                      Lägg till
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>

              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
        {/* 
            // <div key={player.user.id}>
            //   {player.user.displayName} <br />
            //   Added: {player.addedToGame ? 'Ye' : 'Nah'} <br />
            //   <Button onClick={() => onAddPlayer('someid')}>Add</Button>
            // </div> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Stäng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GamePlayersAddDialog;
