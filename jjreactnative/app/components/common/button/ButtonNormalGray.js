import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {TouchableOpacity, View, FlatList, Animated} from 'react-native';
import {DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";

type Props = {
    ...props,
    text: PropTypes.string,
    onPress?: PropTypes.func,
    style?: any
}
export default class ButtonNormalGray extends React.PureComponent<Props> {

    constructor() {
        super()
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}
                              style={[this.props.style,
                                  {
                                      borderWidth: 1,
                                      borderRadius: DIMENSION_RADIUS_MEDIUM,
                                      borderColor: '#999999',
                                      justifyContent: 'center',
                                      paddingTop: 8,
                                      paddingBottom: 8,
                                      paddingLeft: 24,
                                      paddingRight: 24,
                                      alignItems: 'center'
                                  }
                              ]}>
                <Text style={{color: '#999999', fontWeight: 'bold', fontSize: 14}}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}