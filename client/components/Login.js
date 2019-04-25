import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { firebaseFBLogin, firebaseGoogleLogin } from "../../firebase/auth.js"
import { APP_ID, G_ANDROID_CLIENT_ID } from "react-native-dotenv";

const USERNAME = "USERNAME"
const USER_EMAIL = "USER_EMAIL"
const USER_RIDE_OR_DRIVE = "USER_RIDE_OR_DRIVE"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Guest",
            email: "",
            rideOrDrive: "",
            textName: "",
            textEmail: "",
            textRideOrDrive: ""
        };
    }

    componentWillMount() {
        this.load();
    }

    load = async () => {
        try {
            const username = await AsyncStorage.getItem(USERNAME);
            const email = await AsyncStorage.getItem(USER_EMAIL);
            const rideOrDrive = await AsyncStorage.getItem(USER_RIDE_OR_DRIVE);
            if (username && email && rideOrDrive) {
                this.setState({ username, email, rideOrDrive });
            }
        } catch (error) {
            console.error(`Couldnt get it ${error}`);
        }
    }

    saveName = async (username) => {
        try {
            await AsyncStorage.setItem(USERNAME, username);
            this.setState({ username });
        } catch (error) {
            console.error("nope did not save name");
        }
    }

    saveEmail = async (email) => {
        try {
            await AsyncStorage.setItem(USER_EMAIL, email);
            this.setState({ email });
        } catch (error) {
            console.error("nope did not save email");
        }
    }

    saveRideOrDrive = async (rideOrDrive) => {
        try {
            await AsyncStorage.setItem(USER_RIDE_OR_DRIVE, rideOrDrive);
            this.setState({ rideOrDrive });
        } catch (error) {
            console.error("nope did not save ride or drive");
        }
    }

    onChangeTextName = (textName) => this.setState({ textName, name: textName });
    onChangeTextEmail = (textEmail) => this.setState({ textEmail });
    onChangeTextRideOrDrive = (textRideOrDrive) => this.setState({ textRideOrDrive });

    onSubmitEditing = () => {
        const { textName, textEmail, textRideOrDrive } = this.state;

        if (!textName || !textEmail || !textRideOrDrive) return;
        if (textName) {
            this.saveName(textName);
            this.setState({ textName: "" });
        }
        if (textEmail) {
            this.saveEmail(textEmail);
            this.setState({ textEmail: "" });
        }
        if (textRideOrDrive) {
            this.saveRideOrDrive(textRideOrDrive);
            this.setState({ textRideOrDrive: "" });
        }
    }

    facebookLogin = async () => {
        try {
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
                permissions: ["public_profile", "email"]
            });

            if (type === "success") {
                const { name, email } = await firebaseFBLogin(token);
                // TODO share state data better, maybe redux or just refactor
                if (name) this.finishLoggingIn(name, email);
                else throw new Error("login error occurred")
            }
            // else type === "cancel", do nothing
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    }

    googleLogin = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                clientId: G_ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });
            console.log("google login result =", result);
            if (result.type === "success") {
                const { idToken, accessToken, user } = result;
                firebaseGoogleLogin(idToken, accessToken);
                if (user && user.email) this.finishLoggingIn(user.name, user.email);
                else throw new Error("login error occurred")
            }
        } catch ({ message }) {
            Alert.alert(`Google Login Error: ${message}`);
        }
    }

    finishLoggingIn = (name, email) => {
        Alert.alert("Logged in!", `Hi ${name}!`);
        this.saveName(name);
        this.saveEmail(email);
        Actions.profile({ username: name });
    }

    render() {
        const { username, email, rideOrDrive, textName, textEmail, textRideOrDrive } = this.state;

        return (
            <View style={styles.container}>
                {
                    username ?
                        <Text style={styles.subtext}> Let's ride together {username}!</Text>
                        :
                        <View style={styles.reset}>
                            <Text style={styles.maintext}> Welcome to CarPool! </Text>
                            <Text style={styles.subtext}>Please Login / Signup</Text>
                        </View>
                }
                <KeyboardAvoidingView
                    style={styles.reset}
                    behavior="padding"
                >
                    <Button
                        onPress={() => this.facebookLogin()}
                        title="Login with Facebook"
                        color="#1550c6"
                        accessibilityLabel="Tap here to log in with Facebook"
                        style={styles.reset}
                    />
                    <Button
                        onPress={() => this.googleLogin()}
                        class="g-signin2"
                        title="Login with Google"
                        accessibilityLabel="Tap here to log in with Google"
                    />
                    <TextInput
                        style={styles.input}
                        value={textName}
                        placeholder={"Enter your name here"}
                        placeholderTextColor="purple"
                        onChangeText={this.onChangeTextName}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                    <TextInput
                        style={styles.input}
                        value={textEmail}
                        placeholder={"email"}
                        placeholderTextColor="purple"
                        onChangeText={this.onChangeTextEmail}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                    <TextInput
                        style={styles.input}
                        value={textRideOrDrive}
                        placeholder={"driver, rider, or both?"}
                        placeholderTextColor="purple"
                        onChangeText={this.onChangeTextRideOrDrive}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                    <Button
                        onPress={() => Actions.profile({ username })}
                        title="Lets ride!"
                        color="#841584"
                        accessibilityLabel="Tap here to join or sign up"
                        style={styles.reset}
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.4)",
        alignItems: "center",
        justifyContent: "center",
    },
    maintext: {
        fontFamily: "Roboto",
        fontSize: 50,
        fontWeight: "bold",
        margin: 5,
    },
    subtext: {
        fontSize: 30,
        margin: 8,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    reset: {
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
});