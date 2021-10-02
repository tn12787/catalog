import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

const CLIENT_ID = '419424197757-7n7f5frs3qof0mk9gh0h04ntiu7d36kc.apps.googleusercontent.com';

export const firebaseConfig = {
  apiKey: '***REMOVED***',
  authDomain: 'launchday-mvp.firebaseapp.com',
  projectId: 'launchday-mvp',
  storageBucket: 'launchday-mvp.appspot.com',
  messagingSenderId: '419424197757',
  appId: '1:419424197757:web:89a775569b96670269a514',
  measurementId: 'G-27J597W62Q',
};

export const initClient = async () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: firebaseConfig.apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: CLIENT_ID,
      scope:
        'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile',
    });

    gapi.auth2.init({
      client_id: CLIENT_ID,
    });
  });
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
firebase.storage();

export default firebase;

// initClient();
