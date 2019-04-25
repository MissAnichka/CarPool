import firebase from './firebase';

const db = firebase.firestore();

// Store users info in db
const storeUserInfo = (username) => {
    db.ref("users/" + username).set({
        username: username
    });
}