import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Router, Scene } from 'react-native-router-flux';

import Home from './client/components/Home.js';
import Footer from './client/components/Footer.js';
import Login from './client/components/Login.js';
import Profile from './client/components/Profile.js';
import Trips from './client/components/Trips.js';
import Maps from './client/components/Maps.js';


export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="home" component={Home} />
            <Scene key="trips" component={Trips} />
            <Scene key="login" component={Login} />
            <Scene key="profile" component={Profile} />
            <Scene key="maps" component={Maps} />
          </Scene>
        </Router>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'Roboto': require('./assets/font/Roboto-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}