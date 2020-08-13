import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import NormalDeal from './cta/NormalDeal';
import EcouponDeal from './cta/EcouponDeal';
import ExclusiveGetCode from './cta/ExclusiveGetCode';
import TimebaseBooking from './cta/TimebaseBooking';
import CodeHasGotten from './cta/CodeHasGotten';
import ContactingMerchant from './cta/ContactingMerchant';
import { DEAL_TYPE_ECOUPON, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE, STATUS_WAIT_FOR_MERCHANT } from '../../../../const';
import PromoCode from './cta/PromoCode';
import { BaseComponent } from '../../../common/BaseComponent';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from '../../../../resources/dimens';
import { COLOR_GRAY_BG, COLOR_TEXT_INACTIVE } from '../../../../resources/colors';
import DividerLine from '../../../common/DividerLine';
import { StringUtil } from '../../../../utils/string-util';
import FlashSaleOnlyHeaderSection from './flashSale/FlashSaleOnlyHeaderSection';
import BookMoreTicket from './cta/BookMoreTicket';

export default class CTASection extends BaseComponent {
    render() {
        if (!this.props.deal) return null;

        if (
            this.props.deal.get('status', 0) !== 1 &&
            (StringUtil.isBlank(this.props.deal.get('coupon_id')) || !this.props.deal.get('is_get', false))
        ) {
            return this._renderDealExpiredIfNeed();
        }

        const dealType = this.props.deal.get('deal_type', '');
        if (
            this.props.deal.get('is_get', false) &&
            this.props.deal.get('code_status', 0) !== STATUS_WAIT_FOR_MERCHANT &&
            dealType === DEAL_TYPE_MOVIE
        ) {
            if (!!this.props.bookedTicket) {
                return this._renderCTA(
                    <BookMoreTicket
                        navigation={this.props.navigation}
                        deal={this.props.deal}
                        openModal={this.props.onPressTicket}
                        bookedTicket={!!this.props.bookedTicket ? this.props.bookedTicket.toJS() : []}
                        totalTicket={this.props.totalTicket}
                    />
                );
            }
        }

        if (
            this.props.deal.get('is_get', false) &&
            this.props.deal.get('code_status', 0) !== STATUS_WAIT_FOR_MERCHANT &&
            dealType !== DEAL_TYPE_MOVIE
        ) {
            return this._renderCTA(
                <View>
                    {!!this.props.flashSale && (
                        <FlashSaleOnlyHeaderSection
                            time={this.props.flashSale.get('count_down_time')}
                            numberUnit={this.props.deal.get('hint_text')}
                            totalNumber={this.props.flashSale.get('totalSlot')}
                            availableNumber={this.props.flashSale.get('totalSlotAvailable', 0)}
                            highlight={this.props.flashSale.get('highlight', '')}
                            active={this.props.flashSale.get('active', false)}
                            onTimeOut={this._onFlashSaleTimeOut}
                        />
                    )}
                    <CodeHasGotten
                        listener={this.props.listener}
                        navigation={this.props.navigation}
                        deal={this.props.deal}
                        noPublicPromoCode={!this.props.deal.get('promocode')}
                        isBookingDeal={dealType === DEAL_TYPE_LAST_MIN || dealType === DEAL_TYPE_MOVIE}
                    />
                </View>
            );
        }

        if (dealType === DEAL_TYPE_ECOUPON) {
            return this._renderCTA(<EcouponDeal deal={this.props.deal} navigation={this.props.navigation} />);
        }

        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            return this._renderCTA(
                <ExclusiveGetCode
                    deal={this.props.deal}
                    navigation={this.props.navigation}
                    listener={this.props.listener}
                    selectedProvinceName={this.props.selectedProvinceName}
                />
            );
        }

        if (dealType === DEAL_TYPE_LAST_MIN || dealType === DEAL_TYPE_MOVIE) {
            const codeStatus = this.props.deal.get('code_status');
            if (codeStatus === STATUS_WAIT_FOR_MERCHANT) {
                return this._renderCTA(<ContactingMerchant noPublicPromoCode={!this.props.deal.get('promocode')} />);
            } else {
                return this._renderCTA(
                    <TimebaseBooking
                        navigation={this.props.navigation}
                        deal={this.props.deal}
                        timebaseBooking={this.props.timebaseBooking}
                        flashSale={this.props.flashSale}
                        listener={this.props.listener}
                        selectedProvinceName={this.props.selectedProvinceName}
                    />
                );
            }
        }

        return this._renderCTA(<NormalDeal navigation={this.props.navigation} deal={this.props.deal} />);
    }

    _renderCTA = child => {
        return (
            <View style={{ flexDirection: 'column' }}>
                {this._renderPromoCodeIfNeed()}
                {child}
            </View>
        );
    };

    _renderDealExpiredIfNeed = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <DividerLine style={{ marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM }} />

                <View style={styles.buttonExpired}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }} uppercase={true}>
                        Đã hết hạn
                    </Text>
                </View>
                <View style={{ backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE }} />
            </View>
        );
    };

    _renderPromoCodeIfNeed = () => {
        if (!this.props.deal.getIn(['promocode', 'id'])) return null;
        return <PromoCode navigation={this.props.navigation} deal={this.props.deal} listener={this.props.listener} />;
    };

    _onFlashSaleTimeOut = () => {
        !!this.props.listener && !!this.props.listener.onTimeOutFlashSaleCountDown && this.props.listener.onTimeOutFlashSaleCountDown();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('CTASection:componentDidUpdate', !!this.props.timebaseBooking ? this.props.timebaseBooking.toJS() : undefined);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.flashSale && !this.props.flashSale) return true;
        if (!nextProps.flashSale && !!this.props.flashSale) return true;
        if (!!nextProps.flashSale && !nextProps.flashSale.equals(this.props.flashSale)) return true;
        if (!!nextProps.bookedTicket && !nextProps.bookedTicket.equals(this.props.bookedTicket)) return true;
        if (nextProps.totalTicket !== this.props.totalTicket) return true;

        return (
            nextProps.deal.get('is_get', 0) !== this.props.deal.get('is_get', 0) ||
            nextProps.deal.get('status', 0) !== this.props.deal.get('status', 0) ||
            nextProps.deal.get('code_status', 0) !== this.props.deal.get('code_status', 0) ||
            nextProps.deal.get('code', '') !== this.props.deal.get('code', '') ||
            (nextProps.timebaseBooking !== undefined && !nextProps.timebaseBooking.equals(this.props.timebaseBooking))
        );
    }
}

CTASection.propTypes = {
    deal: PropTypes.object,
    timebaseBooking: PropTypes.object,
    flashSale: PropTypes.object,
    isLoginned: PropTypes.bool,
    listener: PropTypes.object,
    navigation: PropTypes.object,
    selectedProvinceName: PropTypes.string,
    bookedTicket: PropTypes.object,
    totalTicket: PropTypes.number,
};

const styles = StyleSheet.create({
    buttonExpired: {
        flex: 1,
        margin: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: COLOR_TEXT_INACTIVE,
        borderWidth: 1
    }
});
