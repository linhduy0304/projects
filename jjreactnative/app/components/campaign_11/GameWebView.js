import React from 'react'
import {Dimensions, Platform, View} from 'react-native'

import {BaseComponent} from "../common/BaseComponent";
import JJWebView from "../webview/JJWebView";
import {COLOR_GRAY_BG} from "../../resources/colors";
import {StringUtil} from "../../utils/string-util";
import {ObjectUtil} from "../../utils/object-utils";
import {AnalyticsUtil} from "../common/analytics/analytics";
import {fetcherConfig} from "../../api/fetcher";
import JJStatusBar from "../common/view/JJStatusBar";
import {getPaddingTopBar, isIphoneBunnyEar} from "../../utils/common-utils";
import ButtonBack from "./ButtonBack";

const iOS = Platform.OS === 'ios';
const isBunnyEar = isIphoneBunnyEar();

const {width} = Dimensions.get('window');
const paddingTopBar = (!!iOS ? 12 : 32) + getPaddingTopBar();

export default class GameWGameWebView extends BaseComponent {

    enableDirect = false;
    source = {};

    constructor(props) {
        super(props);
        const firstSource = ObjectUtil.getValue(props, '', ['navigation', 'state', 'params', 'url']);

        const token = encodeURIComponent(fetcherConfig.getHeaders().Authorization);
        this.source = {
            uri: StringUtil.addParamsToUrl(firstSource, {inApp: 1, user: token}),
            headers: fetcherConfig.getHeaders()
        };
        this.state = {
            url: firstSource,
            progress: 0,
            canGoBack: false,
            canGoForward: false
        };
        this.enableDirect = ObjectUtil.getValue(props, '', ['navigation', 'state', 'params', 'enableDirect']);
    }

    render() {
        console.log('TabEvent:render', this.state, this.source);

        return (
            <View
                style={{flex: 1}}>

                <JJStatusBar styleColor={'dark'}
                             bgColor={'#100100'}/>

                {
                    !!isBunnyEar &&
                    <View
                        style={{
                            backgroundColor: '#fafafa',
                            height: 32,
                            width: '100%'
                        }}/>
                }

                <JJWebView
                    url={this.source.uri}
                    style={{
                        flex: 1,
                        backgroundColor: COLOR_GRAY_BG
                    }}
                />

                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 0,
                        position: 'absolute',
                        top: paddingTopBar,
                        left: 0,
                        right: 0
                    }}>
                    <ButtonBack onPress={this._onBackPressed}/>
                </View>
            </View>
        )
    }


    _onBackPressed = () => {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        super.componentDidMount();
        try {
            AnalyticsUtil.logCurrentScreen('game_browser');
            AnalyticsUtil.logNormalEvent(
                'game_browser',
                {
                    url: encodeURIComponent(ObjectUtil.getValue(this.props, '', ['navigation', 'state', 'params', 'url']))
                },
                'game_browser'
            );
        } catch (e) {
            console.log(e);
        }
    }
}