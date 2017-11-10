import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking } from 'react-native';
import {Actions } from 'react-native-router-flux';

import Footer from './Footer';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      tripStart: '',
      tripEnd: ''
    }
  }

  render() {
    const remote = 'https://static.pexels.com/photos/465445/pexels-photo-465445.jpeg';
    const resizeMode = 'center';
    return (
        <Image 
        style={styles.image}
        source={{ uri: remote }}
        >
          <View style={styles.container}>
            <Text style={styles.maintext}>CarPool</Text>
            <Text style={styles.subtext}>Where ya goin?</Text>
            <TextInput
              style={styles.input}
              onChangeText={(tripStart) => this.setState({tripStart})}
              value={this.state.tripStart}
              placeholder='Start Point'
            />
            <TextInput
              style={styles.input}
              onChangeText={(tripEnd) => this.setState({tripEnd})}
              value={this.state.tripEnd}
              placeholder='End Point'
            />
            <Button
              onPress={() => Actions.trips()}
              title='Find a ride'
              color="#841584"
              accessibilityLabel='Tap here to find a ride'
              style={styles.reset}
            />
            <Text style={styles.actionText} onPress={() => Actions.trips()}>View All Trips</Text>
          </View>
          <Footer />
        </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
  },
  actionText: {
    fontSize: 20,
  },
  reset: {
    margin: 5,
  },
});

