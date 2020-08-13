

import {
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
const window = Dimensions.get('window');
var DeviceInfo = require('react-native-device-info');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#fff',
  },
  statusBar: {
		backgroundColor: '#fff',
		height: Platform.Version < 21 ? 0 : StatusBar.currentHeight
	},
	navBar: {
		backgroundColor: '#1ab394',
		padding: 0,
    height: 44,
    marginTop: 0,
		borderBottomColor: "transparent"
  },
  txtTitle: {
		fontSize: 17,
    color: '#fff',
  },
  mainSpin: {
		width: window.width,
		height: window.height,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		zIndex: 99
	},

});
