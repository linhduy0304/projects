import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

var windowSize = Dimensions.get('window');

import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as searchActions from '../../actions/searchActions';

const actions = [
  searchActions
];

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class ModalSearchPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataFilter: [
        {
          id: 1,
          title: 'Bài viết',
          'type' : 'post'
        },
        {
          id: 2,
          title: 'Video',
          'type' : 'video'
        },
        {
          id: 3,
          title: 'Sự kiện',
          'type' : 'event'
        },
        {
          id: 5,
          title: 'Câu hỏi',
          'type' : 'g_question'
        },
        {
          id: 6,
          title: 'Review sản phẩm',
          'type' : 'g_review'
        },
        {
          id: 7,
          title: 'Mẹo',
          'type' : 'g_tips'
        }
      ]
    };
  }

  selectFilter(typeGourp, name) {
    this.props.close()
    this.props.setTitle(name)
    this.setState({active: name})
    this.props.actions.search(this.props.keyword, 'post', 'L', 1, typeGourp);
  }

  renderData() {
    return this.state.dataFilter.map((category, index) => {
      return <View key={category.id}>
                <TouchableOpacity style={styles.row} onPress={ () => this.selectFilter(category.type, category.title) } >
                  <Text style={this.props.active === category.title ? styles.selectActive : {} }>{category.title}</Text>
                </TouchableOpacity>
              </View>
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.renderData() }
        <TouchableOpacity style={styles.rowCancel} onPress={ () => this.props.close()} key='cancelCategory' ><Text style={{ color: '#FFF' }}>Bỏ chọn</Text></TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: windowSize.width,
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    height: 30,
    fontSize: 15,
    borderRadius: 7,
    marginBottom: 8,
    textAlign: 'center'
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  btnSumit: {
    backgroundColor: "#b92626",
    alignItems: 'center',
    width: windowSize.width,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    marginTop: 20
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    marginTop:20,
    padding: -1
  },
  text: {
    fontSize: 18,
    color: "#000000"
  },
  errors: {
    color: 'red',
    fontSize: 15,
    marginTop: 10
  },
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: windowSize.width
  },
  rowChild: {
    paddingLeft: 40
  },
  rowCancel: {
    height: 50,
    backgroundColor: '#f5a6a6',
    width: windowSize.width,
    justifyContent: 'center',
    // position: 'absolute',
    alignItems: 'center'
  },
  selectActive: {
    color: 'red'
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalSearchPost);