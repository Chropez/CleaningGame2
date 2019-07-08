export enum GamePhase {
  Setup = 'setup',
  Estimate = 'estimate',
  Choose = 'choose',
  Clean = 'clean'
}

export default interface Game {
  id?: string;
  name: string;
  createdAt: number;
  createdById: string;

  playerIds?: string[];

  phase: GamePhase;
}
