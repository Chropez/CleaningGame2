export enum GamePhase {
  Setup = 'setup',
  Estimate = 'estimate',
  ChoosePlayerOrder = 'choose-player-order',
  ChooseTasks = 'choose-tasks',
  Clean = 'clean',
}

export default interface Game {
  id?: string;
  name: string;
  createdAt: number;
  createdById: string;
  phase: GamePhase;
  invitationId: string;
  participants: string[];
}
