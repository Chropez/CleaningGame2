import GamePlayer from 'models/game-player';
import User from 'models/user';

export interface GamePlayerViewModel extends GamePlayer {
  user: User;
}
