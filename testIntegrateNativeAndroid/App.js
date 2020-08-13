/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NativeModules, Button, DeviceEventEmitter, NativeEventEmitter} from 'react-native';
const { ToastExample,  } = NativeModules;
const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});
// export const nativeModuleEmiiter = new NativeEventEmitter(CalendarManager);
type Props = {};
export default class App extends Component<Props> {

	state = {
		step: 0,
	}
	// componentWillMount = () => {
	// 	nativeModuleEmiiter.addListener('CalendarManager', (data) => {
	// 		if(data) {
	// 			console.log(data)
	// 		}
	// 	})
	// };
	
	render() {
		console.log(NativeModules)
		return (
		<View style={styles.container}>
			<Text>{this.state.step}</Text>
			<Text onPress={() => ToastExample.show('aaa',  ToastExample.LONG)} style={styles.welcome}>Welcome to React Native!</Text>
			{/* <Button
				title='start'
				onPress={() => CalendarManager.onStart()}
			/>
			<Button
				title='pause'
				onPress={() => CalendarManager.pause()}
			/> */}
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
