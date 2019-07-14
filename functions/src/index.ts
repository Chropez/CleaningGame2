/* eslint-disable no-console */
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const updateTaskAverage = functions.firestore
  .document('games/{gameId}/task-estimations/{taskEstimationId}')
  .onWrite((change, context) => {
    console.log(change);
    console.log(context);

    // Check if all players
    // Get amount of players
    // Get tasks
    //
  });
