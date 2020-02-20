import React, { FC } from 'react';
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardHeaderProps,
  Avatar as MuiAvatar
} from '@material-ui/core';
import { AvatarProps } from '@material-ui/core/Avatar';
import styled from 'styled-components/macro';
import { CardProps } from '@material-ui/core/Card';

interface Props {
  taskName: string;
  estimate: number;
  onClickCard?: () => void;
  actionButton?: JSX.Element;
  hideShadow?: boolean;
}

const Card = styled(MuiCard as FC<CardProps>)``;
const CardHeader = styled(MuiCardHeader as FC<CardHeaderProps>)`
  && {
    justify-content: center;
    .MuiCardHeader-action {
      margin-top: 0;
    }
  }
`;

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
  actionButton = undefined,
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
      action={actionButton !== undefined && actionButton}
      title={taskName}
    />
  </Card>
);

export default TaskCard;
