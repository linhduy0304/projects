import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    BackHandler,
    ScrollView, Clipboard
} from 'react-native';
import {Text, Container} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import FastImage from 'react-native-fast-image'

import {
    COLOR_PRIMARY, COLOR_GRAY_BG, COLOR_TEXT_INACTIVE, COLOR_LINE,
    COLOR_TEXT_BLACK_1
} from '../../../resources/colors';
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_X,
    DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import {getQRCodeUrl} from "../../../utils/Utils";
import {getPaddingTopBar, isIphoneBunnyEar} from "../../../utils/common-utils";
import JJIcon from '../../common/JJIcon'
import ButtonNormal from "../../common/button/ButtonNormal";
import RedeemGateWay from '../../redeemCode/RedeemGateway'
import {BasePureComponent} from "../../common/BasePureComponent";
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {Toast} from "../../common/alert/Toast";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const isIOS = Platform.OS === 'ios';
const paddingTopBar = getPaddingTopBar();
moment.locale('vi')

class ExclusiveGetCodeSuccess extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            copyText: 'Copy',
            modalVisible: false
        }
    }

    render() {
        let {coupon} = this.props.navigation.state.params;
        console.log('ExclusiveGetCodeSuccess:render', coupon.toJS());

        const expireDate = moment.utc(coupon.getIn(['deal', 'end_sale_time'], '')).local().format('HH:mm, DD/MM/YY');

        return (
            <Container>
                <View
                    style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
                    <FastImage
                        style={{width: '100%', height: '100%'}}
                        source={require('../../../resources/images/deal/bg_contacting_exclusive.png')}
                        resizeMode={FastImage.resizeMode.cover}/>

                </View>

                <View style={{
                    height: isIOS ? (isIphoneBunnyEar() ? 214 : 190) : 170,
                    width: '100%',
                    paddingTop: paddingTopBar,
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.handlePressBack()
                        }}
                        style={{
                            height: DIMENSION_BUTTON_MEDIUM,
                            width: DIMENSION_BUTTON_MEDIUM,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <JJIcon name={"x_o"}
                                size={16}
                                color={'white'}/>
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: DIMENSION_TEXT_HEADER,
                        color: 'white',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        padding: DIMENSION_PADDING_TINY
                    }}>
                        {`Chúc mừng bạn, ${coupon.get('user_name', '')}!\nBạn đã lấy mã ưu đãi thành công!`}
                    </Text>
                </View>

                <ScrollView style={styles.scrollContent}>

                    <View style={{
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 70,
                        paddingBottom: DIMENSION_PADDING_MEDIUM
                    }}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                            Mã khuyến mãi
                        </Text>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 4}} onPress={this._onCopyClicked}>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER_X, fontWeight: 'bold', marginRight: 2}}>
                                {coupon.get('code', '')}
                            </Text>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={10}
                                    name={'copy_o'}/>
                        </TouchableOpacity>
                        <View style={{height: 2, width: 76, backgroundColor: COLOR_PRIMARY}}/>
                    </View>

                    <View style={{backgroundColor: 'white', borderRadius: DIMENSION_RADIUS_LARGE}}>
                        <View style={styles.couponInfo}>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={14}
                                    name={'map_pin_o'}/>

                            <Text style={styles.textCouponInfoLabel}>
                                Cửa hàng
                            </Text>

                            <Text style={styles.textCouponInfoValue}>
                                {coupon.getIn(['deal', 'brand', 'brand_name'], '')}
                            </Text>
                        </View>

                        <View style={styles.couponInfo}>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={14}
                                    name={'calendar_o'}/>

                            <Text style={styles.textCouponInfoLabel}>
                                Hạn sử dụng
                            </Text>

                            <Text style={styles.textCouponInfoValue}>
                                {expireDate}
                            </Text>
                        </View>

                        <View style={[styles.couponInfo, {borderBottomColor: 'white'}]}>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={14}
                                    name={'gift_box_o'}/>

                            <Text style={styles.textCouponInfoLabel}>
                                Ưu đãi
                            </Text>

                            <Text style={[styles.textCouponInfoValue, {color: COLOR_PRIMARY, fontWeight: 'bold'}]}>
                                {coupon.getIn(['deal', 'highlight_title'], '')}
                            </Text>
                        </View>
                    </View>

                    <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB, width: '100%', textAlign: 'center', marginTop: DIMENSION_PADDING_MEDIUM}}>
                        Để nhận ưu đãi, bấm {' '}
                        <Text style={{color: COLOR_PRIMARY}}>
                            Sử dụng mã
                        </Text>
                        {' '} & làm theo hướng dẫn
                    </Text>

                    <ButtonNormal borderColor={COLOR_PRIMARY}
                                  fillColor={COLOR_PRIMARY}
                                  textColor={'white'}
                                  text={'SỬ DỤNG MÃ'}
                                  onPress={this._onRedeemCodeClicked}
                                  style={{marginTop: DIMENSION_PADDING_MEDIUM, width: '100%'}}/>

                </ScrollView>

                <View style={[styles.qrCodeContainerBackground, {top: isIOS ? (isIphoneBunnyEar() ? 148 : 118) : 108}]}>
                    <TouchableOpacity onPress={this._onOpenQRCodePreview}
                                      style={styles.qrCodeBackground}>
                        <FastImage
                            source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(coupon.get('code', ''), 144))}
                            style={{height: 72, width: 72}}
                            resizeMode={FastImage.resizeMode.contain}/>

                    </TouchableOpacity>
                </View>

                <RedeemGateWay deal={coupon.get('deal')}
                               navigation={this.props.navigation}
                               visible={this.state.modalVisible}
                               onCloseModal={() => this.setState({modalVisible: false})}
                               onRedeemSuccess={this._onRedeemSuccess}/>
            </Container>
        )
    }

    _onCopyClicked = () => {
        let {coupon} = this.props.navigation.state.params;
        Clipboard.setString(coupon.get('code', ''));
        Toast.showToast('Đã Copy');
    }

    _onRedeemSuccess = () => {
        this.setState({modalVisible: false});
        this.props.navigation.pop(3)
    }

    _onOpenQRCodePreview = () => {
        let {coupon} = this.props.navigation.state.params;
        if (!coupon) return;

        let qrcode = coupon.get('code', '');
        if (qrcode === undefined || qrcode === null) return;

        AnalyticsUtil.logNormalEvent(
            'open_qr_code_preview',
            {
                action_location: 'booking_return_code',
                action_name: 'click_qr_code_image',
                qr: qrcode
            },
            'action_coupon'
        )

        this.props.navigation.navigate('QRCodePreview', {qrCode: qrcode});
    }

    _onRedeemCodeClicked = () => {
        this.setState({modalVisible: true})

        let {coupon} = this.props.navigation.state.params;
        if (coupon === undefined || coupon === null) return;
        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'exclusive_return_code',
                action_name: 'click_redeem_button',
                coupon: coupon.get('id', '')
            },
            'action_coupon'
        )
    }

    componentDidMount() {
        super.componentDidMount();
        BackHandler.addEventListener('hardwareBackPress', this.handlePressBack);

        const {coupon} = this.props.navigation.state.params;
        AnalyticsUtil.logCurrentScreen(
            'exclusive_return_code',
            {
                item_id: coupon.getIn(['deal', 'slug'], ''),
                item_name: coupon.getIn(['deal', 'slug'], ''),
                item_brand: coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
                deal_type: coupon.getIn(['deal', 'deal_type'], ''),
                coupon: coupon.get('id', '')
            }
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handlePressBack);
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        // this.state.modalVisible = nextProps.visible;
        // if (nextProps.couponRedeemSuccess !== undefined && nextProps.couponRedeemSuccess !== null) {
        //     this.props.navigation.pop(2);
        // }
    }

    handlePressBack = () => {
        this.props.navigation.pop(2);
        return true;
    }
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        backgroundColor: COLOR_GRAY_BG,
    },
    qrCodeBackground: {
        height: 124,
        width: 124,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLOR_PRIMARY,
        borderRadius: 62,
        borderWidth: 8,
        backgroundColor: COLOR_GRAY_BG
    },
    couponInfo: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_LINE,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textCouponInfoLabel: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT,
        marginLeft: DIMENSION_PADDING_TINY
    },
    textCouponInfoValue: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT,
        textAlign: 'right',
        flex: 1,
        fontWeight: 'bold'
    },
    qrCodeContainerBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent'
    }
});

export default connect()(ExclusiveGetCodeSuccess);