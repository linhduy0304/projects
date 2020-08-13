import React from 'react'
import PropTypes from 'prop-types'
import {Text} from "native-base";
import {TouchableOpacity} from 'react-native'
import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_XX
} from "../../../resources/dimens";
import {COLOR_PRIMARY} from "../../../resources/colors";
import JJIcon from "../../common/JJIcon";

export default class NavigationMenuLogout extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    marginRight: DIMENSION_PADDING_MEDIUM,
                    marginBottom: DIMENSION_PADDING_MEDIUM,
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    height: DIMENSION_BUTTON_MEDIUM,
                    backgroundColor: COLOR_PRIMARY,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    justifyContent: 'center',
                    paddingLeft: DIMENSION_PADDING_MEDIUM
                }}
                activeOpacity={0.8}>
                <JJIcon name={'log_out_o'}
                        size={DIMENSION_TEXT_HEADER_XX}
                        color={'white'} />
                <Text style={{
                    color: 'white',
                    alignSelf: 'center',
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_HEADER,
                }}>
                    ĐĂNG XUẤT
                </Text>
            </TouchableOpacity>
        )
    }
}

NavigationMenuLogout.propTypes = {
    onPress: PropTypes.any
}