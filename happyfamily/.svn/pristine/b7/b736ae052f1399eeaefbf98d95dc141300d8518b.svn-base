

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
} from "react-native";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

let css = require('../Css');

class ModalSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    };
  }

  search() {
    dismissKeyboard()
    if(this.state.keyword == '') {
      return ;
    }
    // Actions.search({keyword: this.state.keyword})
    timeout = setTimeout( () => {
      this.props.closeModal();
      Actions.search({keyword: this.state.keyword})
    }, 200);
    // Actions.search({keyword: this.state.keyword})
    
  }

  render(){
    return (
        <View style={css.ctSearch}>
          <Image style={styles.icSearch} source={require('../images/icons/ic_search_blue.png')} />
          <TextInput
            style={styles.input}
            placeholder="Gõ nội dung tìm kiếm"
            placeholderTextColor="rgb(194, 197, 208)"
            value={this.state.keyword}
            underlineColorAndroid="transparent"
            onChangeText={(keyword) => this.setState({keyword: keyword})}
            onSubmitEditing={() =>  this.search()}
            autoCapitalize="none"
            autoFocus={true}
          />
          <TouchableOpacity style={{ padding: 15}} onPress={()=> this.props.closeModal()}>
            <Image source={require('../images/icons/ic_close_black.png')} />
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  icSearch: {
    marginRight: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15, 
    paddingRight: 15,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  input: {
    flex: 1
  },
});
export default(ModalSearch);
