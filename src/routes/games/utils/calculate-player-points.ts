import TasksViewModel from '../routes/Game/view-models/tasks-view-model';

export default function calculatePlayerPoints(tasks: TasksViewModel[]) {
  return tasks.reduce((total, task) => task.averageEstimate + total, 0);
}
