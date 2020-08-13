import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxAction from '../components/directives/BoxAction';
import HTMLView from "react-native-htmlview";
//import Icon from 'react-native-vector-icons/FontAwesome';
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');

// import {
//     LazyloadScrollView,
//     LazyloadView,
//     LazyloadImage,
//     LazyloadListView
// } from 'react-native-lazyload';

let deviceWidth = Dimensions.get('window').width;

class BoxHotDebate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false,
      dataGuest: this.props.post.users
    };
  }

  viewDetail(id, title) {
    Actions.hotDebateDetail({id: id, title: title});
  }

  viewProfile(id) {
    Actions.otherProfile({id: id})
  }

  getStatus() {
    var status = this.props.post.status;
    if (status == 1) {
      return 'Đang diễn ra';
    } else if (status == 2) {
      return 'Sắp diễn ra';
    } else {
      return 'Đã kết thúc';
    }
  }
  render(){
    var _this=this
    return (
      <ScrollView style = {styles.boxNewsHaveThumb}>
        <View style={styles.infoNews}>
          <TouchableOpacity style={{flex: 1}}>
            <Text style={styles.infoNewsGroup}>Hot Debate</Text>
          </TouchableOpacity>
          <View style={styles.containerActive}>
            <Text style={styles.txtActive}>{this.getStatus()}</Text>
            <Image source={require('../images/icons/ic_point.png')}/>
          </View>
        </View>
        <Text style={styles.txtUser}>HappySkin<Text style={{color: '#6d6f73'}}> đã đăng một Hot Debate</Text></Text>
        <TouchableOpacity style={styles.txtTitle} onPress={ () => this.viewDetail(this.props.post.id, this.props.post.title) }>
          <Text style={{color: '#d73554', fontSize: 16}}>{this.props.post.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.viewDetail(this.props.post.id, this.props.post.title) }>
          <Image style={styles.newsThumb} source={{uri: this.props.post.image_thumb+'_820x312.png'}}/>
        </TouchableOpacity>
        <Text style={{marginTop: 10,color: '#5a5e6f'}}>Khách mời</Text>
        <View style={styles.listGuest}>
          <ScrollView
              horizontal={true}
              showsVerticalScrollIndicator={false}
            >
          {_this.state.dataGuest.map((item, index)=> {
            return <View style={styles.itemListGuest} key={index}>
              <TouchableOpacity onPress={()=> this.viewProfile(item.id)}>
                <Image style={styles.avatarGuest} source={{uri: item.avatar+'_100x100.png'}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.viewProfile(item.id)}>
                <Text style={styles.nameGuest}>{item.full_name}</Text>
              </TouchableOpacity>
          </View>
          })}
          </ScrollView>
        </View>
        <Text numberOfLines={5} style={styles.contentColor}>
          <HTMLView value={this.props.post.short_content}/>
        </Text>
        {
          // <View style={styles.containerMember}>
          //   <View style={styles.containerCount}>
          //     <Text>{this.props.post.total_user_join}</Text>
          //   </View>
          //   <Text>thành viên đang tham gia</Text>
          // </View>
        }
        <BoxAction like={this.props.post.count_like} comment={this.props.post.count_comment} isLike={this.props.post.is_like_by_current_id} itemId={this.props.post.id} itemType={this.props.post.type} itemFeedType={(this.props.post.feedtype) ? this.props.post.feedtype : null} itemTitle={this.props.post.title} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    flex: 1,
    marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderBottomWidth: 15,
  },
  containerActive: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtTitle: {
    marginBottom: 8
  },
  txtActive: {
    marginRight: 15,
  },
  txtUser: {
    color: '#2e313c',
    marginTop: 8,
    marginBottom: 8
  },
  listGuest: {
    alignItems: 'center'
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  itemListGuest: {
    marginTop: 10,
    paddingBottom: 7,
    width: deviceWidth/3-20,
    alignItems: 'center'
  },
  containerMember: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  containerCount: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#de8a60',
    borderRadius: 15,
    marginRight: 10,
  },
  avatarGuest: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userNameGuest: {
    color: '#4a4a4a'
  },
  nameGuest: {
    fontSize: 13,
    color: '#4a90e2'
  },
  newsThumb: {
    width: deviceWidth - 30,
    height: (deviceWidth - 30)*312/820,
    // resizeMode: 'contain'
  },
  infoNews: {
    // height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoNewsGroup: {
    fontSize: 16,
    color: '#577dbd',
  },
  contentColor: {
    marginTop: 15,
    color: '#5a5e6f'
  },
});

module.exports = BoxHotDebate;