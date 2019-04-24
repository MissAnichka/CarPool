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
    try {
        // Build Firebase credential with the Facebook access token.
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user
        const firebaseFacebookAuth = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        const { name, email } = firebaseFacebookAuth.additionalUserInfo.profile;
        return { name, email };
    } catch (e) {
        console.error("error signing in =>", e);
    }
}

// Store users info in db
const storeUserInfo = (username) => {
    firebase.database().ref('users/' + username).set({
        username: username
    });
}

module.exports = { firebaseLogin };