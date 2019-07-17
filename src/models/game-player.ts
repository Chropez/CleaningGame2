export default interface GamePlayer {
  id?: string;
  userId: string;
  createdAt: number;

  isDoneEstimating?: boolean;
  isDoneEstimatingAt?: number;

  pickOrder?: number;
}
