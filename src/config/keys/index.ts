export interface FirebaseConfigInterface {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

let firebaseConfig: FirebaseConfigInterface;

if (process.env.NODE_ENV === 'production') {
  firebaseConfig = require('./production').FirebaseConfig;
} else {
  firebaseConfig = require('./develop').FirebaseConfig;
}

export default firebaseConfig;
