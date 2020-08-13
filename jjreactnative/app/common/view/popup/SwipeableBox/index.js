import React, { Component } from 'react'
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native'
import Interactable from 'react-native-interactable'
import { Header } from 'react-navigation'
import { Icon } from 'native-base'
import styles from './styles'
import commonColor from '../../../../../native-base-theme/variables/commonColor'

// README: When you're using this components with new content,
// you should create new component with View absolute and pointerEvents='box-none'

const MAX_HEIGHT = Header.HEIGHT + 5 + (StatusBar.currentHeight || 0)

type Props = {
  snapPoints: Array,
  onStateChange: Function,
  initialPosition: Object,
  boundaries: Object,
  isList: Boolean,
  childrenRef: Function, // If you're using list in SwipeableBox, you need pass your Reference of List
  showHeader: Boolean
}
type State = {
  scrollEnabled: Boolean,
  boxVisible: Boolean
}

export default class SwipeableBox extends Component<Props, State> {
  static defaultProps = {
    snapPoints: [
      { y: MAX_HEIGHT },
      { y: commonColor.deviceHeight * 0.4 },
      { y: commonColor.deviceHeight }
    ],
    initialPosition: {
      y: commonColor.deviceHeight
    },
    boundaries: {
      top: MAX_HEIGHT,
      bottom: commonColor.deviceHeight
    },
    isList: false,
    showHeader: false
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: false,
      boxVisible: false,
      snapPoints: props.snapPoints,
      initialPosition: props.initialPosition,
      boundaries: props.boundaries,
      showHeader: props.showHeader
    }
    this._deltaY = new Animated.Value(0)
  }

  render() {
    const {
      boxVisible,
      snapPoints,
      initialPosition,
      boundaries,
      showHeader
    } = this.state
    return (
      <View style={styles.panelContainer} pointerEvents='box-none'>
        {boxVisible && (
          <TouchableWithoutFeedback onPress={this.hide}>
            <Animated.View
              pointerEvents={boxVisible ? 'auto' : 'box-none'}
              style={[
                styles.panelContainer,
                {
                  backgroundColor: 'black',
                  opacity: this._deltaY.interpolate({
                    inputRange: [0, snapPoints[snapPoints.length - 1].y],
                    outputRange: [0.5, 0],
                    extrapolateRight: 'clamp'
                  })
                }
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        <Interactable.View
          style={styles.panelContainer}
          ref='swipeable'
          verticalOnly
          snapPoints={snapPoints}
          boundaries={boundaries}
          initialPosition={initialPosition}
          onSnap={this._onSnap}
          dragEnabled={true}
          animatedValueY={this._deltaY}
        >
          <View
            style={{
              height: commonColor.deviceHeight - MAX_HEIGHT
            }}
          >
            {showHeader && (
              <View style={styles.header}>
                <Icon
                  name='ios-remove'
                  style={{
                    color: 'gray',
                    fontSize: 40
                  }}
                />
              </View>
            )}
            {this.props.children}
          </View>
        </Interactable.View>
      </View>
    )
  }

  _onSnap = ({ nativeEvent }) => {
    const { isList, childrenRef } = this.props
    if (isList) {
      const scrollEnabled = nativeEvent.index === 0
      childrenRef.setNativeProps({
        scrollEnabled
      })
    }
    const isOpened = nativeEvent.index !== this.state.snapPoints.length - 1
    if (!isOpened) {
      this._toggleVisible(false)
    }
    this.props.onStateChange && this.props.onStateChange(isOpened)
  }

  _toggleVisible = val => {
    if (this.state.boxVisible === val) {
      return
    }
    this.setState({ boxVisible: val })
  }

  show = () => {
    this.refs.swipeable.snapTo({ index: 1 })
    this._toggleVisible(true)
  }

  hide = () => {
    this.refs.swipeable.snapTo({
      index: this.state.snapPoints.length - 1
    })
    this._toggleVisible(false)
  }

  isVisble = () => this.state.boxVisible
}
