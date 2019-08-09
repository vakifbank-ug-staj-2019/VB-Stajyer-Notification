import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

//const db = admin.firestore();
const fcm = admin.messaging();

export const sendNewComment = functions.firestore
  .document('comments/{commentID}')
  .onCreate(async snapshot => {
    const comment = snapshot.data() || "";

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: 'Yeni Yorum!',
        body: !comment ? "":`${comment.title}${' - ' + comment.rating + '⭐' }`,
        //icon: 'your-icon-url',
        //click_action: 'FLUTTER_NOTIFICATION_CLICK' // required only for onResume or onLaunch callbacks
      }
    };

    return fcm.sendToTopic('NewComment', payload);
  });