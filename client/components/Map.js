import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
// const mapboxgl = require("mapbox-gl");
// import { MapboxGLMap } from 'react-native-mapbox-gl';

// mapboxgl.accessToken = "pk.eyJ1IjoibWlzc2FuaWNoa2EiLCJhIjoiY2o4YnNpODV1MDFhczJ3cG0wNWRpcmtpdyJ9.vdrU_rE5GS8Gh5mMdH1MhQ";

// const newMap = new mapboxgl.Map({
//     container: "map",
//     center: [-74.009, 40.705], // FullStack coordinates
//     zoom: 10,
//     style: "mapbox://styles/mapbox/streets-v10"
//   });

module.exports = function Map(){
    return(
        <View>
            <Text>Trips Map</Text>
            <View id='map'>
            </View>
        </View>
    )
}

// var map = React.createClass({  
//     getInitialState: function() {
//       return {
//         mapLocation: {
//           latitude: 0,
//           longitude: 0
//          },
//          center: {
//            latitude: 40.72345355209305,
//            longitude: -73.99343490600586
//          },
//          annotations: [{
//            latitude: 40.72052634,
//            longitude:  -73.97686958312988,
//            title: 'This is marker 1',
//            subtitle: 'Hi mom!'
//          },{
//            latitude: 40.714541341726175,
//            longitude:  -74.00579452514648,
//            title: 'This is marker 2',
//            subtitle: 'Neat, this is a subtitle'
//          }],
//          zoom: 12,
//          direction: 0
//        }
//     },
//     onChange: function(e) {
//       this.setState({ mapLocation: e });
//     },
//     onOpenAnnotation: function(annotation) {
//       console.log(annotation)
//     },
//     onUpdateUserLocation: function(location) {
//       console.log(location)
//     },
//     render: function() {
//       return (
//         <View style={styles.container}>
//           <MapboxGLMap
//             style={styles.map}
//             rotateEnabled={true}
//             showsUserLocation={true}
//             accessToken={'your-mapbox.com-access-token'}
//             styleURL={'asset://styles/mapbox-streets-v7.json'}
//             centerCoordinate={this.state.center}
//             userLocationVisible={true}
//             zoomLevel={this.state.zoom}
//             debugActive={false}
//             direction={this.state.direction}
//             annotations={this.state.annotations}
//             onRegionChange={this.onChange}
//             onOpenAnnotation={this.onOpenAnnotation}
//             onUpdateUserLocation={this.onUpdateUserLocation}/>
//           <View style={styles.text}>
//             <Text>Latitude: {this.state.mapLocation.latitude}</Text>
//             <Text>Longitude: {this.state.mapLocation.longitude}</Text>
//             <Text>zoom level: {this.state.mapLocation.zoom}</Text>
//           </View>
//         </View>
//       );
//     }
//   });
  
//   var styles = StyleSheet.create({  
//     container: {
//       flexDirection: 'column',
//       flex: 1
//     },
//     map: {
//       flex:5,
//     },
//     text: {
//       padding: 20
//     }
//   });

// module.exports = map