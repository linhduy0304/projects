const React = require('react');
const ReactNative = require('react-native');
const {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  ListView
} = ReactNative;

import Button from "./Button";

const WINDOW_WIDTH = Dimensions.get('window').width;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as communityActions from '../../actions/communityActions';
const actions = [
  communityActions
];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps(state) {
  return {
    community: state.community
  };
}
function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
const createReactClass = require('create-react-class');
const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const ScrollableTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    underlineHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollOffset: PropTypes.number,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    renderTabName: PropTypes.func,
  },

  getDefaultProps() {
    return {
      scrollOffset: 52,
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      underlineColor: 'white',
      backgroundColor: null,
      underlineHeight: 4,
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      renderTabName: this.renderTabName,
    };
  },

  getInitialState() {
    this._tabsMeasurements = [];
    return {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
  },

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  },

  componentWillReceiveProps(nextProps) {
      if(nextProps.community.tabs !== this.props.community.tabs){
        //is.updateView({value: nextProps.community.tabs.length, });
      }
  },

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  },

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
  },

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    }

  },

  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left + 10;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
      const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

      this.state._leftTabUnderline.setValue(newLineLeft);
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft - 10);
    } else {
      this.state._leftTabUnderline.setValue(lineLeft);
      this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    }
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;

    return <Button
      key={`${name}_${page}`}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}
      onLayout={this.measureTab.bind(this, page)}
    >
      {this.renderTabName(name, page, isTabActive)}
    </Button>;
  },

  renderTabName(name, page, isTabActive) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <View style={[styles.tab, this.props.tabStyle, ]}>
      <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
        {name}
      </Text>
    </View>;
  },

  measureTab(page, event) {
    const { x, width, height, } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
    this.updateView({value: this.props.scrollValue._value, });
  },

  render() {
    const tabUnderlineStyle = {
      position: 'absolute',
      height: this.props.underlineHeight,
      backgroundColor: this.props.underlineColor,
      bottom: 0
    };

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };

    return <View
      style={[styles.container, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}
      onLayout={this.onContainerLayout}
    >
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        scrollsToTop={false}
      >
        <View
          style={[styles.tabs, {width: this.state._containerWidth, }, this.props.tabsContainerStyle, ]}
          ref={'tabContainer'}
          onLayout={this.onTabContainerLayout}
        >
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, ]} />
        </View>
      </ScrollView>
    </View>;
  },

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width, });
    this.updateView({value: this.props.scrollValue._value, });
  },

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue._value, });
  },
});


const styles = StyleSheet.create({
  tab: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    height: 43,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabBar);


