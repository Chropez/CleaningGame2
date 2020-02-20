import React, { FC } from 'react';
import {
  Card as MuiCard,
  CardHeader,
  Avatar as MuiAvatar,
  IconButton
} from '@material-ui/core';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import { AvatarProps } from '@material-ui/core/Avatar';
import styled from 'styled-components/macro';
import { CardProps } from '@material-ui/core/Card';

interface Props {
  taskName: string;
  estimate: number;
  onClickCard?: () => void;
  showActions?: boolean;
  hideShadow?: boolean;
}

const Card = styled(MuiCard as FC<CardProps>)``;

const Avatar = styled(MuiAvatar as FC<AvatarProps>)`
  && {
    background-color: ${({ theme }) => theme.palette.primary.light};
    width: 30px;
    height: 30px;
    font-size: 0.7rem;
  }
`;

const TaskCard: FC<Props> = ({
  estimate,
  taskName,
  onClickCard,
  showActions = false,
  hideShadow = false
}) => (
  <Card
    elevation={hideShadow ? 0 : 1}
    onClick={() => onClickCard && onClickCard()}
  >
    <CardHeader
      avatar={
        <Avatar sizes="small" aria-label="estimate">
          {estimate}
        </Avatar>
      }
      action={
        showActions && (
          <IconButton aria-label="Task settings">
            <DotsVerticalIcon />
          </IconButton>
        )
      }
      title={taskName}
    />
  </Card>
);

export default TaskCard;
