import React, { FC, Fragment } from 'react';
import {
  Paper,
  List as MuiList,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box
} from '@material-ui/core';
import { GamePlayerViewModel } from '../../view-models/game-player-view-model';
import styled from 'styled-components/macro';
import { ListItemTextProps } from '@material-ui/core/ListItemText';
import { ListProps } from '@material-ui/core/List';
import ChevronUpIcon from 'mdi-material-ui/ChevronUp';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';

const CompoundButtons = styled.div`
  display: flex;
  flex-direction: column;
  && {
    .MuiIconButton-root {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;

const OrderNumber = styled(ListItemText as FC<ListItemTextProps>)`
  flex: 0;
  margin-right: ${({ theme }) => theme.spacing(3)}px;

  .MuiTypography-root {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const List = styled(MuiList as FC<ListProps>)`
  && {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

interface Props {
  players: GamePlayerViewModel[];
  onChangeOrder: (playerId: string, newOrder: number) => void;
}

const ChooseOrderContainer: FC<Props> = ({ onChangeOrder, players }) => (
  <Paper>
    <List>
      {players.map((player, index) => {
        let order = index + 1;

        return (
          <Fragment key={player.id}>
            {player.user && (
              <>
                <ListItem>
                  <OrderNumber primary={order} />
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
                    <CompoundButtons>
                      <IconButton
                        disabled={order === 1}
                        color="primary"
                        aria-label="Move up the order"
                        component="span"
                        onClick={() => onChangeOrder(player.id!, order - 1)}
                      >
                        <ChevronUpIcon />
                      </IconButton>
                      <IconButton
                        disabled={order === players.length}
                        color="primary"
                        aria-label="Move up the order"
                        component="span"
                        onClick={() => onChangeOrder(player.id!, order + 1)}
                      >
                        <ChevronDownIcon />
                      </IconButton>
                    </CompoundButtons>
                  </ListItemSecondaryAction>
                </ListItem>
                {index + 1 < players.length && (
                  <Divider variant="fullWidth" component="li" />
                )}
              </>
            )}
          </Fragment>
        );
      })}
    </List>
  </Paper>
);

export default ChooseOrderContainer;
