import User from 'models/user';

export default interface AvailableGamePlayerModel {
  user: User;
  addedToGame: boolean;
}
