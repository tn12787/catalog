// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.removeUser = functions.auth.user().onDelete(async ({ uid }) => {
  functions.logger.log('Removing user', uid);
  const writeMessageResult = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .delete();
  functions.logger.log('Removed user', uid, '. Result: ', writeMessageResult);
});

exports.removeRelease = functions.firestore
  .document('/releases/{releaseId}')
  .onDelete(async (snap, context) => {
    functions.logger.log(
      'Removing release ',
      context.params.releaseId,
      'name: ',
      snap.data().name
    );

    const distribution = snap.data().distribution;
    if (distribution) {
      const deletedDistribution = await admin
        .firestore()
        .collection('distributions')
        .doc(distribution)
        .delete();
      functions.logger.log(
        'Removed distribution',
        distribution,
        '. Result: ',
        deletedDistribution
      );
    }

    const artwork = snap.data().artwork;
    if (artwork) {
      // find artwork file and delete it
      await admin
        .storage()
        .bucket('gs://launchday-mvp.appspot.com')
        .file(`images/${artwork}`)
        .delete();

      // then delete artwork entry
      const deletedArtwork = await admin
        .firestore()
        .collection('artwork')
        .doc(distribution)
        .delete();
      functions.logger.log(
        'Removed artwork',
        artwork,
        '. Result: ',
        deletedArtwork
      );
    }
  });
