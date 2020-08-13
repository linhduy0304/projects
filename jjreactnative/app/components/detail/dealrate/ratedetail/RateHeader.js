import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/BaseComponent";
import {Text} from "native-base";
import {StyleSheet, View} from "react-native";
import JJIcon from "../../../common/JJIcon";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {StringUtil} from "../../../../utils/string-util";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../resources/colors";
import DividerLine from "../../../common/DividerLine";
import StarRating from "react-native-star-rating";
import RowRate from "./ratedealdetail/RowRate";

export default class RateHeader extends BaseComponent {

    render() {

        const {brandName, meta} = this.props;
        if (StringUtil.isEmpty(brandName) || !meta) return null;

        return (
            <View style={{flex: 1}}>
                {/* Brand Name */}
                <Text style={styles.brandName}>
                    {brandName}
                </Text>
                {/* Number rate */}
                <View style={styles.rateWrapper}>
                    <View style={styles.buttonRate}>
                        <JJIcon name={"star_full"} size={16} color='white' />
                        <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                            {StringUtil.numberFixed(meta.rate_average, 1)}
                        </Text>
                        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: DIMENSION_TEXT_SUB }}>
                            /5
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT }}>
                            {meta.total_rate} đánh giá
                        </Text>
                        <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB }}>
                            Từ {meta.unique_rated_count} người dùng JAMJA
                        </Text>
                    </View>
                </View>

                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                <View style={{ padding: DIMENSION_PADDING_MEDIUM }}>

                    <View style={styles.rowRate}>
                        <StarRating
                            disabled={true}
                            containerStyle={{ justifyContent: 'flex-start' }}
                            buttonStyle={{ paddingRight: 2 }}
                            maxStars={5}
                            starSize={14}
                            fullStarColor={'#ef863b'}
                            emptyStarColor={'#ef863b'}
                            rating={meta.rate_average}
                        />
                        <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_MEDIUM }}>
                            {meta.total_rate} đánh giá
                        </Text>
                    </View>

                    <View>
                        {
                            meta.count_by_rate_value
                                .sort(function (a, b) { return b._id - a._id })
                                .map((item, i) => {
                                    return <RowRate
                                        key={'rate_by_deal_' + item._id}
                                        item={item}
                                        total={meta.total_rate}/>
                                })
                        }
                    </View>
                </View>

                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
                <Text style={styles.description}>
                    Điểm đánh giá qua JAMJA trên đây là điểm đánh giá từ những người sử dụng đã trực tiếp trải nghiệm sản phẩm, dịch vụ tại cửa hàng của
                    {' ' + brandName}
                    , thông qua JAMJA
                </Text>
                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.meta !== undefined && this.props.meta === undefined;
    }
}

RateHeader.propTypes = {
    brandName: PropTypes.any,
    meta: PropTypes.any,
    rateByBrand: PropTypes.any
}

const styles = StyleSheet.create({
    rowRate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandName: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1
    },
    buttonRate: {
        flexDirection: 'row',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: COLOR_PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM - 4,
        paddingRight: DIMENSION_PADDING_MEDIUM - 4,
        marginRight: DIMENSION_PADDING_MEDIUM,
    },
    rateWrapper: {
        flexDirection: 'row',
        padding: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center'
    },
    description: {
        padding: DIMENSION_PADDING_MEDIUM,
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_SUB,
        textAlign: 'justify'
    },
});