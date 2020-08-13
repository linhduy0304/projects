import { Text } from 'native-base';
import React from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import JJIcon from './JJIcon';
import { COLOR_PRIMARY } from '../../resources/colors';
import { isIphoneBunnyEar } from '../../utils/common-utils';

class CustomTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    //this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      if (!!icon.setNativeProps) {
          icon.setNativeProps({
              style: {
                  color: this.iconColor(progress),
              },
          });
      }
    });
  }

  //color between rgb(200,60,73) and rgb(102,102,102)
  iconColor(progress) {
    const red = 200 + (102 - 200) * progress;
    const green = 60 + (102 - 60) * progress;
    const blue = 73 + (102 - 73) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        paddingBottom: Platform.OS === 'ios'
          ? (isIphoneBunnyEar() ? 34 : 0)
          : 0
      }}>
        <View style={[styles.tabs, this.props.style,]}>
          {this.props.tabs.map((tab, i) => {
            return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <JJIcon
                name={tab.split(":")[0]}
                size={24}
                color={this.props.activeTab === i ? COLOR_PRIMARY : 'gray'}
              />
              <Text style={{
                color: this.props.activeTab === i ? COLOR_PRIMARY : 'gray',
                fontSize: 11
              }}>{tab.split(":")[1]}</Text>
            </TouchableOpacity>;
          })}
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  tabs: {
    backgroundColor: 'white',
    height: 49,
    flexDirection: 'row',
    paddingTop: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

export default CustomTabBar;
