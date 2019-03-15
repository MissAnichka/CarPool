import * as firebase from 'firebase';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, STORAGE_BUCKET } from 'react-native-dotenv';

// Create configuration json
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Instantiate database
const database = firebase.database();

// Store users high scores in db
function storeHighScore(userId, score) {
  firebase.database().ref('users/' + userId).set({
    highscore: score
  });
}