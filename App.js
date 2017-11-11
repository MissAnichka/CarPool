import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Home from './client/components/Home.js';
import Footer from './client/components/Footer.js';
import Login from './client/components/Login.js';
// import Signup from './client/components/Signup.js';
import Trips from './client/components/Trips.js';
// import User from './client/components/User.js';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="home" component={Home}/>
          <Scene key="trips" component={Trips}/>
          <Scene key="login" component={Login}/>
        </Scene>
      </Router>
    );
  }
}

// <Scene key="signup" component={Signup} title="Signup"/>