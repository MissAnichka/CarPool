import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Footer from './Footer';

export default class Profile extends Component {
  render() {
    const remote = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9W3iZPVZxPmv0a94vXVUFL2Tt09zq71iGCQqxTd3zd3Ph2m4';
    const resizeMode = 'center';
    const { username } = this.props;

    return (
      <ImageBackground
        style={styles.image}
        source={{ uri: remote }}
      >
        <View style={styles.container}>
          <Text style={styles.maintext}>Hey {username}!</Text>
          <Text style={styles.subtext}>Your Trips</Text>
          <Text style={styles.subtext}>Stars</Text>
          <Text style={styles.subtext}>Reviews</Text>
          <Text style={styles.actionText} onPress={() => Actions.trips()}>Let's go for a ride! (Tap!)</Text>
        </View>
        <Footer />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    flex: 1,
  },
  maintext: {
    fontFamily: 'Roboto',
    fontSize: 80,
    fontWeight: 'bold',
    margin: 5,
  },
  subtext: {
    fontSize: 30,
    margin: 8,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: 'purple',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  actionText: {
    fontSize: 20,
    marginTop: 20,
  },
  reset: {
    margin: 20,
  },
});

