import React  from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { Text, Container} from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';

import JJHeader from '../../common/JJHeader';
import {
    COLOR_GRAY_BG, COLOR_GRAY_BG_2, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_HINT, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from '../../../resources/colors';
import DividerLine from '../../common/DividerLine';
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import JJIcon from '../../common/JJIcon'
import {UserDb} from "../../../api/storage/UserDb";
import LoadingViewPopup from "../../../common/view/loading/LoadingViewPopup";
import {couponApi} from '../../../api/coupon-api'
import {dealApi} from '../../../api/deal-api'
import {couponChangeAction} from "./action";
import {fromJS, Map} from "immutable";
import {BasePureComponent} from "../../common/BasePureComponent";
import {StringUtil} from '../../../utils/string-util'
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {calculateDistance} from "../../../utils/LocationUtils";
import {updateUser} from "../../login/action";
import {Alert} from '../../common/alert/JJAlert'
import {CouponDb} from "../../../api/storage/CouponDb";
import {ERROR_AUTH_MESSAGE} from "../../../const";
import {validateEmail, validatePhoneNumber} from '../../../utils/validation-util';

const isIOS = Platform.OS === 'ios';
moment.locale('vi');

class ExclusiveGetCode extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            stores: undefined,
            selectedStore: undefined,
            full_name: props.user.contact_info_full_name,
            phone_number: props.user.contact_info_phone_number,
            email: props.user.contact_info_email,
            other: '',
            isLoading: false,
            isLoadingStore: false
        }
    }

    render() {
        const inputPadding = isIOS ? { paddingTop: DIMENSION_PADDING_TINY, paddingBottom: DIMENSION_PADDING_MEDIUM } : null;
        const enableConfirmButton = this._isReadyInput(); 
        return (
            <Container>
                {/* Toolbar */}
                <JJHeader
                    navigation={this.props.navigation}
                    customTitleView={() => {return this._renderHeaderTitle()}}
                    onGoBackAction={this._onGoBackClicked}
                />

                {/* Content */}
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    style={{ flex: 1, backgroundColor: COLOR_GRAY_BG, justifyContent: 'center'}}>

                    <ScrollView
                        ref="scrollView"
                        style={{ flex: 1, marginBottom: DIMENSION_BUTTON_MEDIUM + DIMENSION_PADDING_MEDIUM + DIMENSION_PADDING_SMALL }}>

                        {/* Select Store If Need */}
                        {this._renderSelectStoreIfNeed()}

                        {/* Body 1*/}
                        <Text style={styles.textHeader}>
                            THÔNG TIN KHÁCH HÀNG
                        </Text>

                        <View style={{ backgroundColor: 'white' }}>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.edtDescription}>
                                    Họ và tên
                                    <Text style={{color: COLOR_PRIMARY}}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    placeholder='Họ và tên'
                                    placeholderTextColor={COLOR_TEXT_INACTIVE_DISABLE}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    maxLength={100}
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                    onChangeText={this._onUserInputChange}
                                    onSubmitEditing={this._onSubmitUserNameInput}
                                    value={this.state.full_name}
                                    style={[styles.textInput, inputPadding]} />

                            </View>

                            <DividerLine style={{ marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM }} />

                            <View style={styles.textInputContainer}>
                                <Text style={styles.edtDescription}>
                                    Điện thoại liên hệ
                                    <Text style={{color: COLOR_PRIMARY}}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    ref='edtPhoneNumber'
                                    placeholder='Số điện thoại'
                                    placeholderTextColor={COLOR_TEXT_INACTIVE_DISABLE}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    maxLength={20}
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                    keyboardType={'phone-pad'}
                                    onChangeText={this._onPhoneInputChange}
                                    onSubmitEditing={this._onSubmitPhoneInput}
                                    value={this.state.phone_number}
                                    style={[styles.textInput, inputPadding]} />

                            </View>

                            <DividerLine style={{ marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM }} />

                            <View style={styles.textInputContainer}>
                                <Text style={styles.edtDescription}>
                                    Email
                                    <Text style={{color: COLOR_PRIMARY}}>
                                        *
                                    </Text>
                                </Text>
                                <TextInput
                                    ref='edtEmail'
                                    placeholder='Email'
                                    placeholderTextColor={COLOR_TEXT_INACTIVE_DISABLE}
                                    keyboardType={'email-address'}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    fontSize={DIMENSION_TEXT_CONTENT}
                                    maxLength={50}
                                    returnKeyType={'done'}
                                    autoCapitalize={'none'}
                                    onChangeText={this._onEmailInputChange}
                                    value={this.state.email}
                                    style={[styles.textInput, inputPadding]} />
                            </View>
                        </View>

                        {/* Footer */}
                        <Text style={styles.textHeader}>
                            THÔNG TIN THÊM
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: 'white',
                                textAlignVertical: "top",
                                height: 120,
                                padding: DIMENSION_PADDING_MEDIUM,
                                marginBottom: DIMENSION_PADDING_MEDIUM,
                            }}
                            onChangeText={this._onFocusInputChange}
                            onFocus={this._onFocusNoteInput}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            placeholderTextColor={COLOR_TEXT_HINT}
                            placeholder='Hãy cho JAMJA biết nếu bạn có yêu cầu đặc biệt nào đó'
                            value={this.state.other}
                        />

                    </ScrollView>

                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: 'white',
                        width: '100%'
                    }}>
                        <DividerLine/>

                        <TouchableOpacity style={[styles.buttonGetCode, {
                            backgroundColor: enableConfirmButton ? COLOR_PRIMARY : COLOR_GRAY_BG_2,
                            borderColor: enableConfirmButton ? COLOR_PRIMARY : COLOR_GRAY_BG_2,
                            flexDirection: 'row'
                        }]}
                                        disabled={!enableConfirmButton} 
                                        onPress={this._onConfirmGetCodeClicked}>
                            <Text style={{
                                color: 'white',
                                fontSize: DIMENSION_TEXT_HEADER,
                                fontWeight: 'bold',
                                marginRight: DIMENSION_PADDING_TINY
                            }}>
                                NHẬN MÃ ƯU ĐÃI
                            </Text>

                            <JJIcon size={10}
                                    name={'chevron_right_o'}
                                    color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                {/* Indicator */}
                <LoadingViewPopup visible={this.state.isLoading}
                                  message={'Đang lấy mã...'}/>
            </Container>
        )
    }

    componentDidMount() {
        super.componentDidMount();

        const {deal} = this.props.navigation.state.params;

        AnalyticsUtil.logCurrentScreen(
            'exclusive_get_code',
            {
                item_id: deal.getIn(['slug'], ''),
                item_name: deal.getIn(['slug'], ''),
                item_brand: deal.getIn(['brand', 'brand_slug'], ''),
                deal_type: deal.getIn(['deal_type'], '')
            });

        if (deal && deal.get('limit_by_store', false)) {
            this._getLimitStores(deal.get('id', ''));
        }
    }

    _onSubmitUserNameInput = () => !!this.refs && !!this.refs.edtPhoneNumber && this.refs.edtPhoneNumber.focus();

    _onSubmitPhoneInput = () => !!this.refs && !!this.refs.edtEmail && this.refs.edtEmail.focus();

    _onUserInputChange = (text) => {
        this.setState({ ...this.state, full_name: text.trim() })
    }

    _onEmailInputChange = (text) => {
        this.setState({ ...this.state, email: text.trim() })
    }

    _onPhoneInputChange = (text) => {
        this.setState({ ...this.state, phone_number: text.trim() })
    }

    _onFocusNoteInput = () => {
        try {
            !!this.refs && !!this.refs.scrollView && this.refs.scrollView.scrollToEnd({ animated: true });
        } catch (e) {
            console.log(e);
        }
    }

    _onFocusInputChange = (text) => {
        this.setState({
            ...this.state,
            other: text,
        })
    }

    _renderHeaderTitle = () => {
        const {deal} = this.props.navigation.state.params;
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB}}>
                    {deal ? deal.getIn(['brand', 'brand_name']) : ''}
                </Text>
                <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                    XÁC NHẬN THÔNG TIN
                </Text>
            </View>
        )
    }

    _getLimitStores = (did) => {
        this.setState({isLoadingStore: true});
        dealApi.getStoresLimitByDeal(did)
            .then(response => {
                console.log('getStoresLimitByDeal:success:', response)
                if (!!this.props.latitude && !!this.props.longitude) {
                    response.map((obj) => {
                        if (!!obj.store.latitude && !!obj.store.longitude) {
                            obj.store['distance'] = calculateDistance(obj.store.latitude, obj.store.longitude, this.props.latitude, this.props.longitude);
                        }
                    });
                }
                response.sort(function (a, b) {
                    if (!!a.store.distance && !!b.store.distance) return a.store.distance - b.store.distance;
                    if (!a.store.address || !b.store.address) return 1;
                    return (a.store.address + '').localeCompare(b.store.address);
                    //
                    // if(a.store.address < b.store.address) return -1;
                    // if(a.store.address > b.store.address) return 1;
                    // return 0;
                });

                this.setState({stores: fromJS(response), isLoadingStore: false})
            })
            .catch(error => {
                this.setState({isLoadingStore: false})
                console.log('getStoresLimitByDeal:error:', error)
                Alert.alert(
                    'Lỗi',
                    'Không lấy được danh sách cửa hàng',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    {cancelable: true})
            })

    }

    _renderSelectStoreIfNeed() {
        const {deal} = this.props.navigation.state.params;
        if (deal && deal.get('limit_by_store', false)) {
            let hasSelectStore = !!this.state.selectedStore;
            return (
                <View>
                    <Text style={styles.textHeader}>
                        CỬA HÀNG ÁP DỤNG<Text style={{color: COLOR_PRIMARY}}>*</Text>
                    </Text>

                    <View>
                        {
                            this.state.isLoadingStore &&
                            <View style={{padding: DIMENSION_PADDING_MEDIUM, backgroundColor: COLOR_GRAY_BG, width: '100%'}}>
                                <ActivityIndicator animating={true}
                                                   size={'small'}/>
                            </View>
                        }
                        {
                            !this.state.isLoadingStore &&
                            <TouchableOpacity
                                onPress={this._openStoreSelection}
                                style={[styles.rowList]}>

                                <Text style={{ paddingLeft: DIMENSION_PADDING_SMALL, paddingRight: DIMENSION_PADDING_MEDIUM, color: hasSelectStore ? COLOR_TEXT_BLACK_1 : COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}
                                      numberOfLines={1}>
                                    {hasSelectStore ? this.state.selectedStore.getIn(['store', 'address'], '') : "Chọn cửa hàng"}
                                </Text>
                                <JJIcon name={"chevron_right_o"}
                                        size={12}
                                        color={COLOR_TEXT_INACTIVE}
                                        style={{position: 'absolute', right: 8, top: DIMENSION_PADDING_MEDIUM}}/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }

    _onGoBackClicked = () => {
        const {deal} = this.props.navigation.state.params;
        AnalyticsUtil.logGetExclusiveCodeGoBack(
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], '')
        );
    }

    _openStoreSelection = () => {
        if (!this.state.stores) return;

        this.props.navigation.navigate('StorePicker', {
            stores: this.state.stores,
            storeSelected: this.state.selectedStore,
            onStoreSelected: this._onStorePickerItemClicked
        })
    }

    _onStorePickerItemClicked = (store) => {
        if (!Map.isMap(store)) store = fromJS(store);
        this.setState({
            ...this.state,
            selectedStore: store
        });
        const {deal} = this.props.navigation.state.params;
        AnalyticsUtil.logExclusiveStoreSelection(
            'Exclusive_selected_store',
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], ''),
            store.getIn(['store', 'id'], '')
        );
    }

    _onConfirmGetCodeClicked = () => {
        if (this.state.isLoading) return;
        if (this.isReadyToGetCoupon()) {
            Keyboard.dismiss();
            this._cacheUserInfo();
            const {deal} = this.props.navigation.state.params;

            let bookingParams = {
                'did': deal.get('id', ''),
                'user_name': this.state.full_name,
                'phone_number': this.state.phone_number,
                'email': this.state.email,
                'booking_note': this.state.other
            };
            let storeId = undefined;
            if (deal.get('limit_by_store', false) && !!this.state.selectedStore) {
                storeId = this.state.selectedStore.getIn(['store', 'id'], '');
                bookingParams.store = storeId;
            }

            AnalyticsUtil.logExclusiveStartGetCode(
                deal.getIn(['brand', 'brand_slug'], ''),
                deal.getIn(['slug'], ''),
                deal.getIn(['deal_type'], ''),
                storeId
            );

            AnalyticsUtil.beginCheckOut(
                deal.getIn(['title'], ''),
                deal.getIn(['slug'], ''),
                deal.getIn(['brand', 'brand_slug'], ''),
                deal.getIn(['cat1'], ''),
                deal.getIn(['cat2'], ''),
                deal.getIn(['deal_type'], ''),
                deal.getIn(['avg_billing_value'], 0),
                deal.getIn(['avg_billing_value'], 0),
                1,
                moment.utc(deal.getIn(['end_valid_time'], '')).local().toDate()
            )

            this._getCode(bookingParams);
        }
    }

    _getCode = (params) => {
        this.setState({isLoading: true});
        console.log('start request:_onConfirmGetCodeClicked', params);

        couponApi.getExclusiveCoupon(params)
            .then(response => {
                console.log('____getCodeComplete:response:', response)
                this._onGetCodeComplete(response);
            })
            .catch(error => {
                console.log('____getCodeComplete:error:', error)
                this._onGetCodeError(error);
            });
    }

    _onGetCodeComplete = (response) => {
        this.setState({isLoading: false});
        response.text()
            .then(result => {
                console.log('_onGetCodeComplete:response:', result);
                let coupon = JSON.parse(result);

                if (!response.status || response.status < 200 || response.status > 299) {
                    this._onGetCodeError(coupon);
                    return;
                }
                let couponMap = fromJS(coupon);
                const {deal} = this.props.navigation.state.params;
                this.props.dispatch(couponChangeAction(deal.get('id', ''), couponMap));
                CouponDb.add(coupon);

                AnalyticsUtil.logExclusiveGetCodeSuccess(
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['deal_type'], ''),
                    couponMap.get('id', '')
                );

                AnalyticsUtil.purchase(
                    deal.getIn(['title'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['cat1'], ''),
                    deal.getIn(['cat2'], ''),
                    deal.getIn(['deal_type'], ''),
                    deal.getIn(['avg_billing_value'], 0),
                    deal.getIn(['avg_billing_value'], 0),
                    1,
                    moment.utc(deal.getIn(['end_valid_time'], '')).local().toDate()
                )

                this.props.navigation.navigate("ExclusiveGetCodeSuccess", { coupon: couponMap })

            })
            .catch(error => {
                this._onGetCodeError('Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!');
                console.log('_onGetCodeComplete:error:', error);
            })
    }

    _onGetCodeError = (error) => {
        this.setState({isLoading: false});
        let message = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!';
        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object') {
            if (error.error_message) message = error.error_message;
            else if (error.error) message = error.error;
            else if (error.errorCode === 401) message = ERROR_AUTH_MESSAGE;
        }
        const {deal} = this.props.navigation.state.params;
        AnalyticsUtil.logExclusiveGetCodeFailure(
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], ''),
            message
        );

        Alert.alert("Lỗi", message);
    }

    _cacheUserInfo = () => {

        UserDb.updateUserContactInfo(
            this.state.full_name,
            this.state.phone_number,
            this.state.email
        );
        let currentUser = this.props.user;
        currentUser.contact_info_full_name = this.state.full_name;
        currentUser.contact_info_phone_number = this.state.phone_number;
        currentUser.contact_info_email = this.state.email;

        this.props.dispatch(updateUser(currentUser));
    }

    isReadyToGetCoupon() {
        if (StringUtil.isBlank(this.state.full_name)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập họ tên");
            return false
        }
        if (StringUtil.isBlank(this.state.phone_number)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập số điện thoại liên hệ");
            return false
        }
        if (StringUtil.isBlank(this.state.email)) {
            Alert.alert("Thiếu thông tin", "Vui lòng nhập địa chỉ email");
            return false
        } 
        if (this.props.navigation.state.params.deal.limit_by_store
            && this.state.selectedStore === undefined) {
            Alert.alert("Thiếu thông tin", "Vui lòng chọn cửa hàng áp dụng");
            return false
        }
        if(!StringUtil.isValidName(this.state.full_name)){
            Alert.alert("Tên không hợp lệ", "Vui lòng nhập tên hợp lệ");
            return;
        } 
        if(!validatePhoneNumber(this.state.phone_number)){
            Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập số điện thoại hợp lệ")
            return;
        }
        if (!validateEmail(this.state.email)) {
            Alert.alert("Email không hợp lệ", "Vui lòng nhập địa chỉ email hợp lệ");
            return false
        }
        return true
    }

    _isReadyInput = () => {
        if (StringUtil.isBlank(this.state.full_name)) {
            return false
        }

        if (StringUtil.isBlank(this.state.phone_number)) {
            return false
        }

        if (StringUtil.isBlank(this.state.email)) {
            return false
        }

        const {deal} = this.props.navigation.state.params;

        if (!deal || (deal.get('limit_by_store', false) && !this.state.selectedStore)) {
            return false
        }

        return true
    }

}

const styles = StyleSheet.create({
    textHeader: {
        fontWeight: 'bold',
        padding: DIMENSION_PADDING_MEDIUM,
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1
    },
    icon: {
        marginRight: 5,
        marginTop: 3,
    },
    rowList: {
        paddingRight: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingBottom: 12,
        paddingTop: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textValue: {
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
        marginLeft: DIMENSION_PADDING_SMALL
    },
    textInputContainer: {
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
    },
    edtDescription: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_INACTIVE,
        padding: 0
    },
    textInput: {
        paddingLeft: 0,
        paddingTop: 0
    },
    buttonGetCode: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_TINY,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
    };
}


export default connect(mapStateToProps)(ExclusiveGetCode);

