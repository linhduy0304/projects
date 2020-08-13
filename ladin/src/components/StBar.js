

import React from 'react';
import { Text, View, StatusBar , Platform, NativeModules} from 'react-native';
const { StatusBarManager } = NativeModules;

class StBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 20,
		}
	}
	componentWillMount = () => {
    StatusBarManager.getHeight(({height}) => this.setState({height}));
	};

	render() {
		return (
			<View>
				<View style={{height: this.state.height, backgroundColor: '#c41a36'}}></View>
			</View>
		)
	}
	
}

export default StBar;
