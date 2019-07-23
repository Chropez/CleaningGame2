import Task from 'models/task';
import TaskEstimation from 'models/task-estimation';
import GamePlayer from 'models/game-player';

export default interface TasksViewModel extends Task {
  averageEstimate: number;
  estimations: TaskEstimation[];
  assignee?: GamePlayer;
}
