

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import Nav from '../components/Nav';
import Css from '../config/Css';
import { Actions } from 'react-native-router-flux';
import StBar from '../components/StBar';
import { color, screen } from '../config/System';
import Camera from 'react-native-camera';

class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title='Scan Qrcode'>
          <TouchableOpacity onPress={() => Actions.pop()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>
        <View style={styles.ctCamera}>
          <Camera
            ref={cam => {
                this.camera = cam;
            }}
            style={{flex: 1, }}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.cameraRoll}
            type={Camera.constants.Type.back}
            flashMode={Camera.constants.FlashMode.auto}
            defaultTouchToFocus
            mirrorImage={false}
            cropToPreview={true}
            permissionDialogTitle="Sample title"
            permissionDialogMessage="Sample dialog message"
            barCodeTypes={['qr']}
            onBarCodeRead={(data) => getData(data)}
        >
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => close()} style={{padding: 15 , marginTop: 25,}}>
            </TouchableOpacity>
          </View>
        </Camera>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ctCamera: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
export default QRCode;
