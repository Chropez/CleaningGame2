export default interface TaskEstimation {
  id?: string;
  taskId: string;
  playerId: string;
  lastModified: number;
  estimate: number;
}
