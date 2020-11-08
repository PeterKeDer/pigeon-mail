import admin from 'firebase-admin';
import firebaseConfig from '../firebase-config.json';

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.serviceAccount),
    databaseURL: firebaseConfig.databaseURL,
});

export const db = admin.firestore();
