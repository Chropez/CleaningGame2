import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import InvitationContainer from './InvitationContainer';

interface InvitationParams {
  gameId: string;
  invitationId: string;
}

const InvitationRoute: FC<RouteComponentProps<InvitationParams>> = ({
  match: {
    params: { gameId, invitationId }
  }
}) => <InvitationContainer gameId={gameId} invitationId={invitationId} />;

export default InvitationRoute;
