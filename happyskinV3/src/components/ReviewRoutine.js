import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
	ScrollView,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Constant from '../services/Constant';

const StoreService = require('../services/StoreService').default;
import { Actions } from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
class ReviewRoutine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			loadJoin: false,
			loadSave: false,
    }
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.fetchingLoad) {
			this.setState({
				loadJoin: false,
				loadSave: false,
			})
		}
	}
	
	join() {
		this.setState({loadJoin: true})
		this.props.routineJoin(this.props.data.id, this.props.data.image_thumb, this.props.data.title)
	}

	save() {
		this.setState({loadSave: true})
		this.props.routineSave(this.props.data.id)
	}

	profile(id) {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(id == res.id) {
        Actions.profile()
      } else {
        Actions.coachProfile({id: id})
      }
    });
  }

  render(){
    return (
			<View style={styles.container}>
				<View style={styles.boxProduct}>
          <View style={styles.boxImage}>
            <TouchableOpacity onPress={() => Actions.routineDetail({id: this.props.data.id})} style={styles.boxImageProduct}>
              <Image source={{uri: this.props.data.image_thumb+'.png'}} style={styles.iconProduct} />
              <View style={styles.boxAvatar}>
                <Image source={this.props.data.author.avatar ? {uri: this.props.data.author.avatar+'.png'} : require('../images/avatar_happyskin.png')} style={styles.avatar} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxDetailProduct}>
            <Text style={styles.txtNameProduct} onPress={() => Actions.routineDetail({id: this.props.data.id})} numberOfLines={2}>{this.props.data.title}</Text>
            <View style={styles.boxRating}>
              <View style={styles.rating}>
                <StarRating
                  disabled={true}
                  emptyStar={require('../images/icons/ic_start_old.png')}
                  fullStar={require('../images/icons/ic_star_ok.png')}
                  halfStar={require('../images/icons/ic_star_half.png')}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  maxStars={5}
                  rating={this.props.data.raty_score}
                  starSize={13}
                  margin={2}
                  starStyle={{marginRight: 2}}
                />
              </View>
            </View>
            <View style={styles.hr}></View>
            <Text style={styles.boxAuthor}>bởi <Text onPress={() => this.profile(this.props.data.author.id)} style={styles.txtAuthor}>{this.props.data.author.full_name}</Text></Text>
            <Text style={styles.txtAuthor}>{this.props.data.count_users} người đã tham gia</Text>
            <View style={styles.boxButton}>
							{
								this.state.loadJoin ?
									<View style={{alignItems: 'center'}}>
										<Image style={{width: 75, height: 75,}} source={require('../images/spinner.gif')} />
									</View>
								:
									this.props.data.is_join == 1 ?
										<View  style={[styles.boxButtonJoin,{backgroundColor: '#446EB6'}]}>
											<Text style={styles.txtJoin}>Đã tham gia</Text>
										</View>
										:
										<TouchableOpacity onPress={() => this.join()} style={styles.boxButtonJoin}>
											<Text style={styles.txtJoin}>Tham gia ngay</Text>
										</TouchableOpacity>
							}
							{
								this.state.loadSave ?
									<View style={{alignItems: 'center'}}>
										<Image style={{width: 75, height: 75,}} source={require('../images/spinner.gif')} />
									</View>
								:
								
									this.props.data.is_save == 1 ?
										<TouchableOpacity onPress={() => this.save()}  style={styles.boxButtonSave}>
											<Text style={styles.icSave1}>Đã lưu</Text>
										</TouchableOpacity>
										:
										<TouchableOpacity onPress={() => this.save()} style={styles.boxButtonSave}>
											<Image source={require('../images/icons/ic_save_orange.png')} style={styles.icSave} />
										</TouchableOpacity>
							}
            </View>
          </View>
        </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
  },
  boxProduct: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: 2
	},
	boxImage: {
	    paddingRight: 15
	},
	boxImageProduct: {
	    width: 112,
	    height: 122,
	},
	iconProduct: {
	    width: 112,
	    height: 112,
	    borderRadius: 8,
	},
	boxAvatar: {
	    width: 40,
	    height: 40,
	    position: 'absolute',
	    bottom: 0,
	    right: 0
	},
	avatar: {
	    width: 40,
	    height: 40,
	    borderRadius: 20,
	    borderColor: '#FFFFFF',
	    borderWidth: 2,
	},
  boxDetailProduct: {
      flex: 1
  },
  txtNameProduct: {
      fontSize: 18,
      color: '#446EB6',
      paddingBottom: 7
  },
  txtActive: {
      fontSize: 15,
      color: '#333333'
  },
  boxRating: {
      paddingBottom: 10,
  },
  rating: {
      alignItems: "flex-start",
      flexDirection: 'row'
  },
  hr: {
      backgroundColor: '#ECEEF0',
      height: 1,
      marginBottom: 10
  },
  boxAuthor: {
      fontSize: 14,
      color: '#8A8A8F',
      paddingBottom: 3
  },
  txtAuthor: {
      fontSize: 14,
      color: '#333333'
  },
  boxButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20
  },
  boxButtonJoin: {
      height: 32,
      backgroundColor: '#FE7535',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4
  },
  txtJoin: {
      color: '#FFFFFF',
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 20,
  },
  boxButtonSave: {
      borderRadius: 4,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#FFEEDA'
	},
	icSave1: {
		marginLeft: 10,
		marginRight: 10,
		color: '#446EB6',
},
  icSave: {
      width: 15,
      height: 22,
      marginLeft: 10,
      marginRight: 10,
  },
    
});
module.exports = ReviewRoutine;