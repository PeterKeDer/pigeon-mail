import firebase from 'firebase';
import firebase_config from '../firebase-config.json';

function initFirebase() {
    firebase.initializeApp(firebase_config);
    console.log('Connected to Firebase');
}

initFirebase();

export const auth = firebase.auth;
export const db = firebase.database();
