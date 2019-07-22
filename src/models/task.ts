import GamePlayer from './game-player';

export default interface Task {
  id?: string;
  name: string;

  createdBy: string;
  createdAt: number;

  assignee?: GamePlayer;
}
