import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {Actions } from 'react-native-router-flux';

const USERNAME = 'USERNAME'

export default class Footer extends Component {
    constructor(props){
      super(props);
      this.state={
        name: ''
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
           console.error(`Couldnt get it ${error}`)
        }
    }

    logout = async() => {
        try{
            const {name} = this.state
            await AsyncStorage.removeItem(USERNAME)
            this.setState({name: ''})
        } catch (error){
            console.error(`Couldnt remove it ${error}`)
        }
    }

    render(){
        const {name} = this.state
        return(
            <View>
                {
                    !!name ? 
                    <View style={styles.footer}>
                        <Text style={styles.footerText} onPress={() => Actions.profile()}>Profile</Text>
                        <Text style={styles.footerText} onPress={this.logout}>Logout</Text>
                    </View>
                    :
                    <View style={styles.footer}>
                        <Text style={styles.footerText} onPress={() => Actions.login()}>Login</Text>
                        <Text style={styles.footerText} onPress={() => Actions.login()}>Signup</Text>
                    </View>
                }
            </View>
        )
    }
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