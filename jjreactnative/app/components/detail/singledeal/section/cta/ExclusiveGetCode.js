import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {
    COLOR_GRAY_BG,
    COLOR_PRIMARY,
    COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../../../resources/colors";
import DividerLine from "../../../../common/DividerLine";
import {DEAL_TYPE_EXCLUSIVE} from "../../../../../const";
import {Alert} from '../../../../common/alert/JJAlert'
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

export default class ExclusiveGetCode extends React.PureComponent {

    render() {

        if (!this.props.deal) return null;

        if (this.props.deal.get('stores') === undefined || this.props.deal.get('stores').size < 1) {
            return this._renderNotSupportLocation();
        }

        return (
            <View style={{backgroundColor: 'white'}}>
                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                <TouchableOpacity style={[styles.singleButtonFillColor, {backgroundColor: COLOR_PRIMARY}]}
                                  onPress={this._onExclusiveGetCodeClicked}>
                    <Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                        LẤY MÃ
                    </Text>
                    <Text style={{color: '#fa8893', fontSize: DIMENSION_TEXT_SUB}}>
                        Đã có {this.props.deal.get('get_count', 0)} người lấy mã
                    </Text>
                </TouchableOpacity>

                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _renderNotSupportLocation = () => {
        return (
            <View style={[styles.container, {marginTop: DIMENSION_PADDING_LARGE}]}>
                <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, paddingLeft: DIMENSION_PADDING_MEDIUM, paddingRight: DIMENSION_PADDING_MEDIUM}}>
                    {`Khuyến mãi này không áp dụng tại ${this.props.selectedProvinceName}. Vui lòng đổi khu vực để có thể đặt được chỗ.`}
                </Text>

                <View style={[styles.singleButtonUnFillColor, {backgroundColor: 'white', borderColor: COLOR_TEXT_INACTIVE_DISABLE, marginTop: DIMENSION_PADDING_LARGE}]}>
                    <Text style={{color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold', textAlign: 'center'}}
                          uppercase={true}>
                        {`Không áp dụng tại ${this.props.selectedProvinceName}`}
                    </Text>
                </View>
            </View>
        )
    }

    _onExclusiveGetCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'get_code_exclusive_alert',
            baseLogParams,
            'deal_detail'
        );

        Alert.alert(
            "XIN ĐỌC KỸ",
            this.props.deal.get('alert_message', 'Bạn đã đọc kỹ điều kiện áp dụng chưa?'),
            [
                {text: "HỦY", style: 'cancel'},
                {text: "ĐỒNG Ý & LẤY MÃ", onPress: this._onExclusiveConfirmGetCode},
            ]
        )
    }

    _onExclusiveConfirmGetCode = () => {
        if (this.props.listener) this.props.listener.onGetCodeClicked(DEAL_TYPE_EXCLUSIVE);
    }
}

ExclusiveGetCode.propTypes = {
    deal: PropTypes.object,
    listener: PropTypes.object,
    navigation: PropTypes.object,
    selectedProvinceName: PropTypes.string
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
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: DIMENSION_PADDING_LARGE,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM
    },
})