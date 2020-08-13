import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/BaseComponent";
import {
    DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import DividerLine from "../../../common/DividerLine";
import {TouchableOpacity, View} from "react-native";
import {COLOR_LINE, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE} from "../../../../resources/colors";
import {Text} from "native-base";

export default class BrandInfoFoodyValueView extends BaseComponent {

    render() {
        if (!this.props.point || this.props.point <= 0) return null;
        return (
            <View style={{ marginBottom: DIMENSION_PADDING_SMALL, marginTop: DIMENSION_PADDING_TINY, justifyContent: 'center' }}>
                <DividerLine style={{ position: 'absolute', width: '100%' }} />
                <TouchableOpacity
                    underlayColor={'white'}
                    onPress={this.props.onOpenFoodyReviewClicked}
                    style={{
                        paddingRight: DIMENSION_PADDING_MEDIUM,
                        height: DIMENSION_BUTTON_SMALL,
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        borderWidth: 1,
                        borderColor: COLOR_LINE,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                        Foody
                        <Text style={{ color: this.props.point >= 6  ? '#4BC731' : '#e52402', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER }}>
                            {' ' + this.props.point}
                        </Text>
                        <Text style={{ color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_SUB }}>
                            /10
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.point !== this.props.point;
    }
}

BrandInfoFoodyValueView.propTypes = {
    point: PropTypes.any,
    onOpenFoodyReviewClicked: PropTypes.any
}