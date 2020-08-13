/**
 * Created by Mrbacdoan on 04/08/2016.
 */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  Platform,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from "react-native-button";
import Toast from 'react-native-simple-toast';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
class ModalSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    };
  }

  searchSubmit() {
    if(this.state.search == '') {
      Toast.show('Bạn phải nhập từ khóa để tìm kiếm');
      return ;
    } 
    setTimeout(() => {
      this.props.closeModal()
    }, 500)
    Actions.search({keyword: this.state.search});
    
  }


  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.icSearch} source={require('../images/icons/ic_search_small.png')} />
        <TextInput
          style={styles.input}
          placeholder="Nhập nội dung tìm kiếm"
          placeholderTextColor="#7f9ccd"
          value={this.state.search}
          underlineColorAndroid="transparent"
          onChangeText={(search) => this.setState({search: search})}
          onSubmitEditing={() => { this.searchSubmit() } }
          autoCapitalize="none"
          autoFocus={true}
          autoCorrect={false}
        />
        <TouchableOpacity style={{ padding: 10}} onPress={()=> this.props.closeModal()}>
          <Image style={styles.icClose} source={require('../images/icons/ic_close_black2.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icClose: {
    height: 14,
    width: 14
  },
  icSearch: {
    height: 20,
    width: 20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15, 
    paddingRight: 15,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  input: {
    flex: 1
  },
});
module.exports = ModalSearch;
