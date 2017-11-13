import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

module.exports = class Map extends React.Component {
  render() {

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 40.7045809,
            longitude: -74.0111834,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 40.7045809,
            longitude: -74.0111834}}
            title={"car"}
            description={"ride"}
            image={{uri: 'https://stickeroid.com/uploads/pic/thumb/stickeroid_59944a62016c9.png'}}
        />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 740,
      width: 420,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
