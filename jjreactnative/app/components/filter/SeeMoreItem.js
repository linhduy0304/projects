import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity} from "react-native";
import {Text} from "native-base";

import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_TEXT_HEADER} from "../../resources/dimens";
import {COLOR_PRIMARY} from "../../resources/colors";
import JJIcon from "../common/JJIcon";
import {BasePureComponent} from "../common/BasePureComponent";

export default class SeeMoreItem extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: '100%',
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_SMALL,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                <Text
                    style={{
                        color: COLOR_PRIMARY,
                        fontSize: DIMENSION_TEXT_HEADER
                    }}>
                    {this.props.isExpand ? 'Thu gọn' : 'Tải thêm'}
                </Text>

                <JJIcon
                    style={{marginLeft: DIMENSION_PADDING_SMALL}}
                    name={this.props.isExpand ? 'chevron_up_o' : 'chevron_down_o'}
                    size={10}
                    color={COLOR_PRIMARY}/>

            </TouchableOpacity>
        )
    }
}

SeeMoreItem.propTypes = {
    onPress: PropTypes.any,
    isExpand: PropTypes.any
}