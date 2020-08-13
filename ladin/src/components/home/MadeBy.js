import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { screen, ClTxtGrey, countries, url } from '../../config/Constant';
import HeaderItemLeft from './HeaderItemLeft';
import { Actions } from 'react-native-router-flux';

const width = screen.width/4;
class MadeBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount = () => {
    this.props.getHome('madeBy')
  };

  compare = (a, b) => {
    if (a.position > b.position) {
        return 1;
    }
    if (a.position < b.position) {
        return -1;
    }
    return 0;
};

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.madeBy) {
      var a = nextProps.home.madeBy.sort(this.compare);
      this.setState({data: a})
    }
  };

  render() {
    const {data} = this.state
    return (
      <View style={css.ct}>
        <HeaderItemLeft
          onPress={() => Actions.madeByMore({title: 'Xuất xứ'})}
          data={{
            name: 'XUẤT XỨ',
            type: 0,
          }}
        />
        <View style={css.ctList}>
        {
          data.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => Actions.productCategory({title: item.name,id: item.id, load: 'madeBy'})} key={index} style={css.ctItem}>
                <Image style={css.icon} source={{uri: `${url}${item.icon}`}} />
                <Text style={css.label}>{item.name}</Text>
              </TouchableOpacity>
            )
            
          })
        }
        </View>
        
      </View>
    );
  }
}

const css = StyleSheet.create({
  ct: {
    marginTop: 10
  },
  label: {
    textAlign: 'center',
    color: ClTxtGrey,
    fontSize: 12,
    marginTop: 10
  },
  ctItem: {
    width,
    alignItems: 'center',
    padding: 10,
  },
  ctList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  icon: {
    width: width-20,
    height: (width-20),
    borderRadius: 5,
  }
})

import {connect} from 'react-redux';
import {getHome, } from '../../actions/home';
import Loading from '../Loading';

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getHome: (action) => dispatch(getHome(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MadeBy);
