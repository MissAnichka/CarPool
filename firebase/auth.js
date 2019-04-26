import firebase from './firebase';

/**
 * Firebase Facebook Authentication
 * @param {*} token 
 */
const firebaseFBLogin = async (token) => {
    try {
        // Build Firebase credential with the Facebook access token.
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user
        const firebaseFacebookAuth = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        const { name, email } = firebaseFacebookAuth.additionalUserInfo.profile;
        return { name, email };
    } catch (e) {
        console.error("error in facebook sign in =>", e);
    }
}

/**
 * Firebase Google Authentication
 * @param {*} idToken 
 * @param {*} accessToken 
 */
const firebaseGoogleLogin = async (idToken, accessToken) => {
    try {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        const firebaseGoogleAuth = firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log("firebase google auth =>", firebaseGoogleAuth);
    } catch (e) {
        console.log("error in google sign in =>", e);
    }
};

/**
 * Firebase New User Sign Up
 * @param {*} email 
 * @param {*} password 
 */
const firebaseSignUp = async (email, password) => {
    try {
        firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
        console.log("error in sign up =>", e);
    }
}

/**
 * Firebase Login
 * @param {*} email 
 * @param {*} password 
 */
const firebaseLogin = async (email, password) => {
    try {
        firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
        console.log("error in sign up =>", e);
    }
}

module.exports = { firebaseFBLogin, firebaseGoogleLogin, firebaseSignUp, firebaseLogin };