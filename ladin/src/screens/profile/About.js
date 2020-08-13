

import React, { Component } from 'react';
import { View, Text, ScrollView , StyleSheet} from 'react-native';
import Nav from '../../components/cart/Nav';
import HTMLView from 'react-native-render-html';

const Css = require('../../config/css');

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount = () => {
    var body = {
      slug: this.props.slug
    }
    this.props.getAbout(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.profile.about) {
      this.setState({data: nextProps.profile.about})
    }
  };

  render() {
    const {data} = this.state;
    return (
      <View style={Css.ctWhite}>
        <Nav
          label={this.props.title.toUpperCase()}
        />
        <View style={{flex: 1}}>
          {
            this.props.profile.loading ? 
            <Loading size={100} source={require('../../icons/loading.gif')}/>
            : 
            data ? 
            <ScrollView>
              <View style={{flex: 1, padding: 15,}}>
                <HTMLView
                  html={data.description}
                  // stylesheet={{height: 40}}
                />
              </View>
            </ScrollView>
            : null
          }
        </View>
        
       
      </View>

    );
  }
}

const styles = StyleSheet.create({
 
})

import {connect} from 'react-redux';
import {getAbout} from '../../actions/profile';
import Loading from '../../components/Loading';

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAbout: (body) => dispatch(getAbout(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
