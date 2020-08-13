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
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import MapView, {Marker, Polyline  } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Search from './components/Search';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      type: null,
      show: null,
      origin: {latitude: 21.004685, longitude: 105.822048},
      coordinates: [],
      destination: {latitude: 20.986724, longitude: 105.813699},
      // coordinates: [
      //   {latitude: 21.004685, longitude: 105.822048},
      //   {latitude: 20.986724, longitude: 105.813699}
      // ],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  componentWillMount() {
    var a = this.aaa('}nd_CutzdSXNZRlC~Bx@p@~BhBjD|Bb@XbC|ARJbClAh@VXNn@Xx@RtAXhB\\~AV')
    this.setState({
      coordinates: a
    })
  }

  aaa(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
			a = null, h = 0, i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
		}
    console.log(d)
		return d = d.map(function(t) {
			return {
				latitude: t[0],
				longitude: t[1],
			};
		});
  }

  detail(data) {
    if(this.state.type === 0) {
      this.refs.search.setState({
        start: data.description
      })
    }else {
      this.refs.search.setState({
        end: data.description
      })
    }
   
    // this.refs.search.props.setText(this.state.type, data.description)
    this.setState({
      show: null
    })

    var promise = new Promise(function(resolve, reject) {
      resolve(fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+data.place_id +'&key=AIzaSyDxABotBbmpAbECL8I9DvxPXiBJ9U9Ezto', {
        method: 'GET',
      })
      .then(response => {return response.json();})
      
      .catch(function(error) {
        return {
          status: 500
        }
      }));
    })
    
    promise.then(data => {
      if(this.state.type === 0) {
        this.setState({
          origin: {
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng
          }
        })
      }else {
        this.setState({
          destination: {
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng
          }
        })
      }
     
    })
  }

  setData(data, type) {
    this.setState({
      show: true,
      data,
      type
    })
  }


  render() {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDxABotBbmpAbECL8I9DvxPXiBJ9U9Ezto';
    return (
      <View style={styles.container}>
        <MapView
          style={ styles.map }
          zoomEnabled = {true}
          showsUserLocation={true}
          mapType={'terrain'}
          zoomControlEnabled={false}
          initialRegion={{
            latitude: 20.986854,
            longitude: 105.814550,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        >
        <Polyline
		coordinates={this.state.coordinates}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
          {
            this.state.origin ?
            <Marker 
            // image={require('./icons/ic_marker.png')}
            coordinate={this.state.origin}
            title={'dddd'}
          />
          :null
          }
          {
            this.state.destination ?
          
          <Marker 
            // image={require('./icons/ic_marker.png')}
            coordinate={this.state.destination}
            title={'dddd'}
          />
          : null }
          <MapViewDirections
            origin={this.state.origin}
            destination={this.state.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            onReady={(distance, duration) => console.log(distance, duration)}
            strokeColor="blue"
          />
        </MapView>
        <Search 
          ref="search" 
          setData={(data, type) => this.setData(data, type)} 
        />
        {
          this.state.show ? 
          <View style={styles.ctResult}>
            {
              this.state.data ?
                this.state.data.map((item, index) => {
                  
                  return (
                    <TouchableOpacity onPress={() => this.detail(item)} style={styles.ctItem} key={index}>
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  )
                })
              : null
            }
          </View>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    padding: 6,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  ctResult: {
    backgroundColor: '#fff',
    // width: screen.width,
    borderRadius: 5,
    margin: 15,
    marginTop: 0
  },
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
