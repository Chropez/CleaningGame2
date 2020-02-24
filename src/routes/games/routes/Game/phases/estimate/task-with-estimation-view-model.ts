import Task from 'models/task';
import TaskEstimation from 'models/task-estimation';

export default interface TaskWithEstimationViewModel {
  task: Task;
  estimation?: TaskEstimation;
}
