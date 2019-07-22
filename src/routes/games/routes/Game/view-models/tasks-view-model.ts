import Task from 'models/task';
import TaskEstimation from 'models/task-estimation';

export default interface TasksViewModel extends Task {
  averageEstimate: number;
  estimations: TaskEstimation[];
}
