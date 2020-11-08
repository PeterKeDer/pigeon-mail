import { auth } from '../services/firebase';

export function signUp(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function authStateChanged() {
  auth().onAuthStateChanged(function(user) {
    if (user) {
        return true;
    } else {
        return false;
    }
  });
}

export function getCurrentUserId() {
  var userId = auth().currentUser.uid;
  if (userId != null) {
    return userId;
  } else {
    console.log("not signed in");
  }
}