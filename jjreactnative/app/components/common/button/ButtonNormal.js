import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {TouchableOpacity, View, FlatList, Animated} from 'react-native';

import JJIcon from '../JJIcon'
import CIcon from '../CIcon'
import {DIMENSION_BUTTON_MEDIUM} from "../../../resources/dimens";

type Props = {
    ...props,
    text: PropTypes.string,
    jjIcon?: PropTypes.string,
    onPress?: PropTypes.func,
    style?: any,
    borderColor?: PropTypes.object,
    textColor?: PropTypes.object,
    fillColor?: PropTypes.boolean,
    otherIcon?: PropTypes.string,
    otherIconFont?: PropTypes.string,
}
export default class ButtonNormal extends React.PureComponent<Props> {

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
                                      borderColor: this.props.borderColor ? this.props.borderColor : 'transparent',
                                      justifyContent: 'center',
                                      paddingLeft: 8,
                                      paddingRight: 8,
                                      alignItems: 'center',
                                      backgroundColor: this.props.fillColor ? this.props.fillColor : 'transparent',
                                      flexDirection: 'row'
                                  }
                              ]}>
                {
                    this.props.jjIcon &&
                    <JJIcon color={this.props.textColor}
                            size={16}
                            name={this.props.jjIcon}
                            style={{marginRight: 8}}/>
                }
                {
                    this.props.otherIcon &&
                    <CIcon name={this.props.otherIcon}
                           family={this.props.otherIconFont}
                           style={{color: this.props.textColor, fontSize: 16}}/>
                }
                <Text style={{color: this.props.textColor, fontWeight: 'bold', fontSize: 16}}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}