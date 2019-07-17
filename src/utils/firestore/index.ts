import Firestore from 'typings/firestore';

export const timestamp = (firestore: Firestore) =>
  firestore.Timestamp.now().toMillis();
