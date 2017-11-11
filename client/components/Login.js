import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking, AsyncStorage } from 'react-native';

const USERNAME = 'USERNAME'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            name: 'Guest',
            text: ''
        }
  }

  componentWillMount(){
      this.load()
  }

  load = async() => {
      try{
          const name = await AsyncStorage.getItem(USERNAME)
          if(name){
              this.setState({name})
          }
      } catch(error){
          console.error('Couldnt get name')
      }
  }

  save = async(name) => {
      try{
          await AsyncStorage.setItem(USERNAME, name)
          this.setState({name})
      } catch(error){
          console.error('nope did not save')
      }
  }

  onChangeText = (text) => this.setState({text, name: text})

  onSubmitEditing = () => {
      const {text} = this.state
      if(!text) return
      this.save(text)
      this.setState({text: ''})
  }

  render() {
    const {name} = this.state
    const {text} = this.state
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                value={text}
                placeholder={'Enter your name here'}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEditing}
            />
            <Text style={styles.subtext}> Welcome to CarPool {name}!</Text>
        </View>
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