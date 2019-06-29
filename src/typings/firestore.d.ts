import { firestore } from 'firebase';

interface Populates {
  child: string;
  root: string;
  childAlias?: string;
}

export interface DocumentQuery {
  collection: string;
  doc?: string;
  orderBy?: string | string[] | string[][];
  where?: string | string[] | string[][];
  populates?: Populates[];
  storeAs?: string;
}

interface Timestamp {
  now: () => firestore.Timestamp;
}

interface SubCollection {
  options: string | DocumentQuery;
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface FieldValue {
  serverTimestamp: () => FirebaseTimestamp;
}
interface SnapshotMetadata {
  fromCache: boolean;
  hasPendingWrites: boolean;
}
interface DocumentSnapshot {
  exists: boolean;
  id: string;
  metadata: SnapshotMetadata;
  ref: DocumentReference;
}

export default interface Firestore extends firebase.firestore.Firestore {
  add: <T>(options: string | DocumentQuery, document?: T) => void;
  get: (options: string | DocumentQuery) => Promise<DocumentSnapshot>;
  set: <T>(options: string | DocumentQuery, document?: T) => Promise<string>;
  subcollections: SubCollection[];
  setListener: (options: string | DocumentQuery) => void;
  unsetListener: (options: string | DocumentQuery) => void;
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
