import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { Actions } from "react-native-router-flux";

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={{marginheight: (deviceWidth-30)/3 , width: (deviceWidth-30)/3}} source={{uri: this.props.inventory.thumbnail}} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 19,
    // marginRight: 25
  },
 
});
module.exports = InventoryList;