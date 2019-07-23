export default interface Task {
  id?: string;
  name: string;

  createdBy: string;
  createdAt: number;

  assigneePlayerId?: string;
}
