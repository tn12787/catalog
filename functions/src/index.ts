// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.distribution = require('./distribution');

exports.removeUser = functions.auth.user().onDelete(async ({ uid }) => {
  functions.logger.log('Removing user', uid);
  const writeMessageResult = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .delete();
  functions.logger.log('Removed user', uid, '. Result: ', writeMessageResult);
});
