import React, { FC } from 'react';
import User from 'models/user';

interface Props {
  players: User[];
}

const GamePlayers: FC<Props> = ({ players }) => (
  <>
    <div>
      {players.map(
        player => player && <div key={player.id}>{player.displayName}</div>
      )}
    </div>
  </>
);

export default GamePlayers;
