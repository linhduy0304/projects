import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxSkinCare from './magazine/BoxSkinCare';
import BoxHotDebate from './magazine/BoxHotDebate';
import BoxVideo from './magazine/BoxVideo';
import BoxReview from './magazine/BoxReview';

class BoxFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  renderBox() {
    
    switch(this.props.data.type){
      case 'post':
        return <BoxSkinCare post={this.props.data}/>;
      case 'hotdebate':
        return <BoxHotDebate post={this.props.data}/>;
      case 'product':
        return <BoxReview data = {this.props.data} />;
      case 'video':
        return <BoxVideo post={this.props.data} />;
    }
  }

  render(){
    return (
      <View>
         { this.renderBox() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
module.exports = BoxFeed;
