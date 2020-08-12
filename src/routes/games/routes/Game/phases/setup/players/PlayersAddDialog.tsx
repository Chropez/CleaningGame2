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
  Chip,
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import AvailableGamePlayerModel from './available-game-player-view-model';
import CheckIcon from 'mdi-material-ui/Check';
import {
  ShareVariant as ShareVariantIcon,
  ContentCopy as ContentCopyIcon,
} from 'mdi-material-ui';

interface Props {
  availablePlayers: AvailableGamePlayerModel[];
  isLoadingAvailablePlayers: boolean;
  onClose: () => void;
  onAddPlayer: (playerId: string) => void;
  show: boolean;
  canShare: boolean;
  onShareClick: () => void;
  shareLink: string;
  onCopyInvitationUrl: () => void;
}

const PlayersAddDialog: FC<Props> = ({
  availablePlayers,
  isLoadingAvailablePlayers,
  onAddPlayer,
  onClose,
  show,
  canShare,
  onShareClick,
  shareLink,
  onCopyInvitationUrl,
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={show && !isLoadingAvailablePlayers}
    >
      <DialogTitle>Bjud in dina vänner</DialogTitle>
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

                <ListItemText>
                  <Box pr={1}>{player.user.displayName}</Box>
                </ListItemText>

                <ListItemSecondaryAction>
                  {player.addedToGame ? (
                    <Chip
                      label={
                        <>
                          Tillagd <CheckIcon fontSize="small" />
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
        {!canShare && (
          <Box pt={2} pb={2}>
            <Typography>Eller dela länken</Typography>
            <OutlinedInput
              // id="outlined-adornment-password"
              fullWidth={true}
              type="text"
              value={shareLink}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy link"
                    onClick={onCopyInvitationUrl}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {canShare && (
          <Button
            variant="text"
            startIcon={<ShareVariantIcon />}
            onClick={onShareClick}
          >
            Share game
          </Button>
        )}
        <Button variant="text" onClick={() => onClose()}>
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayersAddDialog;
