import * as functions from 'firebase-functions';
import { addEventToGoogleCalendar } from './common';

exports.createDistributionEvent = functions.firestore
  .document('/distributions/{documentId}')
  .onCreate((snap, context) => {
    const token = context.auth?.token;
    if (!token) return;
    functions.logger.log(token, snap.data());
    return addEventToGoogleCalendar(
      { id: context.params.documentId, ...snap.data() },
      token.toString() ?? ''
    );
  });

exports.updateDistributionEvent = functions.firestore
  .document('/distributions/{documentId}')
  .onUpdate((change, context) => {
    const token = context.auth?.token;
    if (!token) return;
    functions.logger.log(token, change.after.data());
    return addEventToGoogleCalendar(
      { id: context.params.documentId, ...change.after.data() },
      token.toString() ?? ''
    );
  });
