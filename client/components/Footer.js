import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

module.exports = function Footer(){
    return(
        <View style={styles.footer}>
            <Text style={styles.footerText}>Login</Text>
            <Text style={styles.footerText}>Signup</Text>
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