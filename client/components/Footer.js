import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

const USERNAME = 'USERNAME';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        this.load();
    }

    load = async () => {
        try {
            const username = await AsyncStorage.getItem(USERNAME)
            if (username) {
                this.setState({ username });
            }
        } catch (error) {
            console.error(`Couldnt get it ${error}`);
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem(USERNAME);
            this.setState({ username: 'Guest' });
            Actions.home();
        } catch (error) {
            console.error(`Couldnt remove it ${error}`);
        }
    }

    render() {
        const { username } = this.state;
        return (
            <View>
                {
                    !!username ?
                        <View style={styles.footer}>
                            <Text style={styles.footerText} onPress={() => Actions.profile({ username })}>Profile</Text>
                            <Text style={styles.footerText} onPress={this.logout}>Logout</Text>
                        </View>
                        :
                        <View style={styles.footer}>
                            <Text style={styles.footerText} onPress={() => Actions.login()}>Login</Text>
                            <Text style={styles.footerText} onPress={() => Actions.login()}>Signup</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    footerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})