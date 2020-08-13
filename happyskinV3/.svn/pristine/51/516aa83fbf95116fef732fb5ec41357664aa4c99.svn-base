import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  Platform,
	FlatList,
	InteractionManager
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import {Actions} from "react-native-router-flux";
import ReviewRoutine from "../ReviewRoutine";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../../actions/routineActions';
const actions = [
  routineActions
];
function mapStateToProps(state) {
  return {
    routine: state.routine
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

class Suggest extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	suggest: [
       
      ],
    }
	}
	
	componentWillMount() {
    this.props.actions.routineRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routine('suggest');
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.routine('suggest');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.routine.loadMore) {
        return;
    }
    this.props.actions.routine('suggest','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.routine.loadMore) {
      return (<View style={{width: deviceWidth, marginTop:20,marginBottom: 10, alignItems: 'center'}}><Text>Loading</Text></View>)
    }
    if (this.props.routine.routineSuggest.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Bạn chưa tham gia liệu trình nào.</Text>
        </View>
      )
    }else return null;
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
      	<View style={styles.boxheader}>
      		<View style={styles.boxCategoryActive}>
      			<Text style={styles.txtCategoryActive}>Da dầu</Text>
      		</View>
      		<View style={styles.boxCategory}>
      			<Text style={styles.txtCategory}>Da khô</Text>
      		</View>
      		<View style={styles.boxCategoryActive}>
      			<Text style={styles.txtCategoryActive}>Da nhạy cảm</Text>
      		</View>
      		<View style={styles.boxCategoryActive}>
      			<Text style={styles.txtCategoryActive}>Lão hóa</Text>
      		</View>
      		<View style={styles.boxCategoryActive}>
      			<Text style={styles.txtCategoryActive}>Dưỡng trắng</Text>
      		</View>
      		<View style={styles.boxCategory}>
      			<Text style={styles.txtCategory}>Trị mụn</Text>
      		</View>
      		<View style={styles.boxCategoryActive}>
      			<Text style={styles.txtCategoryActive}>Trị thâm</Text>
      		</View>
      		<View style={styles.boxCategory}>
      			<Text style={styles.txtCategory}>Trị hôi chân</Text>
      		</View>
      		<View style={styles.boxCategory}>
      			<Text style={styles.txtCategory}>Da dầu</Text>
      		</View>
      	</View>
      	<View style={styles.boxInfo}>
      		<Text style={styles.txtCount}>Có {this.props.routine.routineSuggest.length} liệu trình</Text>
      		<Text style={styles.txtCount}>Sắp xếp nổi bật</Text>
      	</View>
    	</View>
    )
  }

	render() {
    return (
      <View style={styles.content}>
				 {
          this.props.routine.isFetching ?
						<View style={main.mainSpinTop}>
							<Image style={main.imgLoading} source={require('../../images/spinner.gif')} />
						</View>
          :
					<FlatList
						contentContainerStyle={styles.container}
						ListHeaderComponent={() => this._renderHeader()}
						data={this.props.routine.routineSuggest}
						renderItem={(data) => <ReviewRoutine routineSave={((id) => this.props.actions.routineSave(id))} fetchingLoad={this.props.routine.fetchingLoad} routineJoin={(id, image_thumb, title) => this.props.actions.routineJoin(id, image_thumb, title)} data = {data.item}/>}
						/> 
				 }
      </View>
    )
  }
}
let main = require('../../styles/Main');
const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	container: {
		paddingTop: 25,
	},
	header: {
		paddingRight: 15,
    paddingLeft: 15,
	},
	boxheader: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	boxCategoryActive: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#D73554',
		borderRadius: 16,
		marginRight: 15,
		marginBottom: 10
	},
	txtCategoryActive: {
		fontSize: 14,
		color: '#FFFFFF',
	},
	boxCategory: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 16,
		marginRight: 15,
		marginBottom: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#879BCE'
	},
	txtCategory: {
		fontSize: 14,
		color: '#879BCE',
	},
	boxInfo: {
		paddingTop: 5,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	txtCount: {
		fontSize: 14,
		color: '#333333',
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(Suggest);