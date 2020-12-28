import firebase from 'firebase/app';
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';

const firebaseConfig = {
  apiKey: '***REMOVED***',
  authDomain: 'launchday-mvp.firebaseapp.com',
  projectId: 'launchday-mvp',
  storageBucket: 'launchday-mvp.appspot.com',
  messagingSenderId: '419424197757',
  appId: '1:419424197757:web:89a775569b96670269a514',
  measurementId: 'G-27J597W62Q',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
