import React from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    View,
    Platform,
    TouchableOpacity,
    TextInput,
    // Alert,
    AsyncStorage,
    FlatList,
    TouchableWithoutFeedback,
    NetInfo
} from 'react-native';
import { COLOR_TEXT_INACTIVE, COLOR_TEXT_GRAY, COLOR_GREEN } from '../../resources/colors';
import { DIMENSION_RADIUS_LARGE, DIMENSION_TEXT_CONTENT } from '../../resources/dimens';
import JJHeader from '../../components/common/JJHeader';
import JJIcon from '../../common/view/icon/JJIcon';
import LoadingViewPopUp from '../../common/view/loading/LoadingViewPopup';
import { fromJS } from 'immutable';
import ModalBox from 'react-native-modalbox';
import AddressModal from './AddressModal';
import { bookingApi } from '../../api/booking-api';
import { storeApi } from '../../api/store-api';
import { getErrorMessage } from '../../utils/text-message';
import { Spinner } from 'native-base';
import PartnerRow from './PartnerRow';
import PromotionInput from './PromotionInput';
import { ObjectUtil } from '../../utils/object-utils';
import { BaseComponent } from '../../common/base/BaseComponent';
import ButtonFilled from '../../common/view/button/ButtonFilled';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Text from '../../common/view/text/JJText';
import { AnalyticsUtil } from '../../components/common/analytics/analytics';
import { styles } from './style';
import Alert from '../../common/view/alert/Alert';
export default class DeliveryConfirm extends BaseComponent {
    SCREEN = 'DeliveryConfirm';
    coupon;

    constructor(props) {
        super(props);

        this.coupon = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'coupon']);
        if (!!this.coupon) {
            props.navigation.state.params.couponId = this.coupon.get('id');
        }

        this.state = {
            note: '',
            address: '',
            long: null,
            lat: null,
            addressNote: '',
            promotionCode: {},
            isEstimating: false,
            isGettingCode: false
        };
    }

    componentDidMount = () => {
        super.componentDidMount();
        this.getMenuImages();
    };

    getMenuImages = () => {
        storeApi
            .getStoreDetail(this.coupon.getIn(['store', 'id'], ''))
            .then(response => {
                this.setState({
                    menuImages: fromJS(response.menu_images)
                });

                console.debug();
            })
            .catch(error => {});
    };

    getDeliveryEstimateFee = () => {
        const { coupon } = this.props.navigation.state.params;

        this._track('get_estimate_fee', this.state.address);
        bookingApi
            .getDeliveryEstimateFee({
                coupon_id: coupon.get('id'),
                address: this.state.address,
                latitude: this.state.lat,
                longitude: this.state.long
                // promocode_id: this.state.promotionCode
            })
            .then(response => {
                if (!response || !response.objects[0]) {
                    this._track('get_estimate_fee_empty', this.state.address);

                    this.setState(
                        {
                            isEstimating: false,
                            address: '',
                            long: null,
                            lat: null,
                            partnersList: null,
                            partner: null,
                            promotionCode: {}
                        },
                        () => {
                            this.refs.alert.show(
                                'Thông báo',
                                'Nhờ mua hộ tạm thời chưa hỗ trợ giao tới địa chỉ này. Vui lòng chọn địa chỉ nhận hàng khác!',
                                [
                                    {
                                        title: 'OK',
                                        isHighlight: true,
                                        onPress: () => {}
                                    }
                                ]
                            );
                        }
                    );
                    return;
                } else {
                    this.setState(
                        {
                            partnersList: response.objects,
                            partner: response.objects[0],
                            isEstimating: false
                        },
                        () => {
                            this.refs.addressModal.close();
                            setTimeout(() => {
                                if (!!this.state.promotionCode.id) {
                                    this.applyCode(this.state.promotionCode.name);
                                }
                            }, 500);
                        }
                    );
                }
            })
            .catch(error => {
                this.setState(
                    {
                        isEstimating: false,
                        address: '',
                        long: null,
                        lat: null
                    },
                    () => {
                        this.refs.alert.show('Thông báo', getErrorMessage(error), [
                            {
                                title: 'OK',
                                isHighlight: true,
                                onPress: () => {}
                            }
                        ]);
                        // Alert.alert('Thông báo', getErrorMessage(error));
                    }
                );
            });
    };

    applyCode = code => {
        const { coupon } = this.props.navigation.state.params;
        this.setState({
            isGettingCode: true
        });

        this._track('apply_delivery_promo_code', code);

        const { address, lat, long, partner } = this.state;
        bookingApi
            .getDeliveryApplyPromocode({
                code_name: code,
                coupon_id: coupon.get('id'),
                address,
                latitude: lat,
                longitude: long,
                partner: partner.partner_name
            })
            .then(response => {
                // console.log(response);
                this.setState({
                    isGettingCode: false,
                    promotionCode: {
                        id: response.id,
                        price: response.final_price,
                        name: response.code_name
                    }
                });

                this._track('apply_delivery_promo_code_success', code);
            })
            .catch(error => {
                this._track('apply_delivery_promo_code_failure', code);
                this.refs.alert.show('Thông báo', getErrorMessage(error), [
                    {
                        title: 'OK',
                        isHighlight: true,
                        onPress: () => {}
                    }
                ]);
                this.setState({
                    isGettingCode: false
                });
            });
    };

    getAddress = async (address, lat, long) => {
        try {
            this.setState(
                {
                    address,
                    lat,
                    long,
                    isEstimating: true
                },
                () => {
                    this.getDeliveryEstimateFee();
                }
            );

            const ret = await AsyncStorage.getItem('LocationHistory');
            if (!!ret) {
                let locationHistory = JSON.parse(ret);
                if (locationHistory.filter(el => el.address === address).length == 0) {
                    locationHistory = [{ address, lat, long }, ...locationHistory];
                    await AsyncStorage.setItem('LocationHistory', JSON.stringify(locationHistory));
                }
            } else {
                const historyArray = [{ address, lat, long }];
                await AsyncStorage.setItem('LocationHistory', JSON.stringify(historyArray));
            }
        } catch (error) {
            this.refs.alert.show('Thông báo', getErrorMessage(error), [
                {
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {}
                }
            ]);
        }
    };

    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const { deal, coupon } = this.props.navigation.state.params;
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
                <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                    <JJHeader
                        navigation={this.props.navigation}
                        showSearchBar={false}
                        customTitleView={this.renderHeader}
                        overrideGoBack={true}
                        onGoBackAction={this.goBack}
                        leftIconColor={COLOR_TEXT_INACTIVE}
                    />

                    {/* </ScrollView> */}
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            ref="scrollView"
                            keyboardShouldPersistTaps={'always'}
                            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
                        >
                            <View>
                                <View style={styles.locationSection}>
                                    <View style={{ alignItems: 'center' }}>
                                        <JJIcon name="shop_o" size={20} color={COLOR_TEXT_GRAY} />
                                        <View style={{ marginVertical: 2 }}>
                                            <View style={styles.dash} />
                                            <View style={styles.dash} />
                                            <View style={styles.dash} />
                                        </View>
                                        <JJIcon name="map_pin_o" size={20} color={COLOR_GREEN} />
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: 17,
                                            justifyContent: 'space-between',
                                            flex: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingHorizontal: 16,
                                                fontSize: 14,
                                                marginBottom: 16,
                                                color: '#454545'
                                            }}
                                        >
                                            {deal.get('booking_store')}
                                        </Text>
                                        {!!this.state.address && this.state.address != '' && (
                                            <TouchableOpacity
                                                style={styles.locationInput}
                                                onPress={this._openAddressPicker}
                                                disabled={this.state.isGettingCode == true || this.state.isEstimating == true}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#454545',
                                                        fontWeight: 'bold',
                                                        includeFontPadding: false
                                                    }}
                                                >
                                                    {this.state.address}
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        {(!this.state.address || this.state.address === '') && (
                                            <TouchableOpacity
                                                style={styles.locationInput}
                                                onPress={this._openAddressPicker}
                                                activeOpacity={0.8}
                                                disabled={this.state.isGettingCode == true || this.state.isEstimating == true}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#D8D8D8',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    Nhập địa chỉ giao hàng đến ...
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        {this.renderAdressNote()}
                                    </View>
                                </View>

                                {this.renderPartnerSection()}
                                {!!this.state.partner && (
                                    <PromotionInput
                                        isGettingCode={this.state.isGettingCode}
                                        getCode={this.applyCode}
                                        code={this.state.promotionCode}
                                        clearPromoCode={this._onClearPromoCode}
                                    />
                                )}
                            </View>
                        </ScrollView>
                        <View style={styles.sectionContainer}>
                            <ButtonFilled
                                title={'CHỌN MÓN'}
                                textColor={'white'}
                                backgroundColor={'#22C300'}
                                enable={
                                    !!this.state.address &&
                                    !!this.state.partner &&
                                    !!this.state.partner.partner_name &&
                                    !this.state.isGettingCode &&
                                    !this.state.isEstimating
                                }
                                style={{
                                    opacity: !!this.state.address && !!this.state.partner && !!this.state.partner.partner_name ? 1 : 0.5
                                }}
                                onPress={this._openPickMenuPress}
                            />
                        </View>
                    </KeyboardAvoidingView>

                    <ModalBox
                        style={{
                            height: '90%',
                            borderTopLeftRadius: DIMENSION_RADIUS_LARGE,
                            borderTopRightRadius: DIMENSION_RADIUS_LARGE,
                            position: 'relative'
                        }}
                        backButtonClose={true}
                        swipeThreshold={10}
                        swipeArea={100}
                        position={'bottom'}
                        ref={'addressModal'}
                        backdropPressToClose={false}
                        onOpened={() => {
                            console.log('open');
                        }}
                        keyboardTopOffset={Platform.OS === 'ios' ? 60 : 0}
                        backdropContent={
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                onPress={() => this.refs.addressModal.close()}
                            />
                        }
                    >
                        <AddressModal
                            locationStore={coupon.get('store', '')}
                            getAddress={this.getAddress}
                            currentAddress={this.state.address}
                            onTrackingTrigger={this._track}
                        />
                        <LoadingViewPopUp visible={this.state.isEstimating} />
                    </ModalBox>
                    <Alert ref={'alert'} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderHeader = () => {
        const { deal } = this.props.navigation.state.params;
        return (
            <View>
                <Text style={styles.subHeader}>{deal.getIn(['brand', 'brand_name'])}</Text>
                <Text style={styles.mainHeader}>XÁC NHẬN NHỜ MUA HỘ</Text>
            </View>
        );
    };

    renderAdressNote = () => {
        if (!!this.state.address && this.state.address != '') {
            return (
                <View>
                    <TextInput
                        style={{
                            paddingVertical: 6,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            marginTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e1e1e1'
                        }}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ addressNote: text })}
                        value={this.state.addressNote}
                        multiline={true}
                        maxLength={100}
                        placeholder="Thêm ghi chú địa điểm (ngõ, ngách, ...)"
                    />
                </View>
            );
        }
    };

    renderPartnerSection = () => {
        if (!!this.state.isEstimating && this.state.isEstimating === true) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <Spinner color={COLOR_TEXT_INACTIVE} size={1} />
                </View>
            );
        }
        if (!!this.state.partnersList && this.state.isEstimating === false) {
            return (
                <View style={{ padding: 16, paddingTop: 0 }}>
                    <Text style={styles.shippingPrice}>Phí mua hộ ({Number.parseFloat(this.state.partner.estimate_distance).toFixed(1)}km)</Text>
                    <FlatList
                        bounces={false}
                        data={this.state.partnersList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `partner_${index}`}
                        horizontal={true}
                        extraData={this.state.promotionCode}
                        renderItem={({ item }) => <PartnerRow item={item} promotionPrice={this.state.promotionCode.price} />}
                    />
                </View>
            );
        }
    };

    _onClearPromoCode = () => {
        if (!!ObjectUtil.getValue(this.state, undefined, ['promotionCode', 'promotion_id'])) {
            this._track('clear_promotion_code_applied', ObjectUtil.getValue(this.state, undefined, ['promotionCode', 'name']));
        }

        this.setState({
            promotionCode: {}
        });
    };

    _openAddressPicker = () => {
        !!this.refs.addressModal && this.refs.addressModal.open();
        this._track('open_address_popup_picker');
    };

    _openPickMenuPress = () => {
        const { partner, promotionCode, address, lat, long, addressNote } = this.state;

        const deliveryInfo = {
            partner: partner,
            promoCode: promotionCode,
            address: address,
            addressNote: addressNote,
            lat: lat,
            long: long
        };

        this._track('open_pickup_menu');

        this.props.navigation.navigate('DeliveryPickMenu', {
            coupon: this.coupon,
            deliveryInfo: fromJS(deliveryInfo),
            from: ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from']) + '_order'
        });
    };

    _track = (action, value) => {
        if (!this.coupon) return {};
        const params: ServiceInteractionModel = {};
        params.screen_name = this.SCREEN;
        params.item_id = this.coupon.getIn(['deal', 'slug']);
        params.item_brand = this.coupon.getIn(['deal', 'brand', 'brand_slug']);
        params.item_category = this.coupon.getIn(['deal', 'deal_type']);
        params.interaction_type = action;
        if (!!value) {
            params.interaction_value = value;
        }
        params.coupon_id = this.coupon.get('id');

        AnalyticsUtil.trackDeliveryServiceInteraction(params);
    };
}
