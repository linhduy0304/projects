/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,DeviceEventEmitter,
  AppState,TouchableOpacity,Image,CameraRoll,PermissionsAndroid,
  NativeAppEventEmitter, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'
import { TextInputMask } from 'react-native-masked-text'
  import ViewShot, {captureRef} from "react-native-view-shot";

  // import {a} from './pedometer' 
const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();
var decode = require('decode-html');
import { RNCamera } from 'react-native-camera';
const Entities = require('html-entities').XmlEntities;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjViNjQwZDM5ZTJiOTZjM2VkOTI3YjI2NSIsImVtYWlsIjoibGluaGR1eS4wMzA0LnV0Y0BnbWFpbC5jb20iLCJ0aW1lIjp7IiRkYXRlIjp7IiRudW1iZXJMb25nIjoiMTUzNjgxNDIyNCJ9fX0.tFpFu2A8OXhp4yxe5UVVGSwuCTVpHriN_xt81Fgb_WA';
export default class App extends Component {
  state = {
    show: '',
    zoom: 0.5,
    uri: ''
  }
  api() {
    return axios({
      method: 'GET',
      url: 'https://wallet-api.egate.global/accounts/check-session',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  // componentWillMount = () => {
  //   var map = {
  //     "'": "&apos;",
  //     "<": "&lt;",
  //     ">": "&gt;",
  //     " ": "&nbsp;",
  //     "¡": "&iexcl;",
  //     "¢": "&cent;",
  //     "£": "&pound;",
  //     "¤": "&curren;",
  //     "¥": "&yen;",
  //     "¦": "&brvbar;",
  //     "§": "&sect;",
  //     "¨": "&uml;",
  //     "©": "&copy;",
  //     "ª": "&ordf;",
  //     "«": "&laquo;",
  //     "¬": "&not;",
  //     "®": "&reg;",
  //     "¯": "&macr;",
  //     "°": "&deg;",
  //     "±": "&plusmn;",
  //     "²": "&sup2;",
  //     "³": "&sup3;",
  //     "´": "&acute;",
  //     "µ": "&micro;",
  //     "¶": "&para;",
  //     "·": "&middot;",
  //     "¸": "&cedil;",
  //     "¹": "&sup1;",
  //     "º": "&ordm;",
  //     "»": "&raquo;",
  //     "¼": "&frac14;",
  //     "½": "&frac12;",
  //     "¾": "&frac34;",
  //     "¿": "&iquest;",
  //     "À": "&Agrave;",
  //     "Á": "&Aacute;",
  //     "Â": "&Acirc;",
  //     "Ã": "&Atilde;",
  //     "Ä": "&Auml;",
  //     "Å": "&Aring;",
  //     "Æ": "&AElig;",
  //     "Ç": "&Ccedil;",
  //     "È": "&Egrave;",
  //     "É": "&Eacute;",
  //     "Ê": "&Ecirc;",
  //     "Ë": "&Euml;",
  //     "Ì": "&Igrave;",
  //     "Í": "&Iacute;",
  //     "Î": "&Icirc;",
  //     "Ï": "&Iuml;",
  //     "Ð": "&ETH;",
  //     "Ñ": "&Ntilde;",
  //     "Ò": "&Ograve;",
  //     "Ó": "&Oacute;",
  //     "Ô": "&Ocirc;",
  //     "Õ": "&Otilde;",
  //     "Ö": "&Ouml;",
  //     "×": "&times;",
  //     "Ø": "&Oslash;",
  //     "Ù": "&Ugrave;",
  //     "Ú": "&Uacute;",
  //     "Û": "&Ucirc;",
  //     "Ü": "&Uuml;",
  //     "Ý": "&Yacute;",
  //     "Þ": "&THORN;",
  //     "ß": "&szlig;",
  //     "à": "&agrave;",
  //     "á": "&aacute;",
  //     "â": "&acirc;",
  //     "ã": "&atilde;",
  //     "ä": "&auml;",
  //     "å": "&aring;",
  //     "æ": "&aelig;",
  //     "ç": "&ccedil;",
  //     "è": "&egrave;",
  //     "é": "&eacute;",
  //     "ê": "&ecirc;",
  //     "ë": "&euml;",
  //     "ì": "&igrave;",
  //     "í": "&iacute;",
  //     "î": "&icirc;",
  //     "ï": "&iuml;",
  //     "ð": "&eth;",
  //     "ñ": "&ntilde;",
  //     "ò": "&ograve;",
  //     "ó": "&oacute;",
  //     "ô": "&ocirc;",
  //     "õ": "&otilde;",
  //     "ö": "&ouml;",
  //     "÷": "&divide;",
  //     "ø": "&oslash;",
  //     "ù": "&ugrave;",
  //     "ú": "&uacute;",
  //     "û": "&ucirc;",
  //     "ü": "&uuml;",
  //     "ý": "&yacute;",
  //     "þ": "&thorn;",
  //     "ÿ": "&yuml;",
  //     "Œ": "&OElig;",
  //     "œ": "&oelig;",
  //     "Š": "&Scaron;",
  //     "š": "&scaron;",
  //     "Ÿ": "&Yuml;",
  //     "ƒ": "&fnof;",
  //     "ˆ": "&circ;",
  //     "˜": "&tilde;",
  //     "Α": "&Alpha;",
  //     "Β": "&Beta;",
  //     "Γ": "&Gamma;",
  //     "Δ": "&Delta;",
  //     "Ε": "&Epsilon;",
  //     "Ζ": "&Zeta;",
  //     "Η": "&Eta;",
  //     "Θ": "&Theta;",
  //     "Ι": "&Iota;",
  //     "Κ": "&Kappa;",
  //     "Λ": "&Lambda;",
  //     "Μ": "&Mu;",
  //     "Ν": "&Nu;",
  //     "Ξ": "&Xi;",
  //     "Ο": "&Omicron;",
  //     "Π": "&Pi;",
  //     "Ρ": "&Rho;",
  //     "Σ": "&Sigma;",
  //     "Τ": "&Tau;",
  //     "Υ": "&Upsilon;",
  //     "Φ": "&Phi;",
  //     "Χ": "&Chi;",
  //     "Ψ": "&Psi;",
  //     "Ω": "&Omega;",
  //     "α": "&alpha;",
  //     "β": "&beta;",
  //     "γ": "&gamma;",
  //     "δ": "&delta;",
  //     "ε": "&epsilon;",
  //     "ζ": "&zeta;",
  //     "η": "&eta;",
  //     "θ": "&theta;",
  //     "ι": "&iota;",
  //     "κ": "&kappa;",
  //     "λ": "&lambda;",
  //     "μ": "&mu;",
  //     "ν": "&nu;",
  //     "ξ": "&xi;",
  //     "ο": "&omicron;",
  //     "π": "&pi;",
  //     "ρ": "&rho;",
  //     "ς": "&sigmaf;",
  //     "σ": "&sigma;",
  //     "τ": "&tau;",
  //     "υ": "&upsilon;",
  //     "φ": "&phi;",
  //     "χ": "&chi;",
  //     "ψ": "&psi;",
  //     "ω": "&omega;",
  //     "ϑ": "&thetasym;",
  //     "ϒ": "&Upsih;",
  //     "ϖ": "&piv;",
  //     "–": "&ndash;",
  //     "—": "&mdash;",
  //     "‘": "&lsquo;",
  //     "’": "&rsquo;",
  //     "‚": "&sbquo;",
  //     "“": "&ldquo;",
  //     "”": "&rdquo;",
  //     "„": "&bdquo;",
  //     "†": "&dagger;",
  //     "‡": "&Dagger;",
  //     "•": "&bull;",
  //     "…": "&hellip;",
  //     "‰": "&permil;",
  //     "′": "&prime;",
  //     "″": "&Prime;",
  //     "‹": "&lsaquo;",
  //     "›": "&rsaquo;",
  //     "‾": "&oline;",
  //     "⁄": "&frasl;",
  //     "€": "&euro;",
  //     "ℑ": "&image;",
  //     "℘": "&weierp;",
  //     "ℜ": "&real;",
  //     "™": "&trade;",
  //     "ℵ": "&alefsym;",
  //     "←": "&larr;",
  //     "↑": "&uarr;",
  //     "→": "&rarr;",
  //     "↓": "&darr;",
  //     "↔": "&harr;",
  //     "↵": "&crarr;",
  //     "⇐": "&lArr;",
  //     "⇑": "&UArr;",
  //     "⇒": "&rArr;",
  //     "⇓": "&dArr;",
  //     "⇔": "&hArr;",
  //     "∀": "&forall;",
  //     "∂": "&part;",
  //     "∃": "&exist;",
  //     "∅": "&empty;",
  //     "∇": "&nabla;",
  //     "∈": "&isin;",
  //     "∉": "&notin;",
  //     "∋": "&ni;",
  //     "∏": "&prod;",
  //     "∑": "&sum;",
  //     "−": "&minus;",
  //     "∗": "&lowast;",
  //     "√": "&radic;",
  //     "∝": "&prop;",
  //     "∞": "&infin;",
  //     "∠": "&ang;",
  //     "∧": "&and;",
  //     "∨": "&or;",
  //     "∩": "&cap;",
  //     "∪": "&cup;",
  //     "∫": "&int;",
  //     "∴": "&there4;",
  //     "∼": "&sim;",
  //     "≅": "&cong;",
  //     "≈": "&asymp;",
  //     "≠": "&ne;",
  //     "≡": "&equiv;",
  //     "≤": "&le;",
  //     "≥": "&ge;",
  //     "⊂": "&sub;",
  //     "⊃": "&sup;",
  //     "⊄": "&nsub;",
  //     "⊆": "&sube;",
  //     "⊇": "&supe;",
  //     "⊕": "&oplus;",
  //     "⊗": "&otimes;",
  //     "⊥": "&perp;",
  //     "⋅": "&sdot;",
  //     "⌈": "&lceil;",
  //     "⌉": "&rceil;",
  //     "⌊": "&lfloor;",
  //     "⌋": "&rfloor;",
  //     "⟨": "&lang;",
  //     "⟩": "&rang;",
  //     "◊": "&loz;",
  //     "♠": "&spades;",
  //     "♣": "&clubs;",
  //     "♥": "&hearts;",
  //     "♦": "&diams;"
  // };
  // var string = 'Canon EOS 5D Mark III, một chiếc m&aacute;y ảnh gương lật phản xạ đơn ống k&iacute;nh kỹ thuật số'
  //   var entityMap = map;
  //   for (var key in entityMap) {
  //       var entity = entityMap[key];
  //       var regex = new RegExp(entity, 'g');
  //       string = string.replace(regex, key);
  //   }
  //   string = string.replace(/&quot;/g, '"');
  //   string = string.replace(/&amp;/g, '&');
  //   console.log(string) ;
  

  //   console.log(decode(''));
  //   // RNFetchBlob.fetch('GET', 'https://wallet-api.egate.global/user/index', {
  //   //   // more headers  ..
  //   // })
  //   // .then((res) => {
  //   //   console.log(res)
  //   // })
  //   // // Something went wrong:
  //   // .catch((errorMessage, statusCode) => {
  //   //   console.log(errorMessage, statusCode)
  //   //   // error handling
  //   // })
  // }
 

    // return axios("https://wallet-api.egate.global/accounts/check-session", {
    //   method: "GET",
    //   headers: headers
    // }).then(res => {
    //   console.log(res)
    //   return res.json()
    // })
    // .then(res => {
    //   console.log(res)
    //   return res
    // })
    // .catch(error => {
    //   return {
    //     code: 500
    //   }
    // })
  // };



  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState)
    var timeout;
    console.log(timeout)
    switch(nextAppState) {
      case 'active':
        clearTimeout(timeout)
        return;
      case 'background':
        timeout = setTimeout(() => {
          console.log('timeout')
        }, 5000)
        return;
    }
  }

  async requestCameraPermission(image) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cho phép truy cập thư viện ảnh',
          'message': 'Cho phép truy cập thư viện ảnh'
        }
      )
    } catch (err) {
      console.warn(err)
    }
  }

  // componentWillMount = () => {
  //     this.requestCameraPermission()
  // };
  
  
  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options)
  //     console.log(data.uri);
  //     // this.setS
  //   }
  // };

  takePicture = () => {
    captureRef(this.refs.viewRef, {
      format: "jpg",
      quality: 0.8,
      width: 100, height: 100,
      result: 'base64'
    })
    .then(
      uri => {

        var a = `data:image/png;base64,${uri}`;
        // CameraRoll.saveToCameraRoll(a, 'photo')
        // console.log(a)
        this.setState({uri: a})
      },
      error => console.error("Oops, snapshot failed", error)
    );
  }

  onCapture = uri => {
    console.log("do something with ", uri);
    
    this.setState({uri: uri})
    CameraRoll.saveToCameraRoll(uri, 'photo')
  }

  componentWillMount = () => {
    console.log(a)
  };
  
  render() {
    console.log(this.state.zoom)
    return (
      <View style={styles.container}>
       <Text>dddddd</Text>
      {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          zoom={this.state.zoom}
          style = {styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.torch}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
      />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.setState({zoom: this.state.zoom+0.1})}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Tang </Text>
        </TouchableOpacity>
        </View> */}
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  
});
