

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
		if(Platform.OS === 'ios') {
			StatusBarManager.getHeight(({height}) => this.setState({height}));

		}
	};

	render() {
		return (
			<View>
				<View style={{height: this.state.height, backgroundColor: this.props.backgroundColor}}></View>
			</View>
		)
	}
	
}

export default StBar;
