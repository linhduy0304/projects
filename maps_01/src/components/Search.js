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
  Dimensions,
  TextInput,
  Button
} from 'react-native';
const screen = Dimensions.get('window');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
    }
  }

  onChangeText(text, type) {
    if(type === 0) {
      this.setState({start: text})
    }else {
      this.setState({end: text})
    }
    var promise = new Promise(function(resolve, reject) {
      resolve(fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDxABotBbmpAbECL8I9DvxPXiBJ9U9Ezto&input='+text, {
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
      console.log(data)
      this.props.setData(data.predictions, type)})
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder = 'Nơi xuất phát'
          value = {this.state.start}
          placeholderTextColor= {'#dbdde0'}
          onChangeText={text => this.onChangeText(text, 0)}
          underlineColorAndroid = 'transparent'
        />
         <TextInput
          placeholder= 'Nơi đến'
          value = {this.state.end}
          onChangeText={text => this.onChangeText(text, 1)}
          underlineColorAndroid = 'transparent'
          placeholderTextColor='#dbdde0'
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#71a9fc',
    // width: screen.width,
    borderRadius: 5,
    margin: 15
  },

});

export default Search
