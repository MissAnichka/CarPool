import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking } from 'react-native';
import Footer from './Footer';

export default class Trips extends Component {
  constructor(props){
    super(props);
    this.state={
      origin: '',
      destination: '',
      date: '',
      allTrips: []
    }
  }

  onPressFindRide(){
    return Linking.openURL('https://www.google.com'); 
  }

  render() {
    const remote = 'https://static.pexels.com/photos/297755/pexels-photo-297755.jpeg';
    const resizeMode = 'center';
    return (
        <Image 
        style={styles.image}
        source={{ uri: remote }}
        >
          <View style={styles.container}>
            <Text style={styles.maintext}>Trips</Text>
            <Text style={styles.subtext}>Search by City/State: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(searchCityState) => this.setState({searchCityState})}
              value={this.state.searchCityState}
              placeholder='Enter City or State'
            />
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
    fontSize: 50,
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

// USE GOOGLE'S API / MAPBOX TO GET TRIPS TO MATCH UP
// trip = {
//     userid: number,
//     origin: address,
//     destination: address,
//     travelDate: date,
//     recurring: boolean
// }