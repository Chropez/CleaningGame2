import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Divider,
  LinkProps,
  Link,
} from '@material-ui/core';
import {
  ShareVariant as ShareVariantIcon,
  Delete as DeleteIcon,
} from 'mdi-material-ui';
import styled from 'styled-components/macro';
import User from 'models/user';

const StyledLink = styled(Link as FC<LinkProps>)`
  &&:hover {
    text-decoration: none;
  }
`;

interface Props {
  gameName: string;
  gameId: string;
  currentPlayerId: string;
  participants: User[];
}

const GameCard: FC<Props> = ({
  gameName,
  gameId,
  currentPlayerId,
  participants,
}) => (
  <Card>
    <StyledLink href={`/games/${gameId}`} color="inherit">
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {gameName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {participants.length === 1 &&
          participants[0].id === currentPlayerId ? (
            <>Bara du i spelet</>
          ) : (
            <>
              Med{' '}
              {participants
                .filter(participant => participant.id !== currentPlayerId)
                .map(participant => participant.displayName)
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
