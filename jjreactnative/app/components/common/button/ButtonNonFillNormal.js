import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {TouchableOpacity, View, FlatList, Animated} from 'react-native';
import {DIMENSION_BUTTON_MEDIUM} from "../../../resources/dimens";

type Props = {
    ...props,
    text: PropTypes.any,
    onPress?: PropTypes.any,
    style?: any,
    color?: PropTypes.any
}
export default class ButtonNonFillNormal extends React.PureComponent<Props> {

    constructor() {
        super()
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                if (this.props.onPress) this.props.onPress()
            }}
                              style={[this.props.style,
                                  {
                                      height: DIMENSION_BUTTON_MEDIUM,
                                      borderWidth: 1,
                                      borderRadius: 4,
                                      borderColor: this.props.color,
                                      justifyContent: 'center',
                                      paddingLeft: 8,
                                      paddingRight: 8,
                                      alignItems: 'center'
                                  }
                              ]}>
                <Text style={{color: this.props.color, fontWeight: 'bold', fontSize: 16}}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}