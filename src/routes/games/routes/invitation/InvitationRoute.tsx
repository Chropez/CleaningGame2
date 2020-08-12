import React, { FC } from 'react';
import InvitationContainer from './InvitationContainer';
import { useParams } from 'react-router-dom';

const InvitationRoute: FC = () => {
  let { gameId, invitationId } = useParams();

  return <InvitationContainer gameId={gameId!} invitationId={invitationId!} />;
};

export default InvitationRoute;
