import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class AddTrip extends Component {
    constructor(props){
      super(props);
      this.state={
          newTripDate: '',
          newTripOrigin: '',
          newTripDestination: '',
      }
    }

    onSubmitEditing = () => {
        const {newTripDate, newTripOrigin, newTripDestination} = this.state
        const {saveTripDate, saveTripOrigin, saveTripDestination} = this.props
    
        if(newTripDate) {
            console.log('state in submit',this.state.newTripDate)
            saveTripDate(this.state.newTripDate)
            this.setState({newTripDate: ''})
        }
        if(newTripOrigin) {
            saveTripOrigin(newTripOrigin)
            this.setState({newTripOrigin: ''})
        }
        if(newTripDestination) {
            saveTripDestination(newTripDestination)
            this.setState({newTripDestination: ''})
        }
      }


    render() {
    let {newTripDate, newTripOrigin, newTripDestination} = this.state
    let {saveTripDate} = this.props
    
    return (  
        <View>
            <Text style={styles.infotext}>Add a trip: </Text>
            <TextInput 
                style={styles.input} 
                value={newTripDate}
                placeholder={'Enter date of trip'}
                placeholderTextColor='purple'
                onChangeText={(newTripDate) =>{
                    console.log('newTripDAte', newTripDate)
                     this.setState({newTripDate})
                }}
                onSubmitEditing={this.onSubmitEditing}
            />
            <TextInput 
                style={styles.input} 
                value={newTripOrigin}
                placeholder={'Enter trip origin'}
                placeholderTextColor='purple'
                onChangeText={(newTripOrigin) => this.setState({newTripOrigin})}
                onSubmitEditing={this.onSubmitEditing}
            />
            <TextInput 
                style={styles.input} 
                value={newTripDestination}
                placeholder={'Enter trip destination'}
                placeholderTextColor='purple'
                onChangeText={(newTripDestination) => this.setState({newTripDestination})}
                onSubmitEditing={this.onSubmitEditing}
            />
            <Button
                onPress={() => Actions.refresh()}
                title='Add a trip'
                color="#841584"
                accessibilityLabel='Tap here to add a trip'
                style={styles.reset}
            />
        </View>
        )
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