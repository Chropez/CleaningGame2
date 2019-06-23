import { firestore } from 'firebase';

interface Populates {
  child: string;
  root: string;
  childAlias?: string;
}

export interface Document {
  collection: string;
  doc?: string;
  orderBy?: string | string[] | string[][];
  where?: string | string[] | string[][];
  populates?: Populates[];
}

interface Timestamp {
  now: () => firestore.Timestamp;
}

interface SubCollection {
  options: string | Document;
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface FieldValue {
  serverTimestamp: () => FirebaseTimestamp;
}

export default interface Firestore extends firebase.firestore.Firestore {
  add: <T>(options: string | Document, document?: T) => void;
  set: <T>(options: string | Document, document?: T) => void;
  subcollections: SubCollection[];
  setListener: (options: string | Document) => void;
  unsetListener: (options: string | Document) => void;
  Timestamp: Timestamp;
  FieldValue: FieldValue;
  storeAs: string;

  // limits
  limit: number;
  startAt: number;
  startAfter: number;
  endAt: number;
  endBefore: number;
}
