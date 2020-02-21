import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Divider,
  LinkProps,
  Link
} from '@material-ui/core';
import { GamePlayerViewModel } from 'routes/games/routes/Game/view-models/game-player-view-model';
import {
  ShareVariant as ShareVariantIcon,
  Delete as DeleteIcon
} from 'mdi-material-ui';
import styled from 'styled-components/macro';

const StyledLink = styled(Link as FC<LinkProps>)`
  &&:hover {
    text-decoration: none;
  }
`;

interface Props {
  gameName: string;
  gameId: string;
  currentPlayerId: string;
  players: GamePlayerViewModel[];
}

const GameCard: FC<Props> = ({
  gameName,
  gameId,
  currentPlayerId,
  players
}) => (
  <Card>
    <StyledLink href={`/games/${gameId}`} color="inherit">
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {gameName} {gameId}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {players.length === 0 ||
          (players.length === 1 && players[0].id === currentPlayerId) ? (
            <>Bara du i spelet</>
          ) : (
            <>
              Med{' '}
              {players
                .filter(player => player.id !== currentPlayerId)
                .map(player => player.user.displayName)
                .join(', ')}
            </>
          )}
        </Typography>
      </CardContent>
    </StyledLink>
    <Divider />
    <CardActions disableSpacing>
      <IconButton aria-label="share">
        <ShareVariantIcon />
      </IconButton>

      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default GameCard;
