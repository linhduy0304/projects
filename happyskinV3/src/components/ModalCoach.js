import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  InteractionManager
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Spinner = require('react-native-spinkit');

import Button from "react-native-button";
import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as skinDiaryActions from '../actions/skinDiaryActions';
const actions = [
  skinDiaryActions
];
function mapStateToProps(state) {
  return {
    skinDiary: state.skinDiary,
    profile: state.profile
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

class ModalCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.props.actions.coach();
  }

  // componentDidMount() {
  //   timeout = setTimeout( () => {
  //   }, 12000);
  //   InteractionManager.runAfterInteractions(()=> {
  //     this.props.actions.coach();
  //   })
  // }

  send(coach_id) {
    var body = {
      coach_id: coach_id,
      full_name: this.props.profile.currentUser.full_name,
      avatar: this.props.profile.currentUser.avatar
    };
    this.props.actions.send(this.props.id, body)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.skinDiary != this.props.skinDiary) {
      if(nextProps.skinDiary.closeModal) {
        this.props.closeModal()
      }
    }
  }

  render(){
    return (
      <View style={styles.ctModal}>
        {
           this.props.skinDiary.fetchingModal ?
            <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
              <Image style={{height: 75, width: 75}} source={require('../images/spinner.gif')} />
            </View>
            :
        
        <ScrollView style={{paddingTop: 15}}>
          {
            this.props.skinDiary.coach ? 
              this.props.skinDiary.coach.length == 0 ?
                <View>
                  <Text>Hiện tại chưa có coach nào</Text>
                </View>
              : 
              this.props.skinDiary.coach.map((item, index) => {
                return (
                  <View key={index} style={styles.ctItem}>
                    <Image style={styles.avatar} source={{uri: item.coach.avatar +'_100x100.png'}} />
                    <View style={{flex: 1, marginLeft: 10}}>
                      <Text style={styles.txtName}>{item.coach.full_name}</Text>
                      <Text style={styles.txtJob}>{item.coach.coach_name}</Text>
                    </View>
                    <View>
                    <TouchableOpacity onPress={() => this.send(item.coach.id)} style={styles.ctSend}>
                      <Text style={styles.txtSend}>Gửi</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            : null
          }
        </ScrollView>
        }
      </View>
    )
  }
}
let main = require('../styles/Main');
const styles = StyleSheet.create({
  txtSend: {
    color: '#fff'
  },
  ctSend: {
    backgroundColor: 'rgb(254, 117, 53)',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  txtJob: {
    color: 'rgb(138, 138, 143)',
    marginTop: 5
  },
  txtName: {
    fontSize: 16,
    color: 'rgb(68, 110, 182)'
  },
  ctModal: {
    flex: 1
  },
  avatar: {
    height: 50, 
    width: 50,
    borderRadius: 25
  },
  ctItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
});
export default connect(mapStateToProps, mapDispatchToProps) (ModalCoach)