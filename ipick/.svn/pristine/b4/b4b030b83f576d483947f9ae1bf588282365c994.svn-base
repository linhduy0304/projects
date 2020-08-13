import {
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
var DeviceInfo = require('react-native-device-info');
windowSize = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#fff',
		// marginTop: Platform.OS === 'ios' ? 20 : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? 10 : 0,
  },
  statusBar: {
		backgroundColor: '#fff',
		height: Platform.Version < 21 ? 0 : StatusBar.currentHeight
  },
  navBar: {
		backgroundColor: '#fff',
		padding: 0,
    height: 44,
    marginTop: 0,
		// width: windowSize.width,
		borderBottomColor: "transparent"
  },
  navBarCate: {
		backgroundColor: 'rgb(246, 248, 249)',
		padding: 0,
    height: 44,
    marginTop: 0,
		width: windowSize.width,
		borderBottomColor: "transparent"
  },
  navBack: {
    flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 6,
    padding: 15,
  },
  txtTitle: {
    fontSize: 17,
    color: 'rgb(27, 48, 70)',
    // color: 'rgb(0, 139, 125)',
    fontWeight: "500",
  },
  navSearch: {
    padding: 15
  },
  txtSave: {
    fontSize: 17,
    color: 'rgb(43, 114, 197)',
    fontWeight: 'bold'
  },
  ctFollow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    height: 24,
    paddingLeft: 5,
    paddingRight: 12,
    alignItems: 'center'
  },
  txtPick: {
    fontSize: 12,
    color: 'rgb(31, 42, 53)'
  },
  ic_follow: {
    marginRight: 6
  },
  ctModalSearch: {
		backgroundColor: 'rgba(0, 138, 139, 0.6)',
		marginTop: Platform.OS === 'ios' ? 0 : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? StatusBar.currentHeight : 0,
  },
  ctSearch: {
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainSpin: {
		width: windowSize.width,
		height: windowSize.height,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		zIndex: 99
  },
  mainSpin1: {
		width: windowSize.width,
		height: windowSize.height,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		// zIndex: 99
  },
  mainSpinTop: {
		width: windowSize.width,
		alignItems: 'center',
		backgroundColor: '#fff',
		top: 44
  },
  noti: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  ctLoading: {
    alignItems: 'center',
    paddingTop: 15,
  },
  txtLoading: {
    fontSize: 12,
    color: 'rgb(0, 139, 125)'
  },
  txtError: {
    color: 'red',
    fontSize: 13
  },
  ctTitle: {
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    marginTop: 15
  },
  ctInputTitle: {
    padding: 0,
    flex: 1,
    fontSize: 16, 
    marginLeft: 10,
    color: 'rgb(31, 42, 53)', 
  },
  ctContent: {
    height: 90,
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5
  },
  ctInputContent: {
    padding: 0,
    flex: 1,
    marginLeft: 10,
    fontSize: 15, 
    color: 'rgb(31, 42, 53)', 
  },
  ctTags: {
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    marginTop: 15,
    height: 40,
    borderRadius: 5,
  },
  ctInputTags: {
    padding: 0,
    flex: 1,
    marginLeft: 10,
    fontSize: 13, 
    color: 'rgb(31, 42, 53)', 
  },
  ctScrollContent: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? StatusBar.currentHeight : 0,
  },
  ctAddContent: {
    backgroundColor: 'rgb(0, 193, 125)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 15,
    paddingLeft: 10, 
    paddingRight: 10,
    borderRadius: 5,
  },
});
