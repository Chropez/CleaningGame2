export default interface Game {
  id?: string;
  name: string;
  createdAt: number;
  playerIds?: string[];
  createdById: string;
}
