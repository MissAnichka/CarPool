import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking, KeyboardAvoidingView } from 'react-native';
import {Actions } from 'react-native-router-flux';

import Footer from './Footer';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      origin: '',
      destination: '',
      date: ''
    }
  }

  render() {
    const remote = 'https://static.pexels.com/photos/465445/pexels-photo-465445.jpeg';
    const resizeMode = 'center';
    const {origin} = this.state
    const {destination} = this.state
    const {date} = this.state
    
    return (
        <Image 
        style={styles.image}
        source={{ uri: remote }}
        >
          <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            >
            <Text style={styles.maintext}>CarPool</Text>
            <Text style={styles.subtext}>Where ya goin?</Text>
            <TextInput
              style={styles.input}
              onChangeText={(origin) => this.setState({origin})}
              value={origin}
              placeholder='Start Point'
              placeholderTextColor='purple'
            />
            <TextInput
              style={styles.input}
              onChangeText={(destination) => this.setState({destination})}
              value={destination}
              placeholder='End Point'
              placeholderTextColor='purple'
            />
            <TextInput
              style={styles.input}
              onChangeText={(date) => this.setState({date})}
              value={date}
              placeholder='mm/dd/yy'
              placeholderTextColor='purple'
            />
            <Button
              onPress={() => Actions.trips({origin, destination, date})}
              title='Find a ride'
              color="#841584"
              accessibilityLabel='Tap here to find a ride'
              style={styles.reset}
            />
            <Text style={styles.actionText} onPress={() => Actions.trips()}>View All Trips</Text>
          </KeyboardAvoidingView>
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

