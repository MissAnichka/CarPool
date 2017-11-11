import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions } from 'react-native-router-flux';

module.exports = function Footer(){
    return(
        <View style={styles.footer}>
            <Text style={styles.footerText} onPress={() => Actions.login()}>Login</Text>
            <Text style={styles.footerText} onPress={() => Actions.login()}>Signup</Text>
        </View>
    )
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