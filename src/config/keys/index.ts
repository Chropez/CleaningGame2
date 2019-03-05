export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

let firebaseConfig: IFirebaseConfig;

if (process.env.NODE_ENV === 'production') {
  firebaseConfig = require('./production').FirebaseConfig;
} else {
  firebaseConfig = require('./develop').FirebaseConfig;
}

export default firebaseConfig;
