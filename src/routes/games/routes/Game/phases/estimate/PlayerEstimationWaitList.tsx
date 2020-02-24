import React, { FC, Fragment } from 'react';
import GamePhaseWrapper from '../../components/GamePhaseWrapper';
import GamePhaseContentWrapper from '../../components/GamePhaseContentWrapper';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem as MuiListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider
} from '@material-ui/core';
import BottomButtonBar from 'components/BottomButtonBar';
import { Small } from 'components/typography';
import { GamePlayerViewModel } from '../../view-models/game-player-view-model';
import CheckIcon from 'mdi-material-ui/Check';
import styled from 'styled-components/macro';
import { ListItemProps } from '@material-ui/core/ListItem';

const ListItem = styled(MuiListItem as FC<ListItemProps>)`
  && {
    padding-right: 100px;
  }
`;

interface Props {
  canContinue: boolean;
  cantContinueButtonMessage: string;
  onBackClick: () => void;
  onContinueClick: () => void;
  players: GamePlayerViewModel[];
}

const PlayerEstimationWaitList: FC<Props> = ({
  canContinue,
  cantContinueButtonMessage,
  onBackClick,
  onContinueClick,
  players
}) => (
  <GamePhaseWrapper>
    <GamePhaseContentWrapper>
      <Box p={2}>
        <Typography>Väntar på de långsamma...</Typography>
      </Box>
      <List>
        {players.map(player => (
          <Fragment key={player.id}>
            {player.user && (
              <>
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
                    {player.isDoneEstimating ? (
                      <Chip
                        label={
                          <>
                            Klar&nbsp;
                            <CheckIcon fontSize="small" />
                          </>
                        }
                        variant="outlined"
                      />
                    ) : (
                      <Chip label={<>Väntar...</>} variant="outlined" />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="fullWidth" component="li" />
              </>
            )}
          </Fragment>
        ))}
      </List>
    </GamePhaseContentWrapper>

    <BottomButtonBar>
      <Button color="default" aria-label="Previous stage" onClick={onBackClick}>
        Tillbaka
      </Button>
      <Button
        disabled={!canContinue}
        color="primary"
        variant="contained"
        aria-label="Next stage"
        onClick={onContinueClick}
      >
        Fortsätt
        <br />
        {!canContinue && <Small>{cantContinueButtonMessage}</Small>}
      </Button>
    </BottomButtonBar>
  </GamePhaseWrapper>
);

export default PlayerEstimationWaitList;
