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

class RoutineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <TouchableOpacity onPress={() => Actions.routineDetail({id: this.props.routine.routine.id})} style={styles.boxProduct}>
        <View style={styles.boxImageProduct}>
          <Image source={{uri: this.props.routine.routine.image+'_100x100.png'}} style={styles.iconProduct} />
        </View>
        <View style={styles.boxDetailProduct}>
          <Text style={styles.txtNameProduct}>{this.props.routine.routine.title}</Text>
          <Text style={styles.txtDone}>{'12 ngày còn lại'.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  boxProduct: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E8F1F9',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 17,
    // alignItems: 'center',
  },
  boxImageProduct: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 84,
    height: 84,
    marginRight: 20,
  },
  iconProduct: {
    width: 84,
    height: 84,
  },
  boxDetailProduct: {
    flex: 1
  },
  txtNameProduct: {
    fontSize: 24,
    color: '#333333',
    paddingBottom: 10
  },
  txtActive: {
    fontSize: 15,
    color: '#333333'
  },
});
module.exports = RoutineList;