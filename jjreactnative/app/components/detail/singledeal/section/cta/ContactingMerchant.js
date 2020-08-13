import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {COLOR_PRIMARY} from "../../../../../resources/colors";
import DividerLine from "../../../../common/DividerLine";

export default class ContactingMerchant extends React.PureComponent {

    render() {
        return (
            <View style={{backgroundColor: 'white'}}>
                {
                    this.props.noPublicPromoCode &&
                    <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
                }

                <View style={[styles.singleButtonFillColor, {backgroundColor: COLOR_PRIMARY}]}>
                    <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}
                        uppercase={true}>
                        Đang đặt chỗ...
                    </Text>
                    <Text style={{color: 'rgba(255,255,255,0.3)', fontSize: DIMENSION_TEXT_SUB}}>
                        Vui lòng đợi và tải lại trong giây lát!
                    </Text>
                </View>
            </View>
        )
    }
}

ContactingMerchant.propTypes = {
    noPublicPromoCode: PropTypes.bool
}

const styles = StyleSheet.create({
    singleButtonFillColor: {
        flex: 1,
        margin: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
})