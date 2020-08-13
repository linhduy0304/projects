

import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import Css from '../../config/Css';
import { screen } from '../../config/System';
import Header from '../../components/home/Header';
import MyWallet from '../../components/home/MyWallet';
import Item from '../../components/home/Item';
import StBar from '../../components/StBar';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';
const AnimatableSectionList = createAnimatableComponent(FlatList);
const NATIVE_INCOMPATIBLE_ANIMATIONS = ['jello', 'lightSpeedIn', 'lightSpeedOut'];

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: 'https://static.ipick.vn/images/avatars/conheonho_9x_Rxpj7AObCG_300x300.png',
        name: 'Lê Linh Duy',
        total: '150.000.000',
      },
      // myWallet: {
      //   incre: true,
      //   percent: '3.44',
      //   price: '0,97894789333',
      //   dollar: '43,33'
      // },
      active: 0,
    };
  }

  componentWillMount = () => {
    this.props.checkSession()
  };
  

  setActive(name, componentRef, animationType) {
    componentRef.setNativeProps({
      style: {
        zIndex: 1,
      },
    });
    componentRef.animate(animationType, this.state.duration).then(() => {
      componentRef.setNativeProps({
        style: {
          zIndex: 0,
        },
      });
    });
    if (this.textRef) {
      this.textRef[animationType](this.state.duration);
    }
    if(this.state.active === name) {
      this.setState({active: null})
    }else {
      this.setState({active: name})
    }
  }

  render() {
    const {user} = this.state;
    return (
      <View style={[Css.container, {alignItems: 'center'}]}>
        <StatusBar
          backgroundColor={'#23434d'}
          barStyle='light-content'
        />
        {
          Platform.OS == 'ios' ?
          <StBar/>
          : null
        }
        <ScrollView>
          <View style={styles.body}>
            <Header data={user}/>
            {/* <MyWallet data={myWallet}/> */}
            <AnimatableSectionList
              animation="fadeInLeft"
              contentInsetAdjustmentBehavior="automatic"
              duration={1100}
              // delay={1400}
              data={this.props.auth.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={data => <Item 
                                    animationType={'fadeIn'}
                                    setActive={(name, componentRef, animationType) => this.setActive(name, componentRef, animationType)} 
                                    active={this.state.active} 
                                    data={data.item}
                                    index={data.index}
                                    useNativeDriver={NATIVE_INCOMPATIBLE_ANIMATIONS.indexOf(data.item) === -1}
                                  />}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 0,
    padding: 20,
    width: screen.width,
  },
})

import {connect} from 'react-redux';
import {login, checkSession} from '../../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
    checkSession: () => dispatch(checkSession()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
