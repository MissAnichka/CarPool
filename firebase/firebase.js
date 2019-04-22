import * as firebase from 'firebase';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID } from 'react-native-dotenv';

// Create configuration json
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Instantiate database
const database = firebase.database();

const firebaseLogin = async (token) => {
    // Build Firebase credential with the Facebook access token.
    const credential = await firebase.auth.FacebookAuthProvider.credential(token);
    console.log("CREDENTIAL =>", credential);
    // Sign in with credential from the Facebook user.
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then((res) => console.log("firebase sign in & retrieve response =>", res))
        .catch((error) => console.error("error signing into firebase =>", error));
}

// Store users high scores in db
const storeHighScore = (userId, score) => {
    firebase.database().ref('users/' + userId).set({
        highscore: score
    });
}

module.exports = { firebaseLogin };