import User from 'models/user';

export default interface GamePlayerModel {
  user: User;
  addedToGame: boolean;
}
