export default interface Game {
  id?: string;
  name: string;
  createdAt: number;
  createdById: string;

  playerIds?: string[];
}
