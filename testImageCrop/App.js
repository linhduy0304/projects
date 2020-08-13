/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from '@react-native-community/cameraroll';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Swipeout from 'react-native-swipeout';

const swipeoutBtns = [
  {
    text: 'Button',
    backgroundColor: 'blue'
  },
];
const App = () => {
  const getImage = async () => {
    // try {
    //   const res = await CameraRoll.getPhotos({
    //     assetType: 'Photos',
    //     first: 16,
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    getImage();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        style={{marginTop: 100}}
        data={['', '']}
        renderItem={() => (
          <Swipeout right={swipeoutBtns}>
            <View style={{height: 50, backgroundColor: 'red', marginTop: 10}}>
              <Text>dfadfasfsaf</Text>
            </View>
          </Swipeout>
        )}
      />
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 50,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: 50,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default App;
