import TasksViewModel from './tasks-view-model';
import User from 'models/user';
import GamePlayer from 'models/game-player';

export default interface PlayerTasksViewModel extends GamePlayer {
  tasks: TasksViewModel[];
  user: User;
}
