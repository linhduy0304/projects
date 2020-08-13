import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  Image,

} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";

let css = require('../Css');
let deviceWidth = Dimensions.get('window').width;

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isLooping: true,
      duration: 0,
      currentTime: 0,
    }
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Quay lại</Text>
            </View>
          </NavGroup>
        </NavBar>

        <View style={styles.content}>
          <YouTube
            videoId={this.props.videoId}
            hidden={false}
            rel={true}
            apiKey={'AIzaSyDVOHhrkvJ8_sZhQeLADdwVA19zFhq1hW0'}
            play={true}
            loop={true}
            fullscreen={true}
            controls={1}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
            style={{alignSelf: 'stretch', height: PixelRatio.roundToNearestPixel(deviceWidth / (16 / 9)) , backgroundColor: 'rgba(78, 118, 162, 0.4)', marginVertical: 10}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center'
  },

});