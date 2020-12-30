import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyCGX4CHOsUmfACG1Ybqty3jlE82tq-s830',
  authDomain: 'launchday-mvp.firebaseapp.com',
  projectId: 'launchday-mvp',
  storageBucket: 'launchday-mvp.appspot.com',
  messagingSenderId: '419424197757',
  appId: '1:419424197757:web:89a775569b96670269a514',
  measurementId: 'G-27J597W62Q',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
