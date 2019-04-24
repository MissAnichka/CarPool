import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Footer from './Footer';
import AddTrip from './AddTrip';

const USERNAME = 'USERNAME'
const TRIP = 'TRIP'

const ORIGIN = 'ORIGIN'
const DESTINATION = 'DESTINATION'
const TRIP_DATE = 'TRIP_DATE'

export default class Trips extends Component {
  constructor(props){
    super(props);
    this.state={
        newTripDate: '',
        newTripOrigin: '',
        newTripDestination: '',

        tripDate: '',
        tripOrigin: '',
        tripDestination: '',

        allTrips: ''
    }
    this.saveTripDate = this.saveTripDate.bind(this)
  }

  componentWillMount(){
    this.load()
  }

  load = async() => {
    try{
        const tripDate = await AsyncStorage.getItem(TRIP_DATE)
        const tripOrigin = await AsyncStorage.getItem(ORIGIN)
        const tripDestination = await AsyncStorage.getItem(DESTINATION)
        if(tripDate && tripOrigin && tripDestination){
            this.setState({tripDate, tripOrigin, tripDestination})
        }
    } catch(error){
        console.error(`Couldnt get it ${error}`)
    }
  }

saveTripDate = async(tripDate) => {
    try{
        tripDate = tripDate.toString()
        console.log('saving tripdate', tripDate)
        await AsyncStorage.setItem(TRIP_DATE, tripDate)
        this.setState({tripDate})
    } catch(error){
        console.error('nope did not save date')
    }
}

saveTripOrigin = async(tripOrigin) => {
    try{
        tripOrigin = tripOrigin.toString()
        await AsyncStorage.setItem(ORIGIN, tripOrigin)
        this.setState({tripOrigin})
    } catch(error){
        console.error('nope did not save origin')
    }
}

saveTripDestination = async(tripDestination) => {
    try{
        tripDestination = tripDestination.toString()
        await AsyncStorage.setItem(DESTINATION, tripDestination)
        this.setState({tripDestination})
    } catch(error){
        console.error('nope did not save destination')
    }
}

editTrip(){
    console.log('I do nothing yet')
}
  render() {
    const remote = 'https://cdn2.hercampus.com/rsz_pexels-photo-297755.jpg';
    const resizeMode = 'center';
    const {origin, destination, date} = this.props
    let {tripDate, tripOrigin, tripDestination} = this.state

    console.log('tripDate', tripDate)
    return (
        <ImageBackground 
        style={styles.image}
        source={{ uri: remote }}
        >
          <View style={styles.container}>
            <Text style={styles.maintext}>Trips</Text>
            <AddTrip 
                saveTripDate={this.saveTripDate}
                saveTripOrigin={this.saveTripOrigin}
                saveTripDestination={this.saveTripDestination}                
            />
            {
                (origin || destination || date) ? 
                <Text style={styles.infotext}>Leaving from {origin}, heading to {destination}, on {date}: </Text>
                :
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.infotext}>Filter by City/State: </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={(searchCityState) => this.setState({searchCityState})}
                    value={this.state.searchCityState}
                    placeholder='Enter City or State'
                    />
                </View>
            }
            <Text onPress={() => Actions.map()}>Tap for map</Text>
            {
                tripDate ?
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.infotext}>Traveling on {tripDate} from {tripOrigin} to {tripDestination}</Text>
                    <Button
                        onPress={this.editTrip}
                        title='Edit trip'
                        color="#841584"
                        accessibilityLabel='Tap here to edit your trip'
                        style={styles.reset}
                    />
                </View>
                : null
            }
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
  infotext: {
    fontSize: 20,
    margin: 10,
    padding: 10,
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



// <KeyboardAvoidingView
//     style={styles.reset}
//     behavior="padding"
// >
// </KeyboardAvoidingView>


// USE MAPBOX TO GET TRIPS TO MATCH UP
// trip = {
//     userid: number,
//     origin: address,
//     destination: address,
//     travelDate: date,
//     recurring: boolean
// }