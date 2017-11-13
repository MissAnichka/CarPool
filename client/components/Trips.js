import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Footer from './Footer';

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

  //trying to save a whole trip, not working...
//   saveTrip = async(newTrip) => {
//         try{
//             await AsyncStorage.setItem(TRIP, newTrip)
//             this.setState({allTrips: newTrip})
//         } catch(error){
//             console.error('nope did not save trip')
//         }
//   }

saveTripDate = async(tripDate) => {
    try{
        tripDate = tripDate.toString()
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

//   onChangeNewTripDate = (newTripDate) => this.setState({newTripDate})
//   onChangeNewTripOrigin = (newTripOrigin) => this.setState({newTripOrigin})
//   onChangeNewTripDestination = (newTripDestination) => this.setState({newTripDestination})

  newTripSubmit = () => {
    let {newTripDate, newTripOrigin, newTripDestination} = this.state

    if(!newTripDate || !newTripOrigin || !newTripDestination) return

    if(newTripDate) {
        this.saveTripDate(newTripDate)
        this.setState({newTripDate: ''})
    }
    if(newTripOrigin) {
        this.saveTripDate(newTripOrigin)
        this.setState({newTripOrigin: ''})
    }
    if(newTripDestination) {
        this.saveTripDate(newTripDestination)
        this.setState({newTripDestination: ''})
    }
  }

  render() {
    const remote = 'https://cdn2.hercampus.com/rsz_pexels-photo-297755.jpg';
    const resizeMode = 'center';
    const {origin, destination, date} = this.props
    let {tripDate, tripOrigin, tripDestination} = this.state
    // let {newTripDate, newTripOrigin, newTripDestination} = this.state

    return (
        <Image 
        style={styles.image}
        source={{ uri: remote }}
        >
          <View style={styles.container}>
            <Text style={styles.maintext}>Trips</Text>
            <Text style={styles.infotext}>Add a trip: </Text>
            <TextInput 
                style={styles.input} 
                // value={newTripDate}
                placeholder={'Enter date of trip'}
                placeholderTextColor='purple'
                onChange={(newTripDate) => this.setState({newTripDate})}
                onSubmitEditing={this.newTripSubmit}
            />
            <TextInput 
                style={styles.input} 
                // value={newTripOrigin}
                placeholder={'Enter trip origin'}
                placeholderTextColor='purple'
                onChange={(newTripOrigin) => this.setState({newTripOrigin})}
                onSubmitEditing={this.newTripSubmit}
            />
            <TextInput 
                style={styles.input} 
                // value={newTripDestination}
                placeholder={'Enter trip destination'}
                placeholderTextColor='purple'
                onChange={(newTripDestination) => this.setState({newTripDestination})}
                onSubmitEditing={this.newTripSubmit}
            />
            <Button
                onPress={this.newTripSubmit}
                title='Add a trip'
                color="#841584"
                accessibilityLabel='Tap here to add a trip'
                style={styles.reset}
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
                tripDate && tripOrigin && tripDestination ?
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.infotext}>Traveling on {tripDate} from {tripOrigin} to {tripDestination}</Text>
                    <Button
                        onPress={this.newTripSubmit}
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