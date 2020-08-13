/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import MapView, {Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [
        {latitude: 21.004685, longitude: 105.822048},
        {latitude: 20.986724, longitude: 105.813699}
      ],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }


  render() {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDxABotBbmpAbECL8I9DvxPXiBJ9U9Ezto';
    return (
      <View style={styles.container}>
        
        <MapView
          style={ styles.map }
          zoomEnabled = {true}
          zoomControlEnabled={false}
          initialRegion={{
            latitude: 20.986854,
            longitude: 105.814550,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        >
          
          {
            this.state.coordinates.map((item, index) => {
              return (
                <Marker 
                  key={index}
                    coordinate={item}
                    title={'dddd'}
                    />
                )
            })
          }
          <MapViewDirections
            origin={this.state.coordinates[0]}
            destination={this.state.coordinates[1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="blue"
          />
        </MapView>
        <View style={{backgroundColor: 'rgba(0,0,0, 0.6)', top: 0, height: 100,width: 100,}}>
          <Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
