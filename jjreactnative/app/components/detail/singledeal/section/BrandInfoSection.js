import { Text } from 'native-base';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'
import {CommonUtil} from '../../../../utils/common-utils'

import {
    COLOR_GRAY_BG,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE,
} from '../../../../resources/colors';
import JJIcon from '../../../common/JJIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_UNDER_TINY
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from '../../../../utils/string-util'
import BrandInfoPriceView from './BrandInfoPriceView'
import BrandInfoFoodyValueView from './BrandInfoFoodyValueView'

export default class BrandInfoSection extends BaseComponent {

    render() {

        console.log('BrandInfoSection:render:', this.props)

        const following = this.props.deal.get('is_following', false);
        const tag = !!this.props.deal.getIn(['brand', 'tags']) ? CommonUtil.getBrandTags(this.props.deal.getIn(['brand', 'tags']).toJS()) : undefined;
        return (
            <View style={{width: '100%'}}>
                <View style={{ backgroundColor: 'white', padding: DIMENSION_PADDING_MEDIUM }}>

                    <Text style={styles.brandName}>
                        {this.props.deal.getIn(['brand', 'brand_name'])}
                    </Text>

                    <View style={styles.info}>

                        <Text style={[styles.textInfo, { flex: 1, textAlign: 'right' }]}>
                            {tag}
                        </Text>

                        {
                            !!tag &&
                            <Icon name={"circle"} size={4} color={COLOR_TEXT_INACTIVE} />
                        }

                        <BrandInfoPriceView price={this.props.deal.getIn(['brand', 'price'], '')}/>

                        <Icon name={"circle"} size={4} color={COLOR_TEXT_INACTIVE} />

                        <Text style={[styles.textInfo, { flex: 1 }]}>
                            {StringUtil.numberFormat(this.props.deal.getIn(['brand', 'follow_count'], 0))} theo dõi
                        </Text>
                    </View>

                    <BrandInfoFoodyValueView onOpenFoodyReviewClicked={this.props.onOpenFoodyReviewClicked}
                                             point={this.props.deal.getIn(['foody_review', 'point'], 0)}/>

                    <View style={styles.action}>
                        {/* Follow */}
                        <TouchableOpacity
                            style={[styles.button, { marginRight: 8, borderColor: following ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE }]}
                            onPress={this.props.onFollowBrandClicked}>
                            <JJIcon
                                name={"plus_o"}
                                size={12}
                                color={following ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE} />
                            <Text
                                style={[styles.labelButton,
                                    { color: following ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE }
                                ]}>
                                {following ? 'Đang theo dõi' : 'Theo dõi'}
                            </Text>
                        </TouchableOpacity>

                        {/* About brand */}
                        <TouchableOpacity
                            style={[styles.button, { marginLeft: 8 }]}
                            onPress={this.props.onOpenBrandDetailClicked}>
                            <Text style={styles.labelButton}>
                                Về thương hiệu
                            </Text>
                            <JJIcon name={"chevron_right_o"}
                                    size={DIMENSION_TEXT_UNDER_TINY}
                                    color={COLOR_TEXT_INACTIVE} />
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE }} />
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.deal) return false;
        if (!this.props.deal === undefined) return false;
        if (nextProps.deal.get('is_following') !== this.props.deal.get('is_following')) return true;
        return false;
    }
}

BrandInfoSection.propTypes = {
    deal: PropTypes.any,
    onFollowBrandClicked: PropTypes.any,
    onOpenFoodyReviewClicked: PropTypes.any,
    onOpenBrandDetailClicked: PropTypes.any

}

const styles = StyleSheet.create({
    brandName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLOR_TEXT_BLACK_1,
        alignSelf: 'center'
    },
    info: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: 14,
        padding: 4
    },
    action: {
        flexDirection: 'row',
        paddingTop: 8,
    },
    button: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flex: 1,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderColor: COLOR_TEXT_INACTIVE,
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        height: DIMENSION_BUTTON_SMALL,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton: {
        color: COLOR_TEXT_INACTIVE,
        marginRight: 8,
        marginLeft: 8,
        fontSize: 14
    }
});

