import {BasePureComponent} from "../BasePureComponent";
import React from 'react'
import { Text } from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types'
import {
    COLOR_PRIMARY, COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE
} from "../../../resources/colors";

import JJIcon from "../../common/JJIcon";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";

export default class EmptyResultWithFilter extends BasePureComponent {

    render() {

        return (
            <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: DIMENSION_PADDING_MEDIUM}}>
                <View style={{
                    backgroundColor: 'rgba(240, 240, 240, 0.2)',
                    padding: 32,
                    borderRadius: 200,
                    borderWidth: 1,
                    borderColor: 'rgba(240, 240, 240, 0.2)',
                }}>
                    <View style={styles.circleNoData}>
                        <View style={styles.circleNoData}>
                            <JJIcon style={{ padding: 12 }}
                                    name={"search"}
                                    size={48}
                                    color={COLOR_TEXT_INACTIVE} />
                        </View>
                    </View>
                </View>

                {this._renderMessage()}

                {
                    this.props.filterCount > 0 &&   
                    <TouchableOpacity style={{
                        width: '100%',
                        height: DIMENSION_BUTTON_MEDIUM,
                        margin: DIMENSION_PADDING_MEDIUM,
                        borderColor: COLOR_PRIMARY,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}
                        onPress={this.props.onOpenFilter}>
                        <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                            XEM LẠI {this.props.filterCount} BỘ LỌC
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    _renderMessage = () => {
        if (!!this.props.keyword) {
            return (
                <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL}}>
                    Không tìm thấy khuyến mãi nào cho "<Text style={{fontWeight: 'bold'}}>{this.props.keyword}</Text>"
                </Text>
            )
        }
        return (
            <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL}}>
                Không tìm thấy khuyến mãi phù hợp
            </Text>
        )
    }
}

EmptyResultWithFilter.propTypes = {
    onOpenFilter: PropTypes.any,
    filterCount: PropTypes.any,
    keyword: PropTypes.any
}

const styles = StyleSheet.create({
    circleNoData: {
        padding: 16,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        borderRadius: 200,
        borderWidth: 1,
        borderColor: 'rgba(240, 240, 240, 0.3)'
    }
})