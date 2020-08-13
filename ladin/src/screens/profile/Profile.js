

import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Nav from '../../components/cart/Nav';
import Header from '../../components/profile/Header';
import Info from '../../components/profile/Info';
import EditProfile from '../../components/profile/EditProfile';
import Loading from '../../components/register/Loading';

const Css = require('../../config/css');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: null,
      open: null,
      openBranch: null,
      bank: this.props.profile.user.bank,
      branch: this.props.profile.user.bank_branch
    };
  }

  render() {
    const {user} = this.props.profile;
    return (
      <View style={Css.container}>
      <Nav
        label='THÔNG TIN CÁ NHÂN' 
      />
      <Header 
        name={user.name}
      />
      {
        this.props.profile.loading ?
        <Loading />
        : null
      }
      {
        this.state.update ? 
          <EditProfile
            data={user}
            bank= {this.state.bank}
            branch={this.state.branch}
            openBank={() => this.setState({open: true})}
            openBranch={() => this.setState({openBranch: true})}
            cancel={() => this.setState({update: null})}
            update={(body) => this.props.editProfile(body)}
           /> 
        : 
          <Info
            data={user}
            onPress={() => this.setState({update: true})}
          />
      }
      <ModalBank
        data={this.props.auth.banks ? this.props.auth.banks : []}
        open={this.state.open}
        onPress={(data) => this.setState({bank: data.name, open: null})}
        onClose={() => this.setState({open: null})}
      />
      <ModalBranch
        data={this.props.auth.cities ? this.props.auth.cities : []}
        open={this.state.openBranch}
        onPress={(data) => this.setState({branch: data.province_name, openBranch: null})}
        onClose={() => this.setState({openBranch: null})}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
 
})

import {connect} from 'react-redux';
import {editProfile} from '../../actions/profile';
import ModalBank from '../../components/register/ModalBank';
import ModalBranch from '../../components/register/ModalBranch';

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (body) => dispatch(editProfile(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
