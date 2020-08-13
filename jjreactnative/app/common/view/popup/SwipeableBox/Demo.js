import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import SwipeableBox from '.'
import { COLOR_PRIMARY } from '../../../../resources/colors'
import BigDealItem from '../../../../components/common/BigDealItem'
import dealApi from '../../../../api/deal-api'

export default class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchData: []
    }
  }

  render() {
    const { searchData } = this.state
    return (
      <View style={styles.absolute} pointerEvents='box-none'>
        <TouchableOpacity
          onPress={() => {
            this.refs.SwipeableBoxRef.show()
          }}
          style={[styles.fab, styles.shadow]}
        >
          <Icon
            name='ios-add'
            style={{
              color: 'white',
              marginTop: 2
            }}
          />
        </TouchableOpacity>
        <SwipeableBox
          isList
          showHeader
          childrenRef={this.refs.flatListRef}
          onStateChange={val => {
            if (val && !searchData.length) {
              this._fetchData()
            }
          }}
          ref='SwipeableBoxRef'
        >
          <FlatList
            ref='flatListRef'
            style={{ backgroundColor: 'white' }}
            data={searchData}
            renderItem={this._renderItem}
          />
        </SwipeableBox>
      </View>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <BigDealItem
        navigation={this.props.navigation}
        item={item}
        path={'deal_detail'}
      />
    )
  }

  _fetchData = () => {
    dealApi
      .searchDealV4(
        undefined,
        'exclusive',
        undefined,
        0,
        10,
        undefined,
        undefined
      )
      .then(response => {
        this.setState({ searchData: response.objects })
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLOR_PRIMARY,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  shadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowColor: '#222',
    shadowRadius: 8
  }
})
