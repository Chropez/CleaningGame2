import TasksViewModel from './tasks-view-model';
import { GamePlayerViewModel } from './game-player-view-model';

export default interface PlayerTasksViewModel extends GamePlayerViewModel {
  tasks: TasksViewModel[];
}
