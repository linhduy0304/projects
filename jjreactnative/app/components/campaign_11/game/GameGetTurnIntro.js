import React from 'react'
import { ShareDialog } from 'react-native-fbsdk';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
    Platform,
    Dimensions, NativeModules, Share
} from "react-native";
import FastImage from 'react-native-fast-image';
import firebase from 'react-native-firebase';
import LinearGradient from "react-native-linear-gradient";

import {BasePureComponent} from "../../common/BasePureComponent";
import JJIcon from "../../common/JJIcon";
import LoadingViewPopup from "../../../common/view/loading/LoadingViewPopup";
import {StringUtil} from '../../../utils/string-util'
import {ObjectUtil} from '../../../utils/object-utils'
import {campaignApi} from '../../../api/campaign-api'
import {Toast} from '../../common/alert/Toast'
import {SFUFont} from "../sfu-font-util";
import {isIphoneBunnyEar} from "../../../utils/common-utils";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import GameBackground from "./GameBackground";
import ButtonBack from "../ButtonBack";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
} from "../../../resources/dimens";
import {UserDb} from '../../../api/storage/UserDb';
import {CommonUtil} from '../../../utils/common-utils';

const {width} = Dimensions.get('window');
const SCALABLE = width / 375;
const FONT_18 = SCALABLE*18;
const FONT_16 = SCALABLE*16;
const FONT_14 = SCALABLE*14;
const SIZE_43 = SCALABLE*43;
const SIZE_40 = SCALABLE*40;
const SIZE_96 = SCALABLE*96;
const iphoneX = isIphoneBunnyEar();

const DYNAMICLINK_DOMAIN = 'publish' === NativeModules.AppInfo.BuildEnv ? 'jamja.page.link' : 'jjdev.page.link';
const ANDROID_PACKAGE = 'publish' === NativeModules.AppInfo.BuildEnv ? 'com.jamjavn.jamja' : 'com.jamjavn.jamjadev';
const DEFAULT_URL = 'https://jamja.vn/yes-party/game/';

export default class GameGetTurnIntro extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visibleLoading: false,
            deeplink: ''
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <GameBackground
                    scalable={SCALABLE}
                    hideSnowBg={true}/>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        height: iphoneX ? 34 : 16,
                        width: '100%'
                    }}/>

                {/*Top controll*/}
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 0,
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: FONT_18,
                            position: 'absolute',
                            left: SIZE_43,
                            right: SIZE_43,
                            textAlign: 'center',
                            ...SFUFont.demi
                        }}>
                        HƯỚNG DẪN THÊM LƯỢT
                    </Text>

                    <ButtonBack onPress={this._onBackPressClicked}/>

                </View>

                <ScrollView style={{flex: 1, paddingLeft: DIMENSION_PADDING_LARGE, paddingRight: DIMENSION_PADDING_LARGE}}>

                    {/*See hot deal*/}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 24
                        }}>

                        <View
                            style={{
                                alignSelf: 'flex-start',
                                marginTop: 2
                            }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'flex-start',
                                }}>
                                <FastImage
                                    source={require('../../../resources/game/icon_guide_turn.png')}
                                    style={{
                                        width: 32,
                                        height: 32
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: FONT_16,
                                        position: 'absolute',
                                        ...SFUFont.demi
                                    }}>
                                    +1
                                </Text>
                            </View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'flex-start',
                                    marginTop: 8
                                }}>
                                <FastImage
                                    source={require('../../../resources/game/icon_guide_turn.png')}
                                    style={{
                                        width: 32,
                                        height: 32
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: FONT_16,
                                        position: 'absolute',
                                        ...SFUFont.demi
                                    }}>
                                    +2
                                </Text>
                            </View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'flex-start',
                                    marginTop: 8
                                }}>
                                <FastImage
                                    source={require('../../../resources/game/icon_guide_turn.png')}
                                    style={{
                                        width: 32,
                                        height: 32
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: FONT_16,
                                        position: 'absolute',
                                        ...SFUFont.demi
                                    }}>
                                    +3
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 16
                            }}>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_14,
                                    ...SFUFont.bold
                                }}>
                                SỬ DỤNG KHUYẾN MÃI ĐỘC QUYỀN TRÊN HỆ THỐNG CỦA JAMJA
                            </Text>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_14,
                                    ...SFUFont.regular,
                                    marginTop: 4
                                }}>
                                Từ ngày 12/12 - 29/12, với mỗi lượt đổi mã thành công các khuyến mãi ĐỘC QUYỀN trên JAMJA, bạn sẽ nhận được ngẫu nhiên từ 1 đến 3 lượt chơi vào tổng lượt chơi trong ngày.
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 44,
                            backgroundColor: 'white',
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 24
                        }}
                        activeOpacity={0.8}
                        onPress={this._onGetTurn1}>

                        <Text
                            style={{
                                color: '#BC1729',
                                fontSize: FONT_14,
                                fontWeight: 'bold',
                                marginLeft: 16
                            }}>
                            XEM NGAY KHUYẾN MÃI HOT
                        </Text>
                    </TouchableOpacity>

                    <LinearGradient
                        colors={['rgba(200, 200, 200, 0.0)', 'rgba(255, 255, 255, 0.5)', 'rgba(200, 200, 200, 0.0)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        style={{
                            height: 1,
                            width: '100%',
                            marginTop: DIMENSION_PADDING_LARGE
                        }}/>

                    {/*Share intro*/}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingTop: DIMENSION_PADDING_LARGE,
                            paddingBottom: DIMENSION_PADDING_LARGE,
                        }}>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                marginTop: 2
                            }}>
                            <FastImage
                                source={require('../../../resources/game/icon_guide_turn.png')}
                                style={{
                                    width: 32,
                                    height: 32
                                }}
                                resizeMode={FastImage.resizeMode.contain}/>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_16,
                                    position: 'absolute',
                                    ...SFUFont.demi
                                }}>
                                +1
                            </Text>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 16
                            }}>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_14,
                                    ...SFUFont.bold
                                }}>
                                CHIA SẺ GAME TRÊN TƯỜNG CỦA BẠN Ở CHẾ ĐỘ CÔNG KHAI
                            </Text>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_14,
                                    ...SFUFont.regular,
                                    marginTop: 4
                                }}>
                                Thêm 1 lượt chơi khi share trò chơi về trang Facebook cá nhân ở chế độ công khai. Tối đa 1 lần share trong ngày.
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 44,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        activeOpacity={0.8}
                        onPress={this._onShareFacebookClicked}>

                        <JJIcon name={'facebook_o'}
                                size={18}
                                color={'#3B5998'}/>

                        <Text
                            style={{
                                color: '#BC1729',
                                fontSize: FONT_14,
                                fontWeight: 'bold',
                                marginLeft: 16
                            }}>
                            CHIA SẺ QUA FACEBOOK
                        </Text>
                    </TouchableOpacity>

                    <LinearGradient
                        colors={['rgba(200, 200, 200, 0.0)', 'rgba(255, 255, 255, 0.5)', 'rgba(200, 200, 200, 0.0)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        style={{
                            height: 1,
                            width: '100%',
                            marginTop: DIMENSION_PADDING_LARGE
                        }}/>

                    {/*Join to event*/}
                    <View
                        style={{
                            width: '100%',
                            marginTop: 24,
                            justifyContent: 'center'
                        }}>

                        <Text
                            style={{
                                width: '100%',
                                color: 'white',
                                fontSize: FONT_14,
                                textAlign: 'center',
                                ...SFUFont.bold
                            }}>
                            RỦ BẠN CÙNG CHƠI
                        </Text>

                        <Text
                            style={{
                                color: 'white',
                                fontSize: FONT_14,
                                ...SFUFont.regular,
                                marginTop: 4
                            }}>
                            Gửi link giới thiệu cùng bạn bè tham gia LẮC lấy iPhone XS Max Thêm vui lại vừa thêm lưọt chơi!
                            {`\nLink giới thiệu của bạn là:`}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: DIMENSION_PADDING_MEDIUM
                            }}>

                            <View
                                style={{
                                    height: SIZE_40,
                                    flex: 1,
                                    marginRight: DIMENSION_PADDING_SMALL,
                                    backgroundColor: '#970014',
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: FONT_14,
                                        paddingLeft: DIMENSION_PADDING_SMALL,
                                        paddingRight: DIMENSION_PADDING_SMALL,
                                        ...SFUFont.regular,
                                    }}
                                    numberOfLines={1}>
                                    {this.state.deeplink}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    padding: FONT_14,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: SIZE_40,
                                    width: 96
                                }}
                                activeOpacity={0.8}
                                onPress={this._onShareLink}>

                                <LinearGradient
                                    colors={['#E98514', '#F7E21B']}
                                    start={{ x: 0.5, y: 1.0 }}
                                    end={{ x: 0.5, y: 0.0 }}
                                    style={{
                                        height: SIZE_40,
                                        width: SIZE_96,
                                        borderRadius: 8
                                    }}/>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: FONT_14,
                                        position: 'absolute',
                                        ...SFUFont.demi
                                    }}>
                                    Chia sẻ
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{height: 48}}/>

                </ScrollView>

                <LoadingViewPopup visible={this.state.visibleLoading}
                                  backgroundColor={'rgba(0, 0, 0, 0.6)'}/>

            </View>
        )
    }

    _onBackPressClicked = () => {
        this.props.navigation.goBack();
    }

    _onGetTurn1 = () => {
        this.props.navigation.navigate('GameWebView', {
            url: ObjectUtil.getValue(this.props, DEFAULT_URL, ['navigation', 'state', 'params', 'hotLink']),
            enableDirect: true
        });
    }

    _onShareFacebookClicked = () => {
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: StringUtil.isEmpty(this.state.deeplink) ? DEFAULT_URL : this.state.deeplink,
            contentDescription: 'Chăm chỉ lắc là vận may sẽ tới. iPhone chưa thấy đâu, chỉ thấy mỗi cỏ. Anh chị em vào lắc cùng mình đi',
        };

        console.log('_onShareFacebookClicked', shareLinkContent);

        ShareDialog.canShow(shareLinkContent)
            .then(canShow => {
                console.log('share:canShow:', canShow);
                if (canShow) {
                    return ShareDialog.show(shareLinkContent);
                }
                else {
                    this._showError();
                }
            })
            .then(result => {
                console.log('share:result_2:', result);
                if (!!result.isCancelled) {
                    console.log('share:canceled');
                }
                else {
                    console.log('share:success');
                    this.setState({
                        visibleLoading: true
                    }, () => this._getTurn(result.postId));
                }
            })
            .catch(error => {
                console.log('share:error:', error);
                this._error(error);
            });
    }

    _getTurn = (post_id) => {
        campaignApi.getMoreTurn(post_id)
            .then(response => {
                console.log('getmoreturn:response', response);
                this.setState({
                    visibleLoading: false
                });
                if (!response || !!response.error) {
                    this._error(response);
                }
                else {
                    this._onGetTurnSuccess(response);
                }
            })
            .catch(error => {
                console.log('getmoreturn:error', error);
                this.setState({
                    visibleLoading: false
                });
                this._error(error);
            })
    }

    _onGetTurnSuccess = (response) => {
        const onSuccess = ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'onSuccess']);
        if (!onSuccess) return;
        if (!response.inc_turn) {
            Toast.showToast('Bạn đã hết lần nhận thêm lượt hôm nay');
        }
        else {
            Toast.showToast('Chúc mừng! Bạn được cộng thêm lượt quay hôm nay');
            onSuccess(response);
        }
    }

    _error = (message) => {
        let error = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!';
        if (!!message) {
            if (message instanceof 'object') {
                if (!StringUtil.isEmpty(message.error)) error = message.error;
            }
            else if (message instanceof 'string') error = message;
        }

        Toast.showToast(error);
    }

    _showError = (message) => {
        if (StringUtil.isEmpty(message)) message = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.';
        Alert.alert('Lỗi', message)
    }

    _onShareLink = () => {
        if (StringUtil.isEmpty(this.state.deeplink)) return;

        console.log('_onShareLink:url:', this.state.deeplink);

        const content = {
            title: 'Lắc đã tay, trúng iPhone XS MAX ngay'
        };

        let message = 'Chăm chỉ lắc là vận may sẽ tới. iPhone chưa thấy đâu, chỉ thấy mỗi cỏ. Anh chị em vào lắc cùng mình đi';
        if (Platform.OS === 'ios') {
            content.url = this.state.deeplink;
        }
        else {
            message += '\n' + this.state.deeplink;
        }

        content.message = message;

        Share.share(content);
    }

    _createDeeplink = () => {
        try {
            const dl = UserDb.getGameUserReferralUrl();
            if (!StringUtil.isEmpty(dl)) {
                this.setState({
                    ...this.state,
                    deeplink: dl
                });
                return;
            }

            const player_id = ObjectUtil.getValue(this.props, '', ['navigation', 'state', 'params', 'player_id']);

            const customScheme = 'jamjalinks://game?action=play&player_id=' + player_id +
                '&utm_campaign=game_invite_yesparty&utm_content=game_invite_yesparty&utm_medium=invite&' +
                'utm_source=mobile&utm_term=invite_game';

            let falbackUrl = CommonUtil.generateUrlDeepLink(customScheme, DEFAULT_URL);

            const link = new firebase.links.DynamicLink(falbackUrl, DYNAMICLINK_DOMAIN);
            link.analytics.setCampaign('game_invite_yesparty');
            link.analytics.setContent('game_invite_yesparty');
            link.analytics.setMedium('invite');
            link.analytics.setSource('mobile');
            link.analytics.setTerm('invite_game');

            link.android.setPackageName(ANDROID_PACKAGE);

            link.ios.setAppStoreId('980165889');
            link.ios.setBundleId('vn.jamja.ios.JAMJA');
            link.ios.setCustomScheme(customScheme);

            link.navigation.setForcedRedirectEnabled(true);

            link.social.setDescriptionText('Hàng trăm, ngàn giải thưởng hấp dẫn khi chơi SHAKE IT - TAKE XS MAX. Tải ngay JAMJA và update phiên bản mới nhất để tham gia!');
            link.social.setImageUrl('https://jamja.vn/static/black-friday/images/game-social-preview-yesparty.jpg');
            link.social.setTitle('Lắc đã tay, trúng iPhone XS MAX ngay');

            console.log('DynamicLink: ', link, '\n', link.analytics, '\n',  link.android, '\n', link.navigation, '\n', link.social);

            firebase.links()
                .createShortDynamicLink(link)
                .then(response => {
                    console.log('DynamicLink:response: ', response);
                    if (!StringUtil.isEmpty(response)) {
                        this.setState({
                            ...this.state,
                            deeplink: response
                        });
                        UserDb.setGameUserReferralUrl(response);
                    }
                })
                .catch(error => {
                    console.log('DynamicLink:error: ', error);
                });
        } catch (e) {
            console.log('_createDeeplink:error', e);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        AnalyticsUtil.logCurrentScreen('game_get_more_turn');
        this._createDeeplink();
    }
}