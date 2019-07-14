export default interface TaskEstimation {
  id?: string;
  userId: string;
  lastModified: number;
  estimate: number;
}
