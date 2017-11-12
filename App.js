import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Linking } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Home from './client/components/Home.js';
import Footer from './client/components/Footer.js';
import Login from './client/components/Login.js';
import Profile from './client/components/Profile.js';
import Trips from './client/components/Trips.js';
import Map from './client/components/Map.js';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="home" component={Home}/>
          <Scene key="trips" component={Trips}/>
          <Scene key="login" component={Login}/>
          <Scene key="profile" component={Profile}/>
          <Scene key="map" component={Map}/>
        </Scene>
      </Router>
    );
  }
}
