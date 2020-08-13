

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { screen } from '../../config/System';

const ApiAdd = ({
    params,
}) => (
  <View style={css.ct}>
    <View style={css.ctHeader}>
      <Text style={css.api}>APIKeys</Text>
      <View style={css.ctAdd}>
        <Text style={css.add}>+ New API Key</Text>
      </View>
    </View>
    <Text style={css.title}>You haven't created any API keys yet.</Text>
    <Text style={css.sub}>API keys allow you to perform automated actions on your account with your own software</Text>
  </View>
  
);

const css = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    color: '#323643'
  },
  sub: {
    fontSize: 12,
    lineHeight: 20,
    marginTop: 5,
    color: '#929292'
  },
  api: {
    flex: 1,
    fontWeight: 'bold',
    color: '#323643'
  },
  add: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#284a54'
  },
  ctAdd: {
    borderWidth: 1,
    borderColor: '#dadde2',
    padding:5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
  },
  ct: {
    width: screen.width-20,
  },
  ctHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dadde2',
  },
})
export default ApiAdd;
