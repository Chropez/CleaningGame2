/* eslint-disable no-console */
// import { firestore } from 'firebase-functions';
// import admin from 'firebase-admin';

// admin.initializeApp();
// const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

// export const updateTaskAverage = firestore
//   .document('games/{gameId}')
//   .onUpdate(async (change, context) => {
//     let gameId = context.params.gameId;
//     console.log(`Changing ${gameId}`);

//     let gameBefore = change.before.data();
//     let gameAfter = change.after.data();

//     if (gameBefore === undefined || gameAfter === undefined) {
//       console.log('Game before or after is undefined');
//       return;
//     }
//     if (
//       gameBefore.phase === 'estimate' &&
//       gameAfter.phase === 'choose-player-order'
//     ) {
//       // Todo check that all players are done estimating
//       await db.runTransaction(async transaction => {
//         let gamesQuery = db.collection('games').doc(gameId);

//         let tasksQuery = gamesQuery.collection('tasks');
//         let estimationsQuery = gamesQuery.collection('task-estimations');

//         let tasksRef = await transaction.get(tasksQuery);

//         let estimationsRef = await transaction.get(estimationsQuery);

//         // loop through tasks and

//         console.log(tasks);
//       });
//     }
//   });
