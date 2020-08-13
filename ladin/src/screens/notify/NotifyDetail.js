

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Nav from '../../components/cart/Nav';
import { url, screen } from '../../config/Constant';
import HTMLView from 'react-native-htmlview';

const Css = require('../../config/css');

class NotifyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount = () => {
    this.props.notiDetail(this.props.data.id)
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.notify.notiDetail) {
      this.setState({data: nextProps.notify.notiDetail})
    }
  };

  render() {
    const {data} = this.state
    return (
      <View style={[Css.container, {backgroundColor: "#fff",}]}>
        <Nav
          label={this.props.data.title.toUpperCase()}
        />
        <ScrollView style={{flex: 1}}>
        {
          this.props.notify.loading ?
          <Loading size={100} source={require('../../icons/loading.gif')}/>
          : 
          data ? 
          <View style={{ flex: 1, backgroundColor: "#fff",}}>
            {
              data.image ? 
                <Image style={styles.image} source={{uri: url+data.image}}/>
              : null
            }
            
            <View style={{padding: 16, flex: 1}}>
              <Text style={styles.title}>{data.short_description}</Text>
              <Text style={styles.date}>{data.time} {data.date}</Text>
              <Text style={{marginTop: 15, fontSize: 16, color: '#333'}} >
                <HTMLView
                  value={data.description}
                />
              </Text>
            </View>
            
          </View>
          : null
        }
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: '#a9a9a9',
    marginTop: 6
  },
  title: {
    color: '#0066b3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: screen.width,
    height: screen.width/2
  }
})

import {connect} from 'react-redux';
import {notiDetail} from '../../actions/notify';
import Loading from '../../components/Loading';

const mapStateToProps = (state) => {
  return {
    notify: state.notify
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    notiDetail: (id) => dispatch(notiDetail(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotifyDetail);
