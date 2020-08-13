

import React, {Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import Search from './Search';
import ItemMenu from './ItemMenu';
import {countries} from '../../config/Constant'

class MadeBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMenu: this.props.arrCountry,
    };
  }

  add(data) {
    var a = this.state.arrMenu
    for(var i =0; i< a.length; i++) {
      if(a[i] === data.id) {
        a.splice(i, 1);
        this.setState({
          arrMenu: a
        });
        return;
      }
    }
    a.unshift(data.id);
    this.setState({
      arrMenu: a
    })
  }

  render() {
    const {arrMenu} = this.state;
    return (
      <View>
        {/* <Search /> */}
        <ScrollView>
          <View style={{marginTop: 10}}>
          {
            this.props.auth.countries.map((item, index) => {
              return <ItemMenu key={index} data={item} arrMenu={arrMenu} onPress={data => this.add(data)}/>
            })
          }
          </View>
        </ScrollView>
      </View>
    )
  }
}

import {connect} from 'react-redux';
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MadeBy);
