

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HeaderItemLeft from './HeaderItemLeft';
import Item from './Item';
import { Actions } from 'react-native-router-flux';

class Brand extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      header: {
        name: 'Giá sốc'
      },
      data: [],
    }
  }

  componentWillMount = () => {
    this.props.getHome('listSale')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.sale) {
      this.setState({data: nextProps.home.sale})
    }
  };

    render() {
        const {header, data} = this.state;
        return(
        data.length == 0 ? null :
        <View style={css.ct}>
            <HeaderItemLeft
            data={header}
            onPress={() => Actions.category({title: 'GIÁ SỐC', action: 'listSale'})}
            />
            {
            this.props.home.loadProvider ?
                <Loading />
            : 
            <View style={css.ctList}>
                {
                    data ?
                        data.map((item, index) => {
                                return <Item type={'sale'} data={item} key={index}/>
                        })
                    : null
                }
            </View>
            }
            
        </View>
        )
    }
}

const css = StyleSheet.create({
  ct: {
    marginTop: 10
  },
  ctList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
