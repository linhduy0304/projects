import React from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'
import {connect} from "react-redux";

import TabEventToolbar from './TabEventToolbar'
import JJWebView from "../../webview/JJWebView";
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {StringUtil} from "../../../utils/string-util";
import JJIcon from '../../common/JJIcon'
import {ObjectUtil} from "../../../utils/object-utils";
import BaseScreen from "../../../common/base/BaseScreen";

class TabEvent extends BaseScreen {

    constructor(props) {
        super(props);

        let url = '';
        let themeColor = '#fff';
        try {

            const landing_page_url = ObjectUtil.getValue(props, '', ['navigation', 'state', 'params', 'landing_page_url']);
            const provinceSupport = ObjectUtil.getValue(props, '', ['navigation', 'state', 'params', 'province_support']);
            if (provinceSupport === props.selectedProvinceId) {
                url = landing_page_url;
            }

            if (url.length > 0 && !!props.latitude && !!props.longitude) {
                url = StringUtil.addParamsToUrl(url, {lat: props.latitude, lon: props.longitude});
            }
            themeColor = ObjectUtil.getValue(props, '#fff', ['navigation', 'state', 'params', 'themeColor']);
        } catch (e) {
            console.log(e);
        }

        console.log('TabEvent:constructor2', props, url);

        this.state = {
            sourceUri: url,
            themeColor
        }
    }

    render() {
        console.log('TabEvent:render', this.state, this.props);

        return (
            <View
                style={{
                    flex: 1
                }}>

                <TabEventToolbar headerColor={this.state.themeColor}
                                 navigation={this.props.navigation}/>

                {
                    !StringUtil.isEmpty(this.state.sourceUri) &&
                    <JJWebView
                        url={this.state.sourceUri}
                        style={{flex: 1}}
                    />
                }

                {
                    StringUtil.isEmpty(this.state.sourceUri) &&
                    this._renderNotSupportLocation()
                }

            </View>
        )
    }

    _renderNotSupportLocation = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR_GRAY_BG,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                <JJIcon
                    name={'info_o'}
                    color={COLOR_TEXT_INACTIVE_DISABLE}
                    size={48}/>

                <Text
                    style={{
                        color: COLOR_TEXT_INACTIVE,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        padding: DIMENSION_PADDING_MEDIUM,
                        textAlign: 'center'
                    }}>
                    Sự kiện hiện tại không được áp dụng ở {this.props.selectedProvinceName} vui lòng đổi khu vực để tham gia sự kiện.
                </Text>

            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('TabEvent:componentDidMount__:', this.props);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log('TabEvent:shouldComponentUpdate___:', nextProps, nextState, this.props);
        this.needReRender = nextState.sourceUri !== this.state.sourceUri || nextContext.themeColor !== this.state.themeColor;
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    }

    componentWillReceiveProps(nextProps) {
        try {
            console.debug(
                'TabEvent:componentWillReceiveProps__:',
                nextProps,
                this.props
            );

            if (nextProps.selectedProvinceId !== this.props.selectedProvinceId) {

                const provinceSupport = ObjectUtil.getValue(nextProps, undefined, ['navigation', 'state', 'params', 'province_support']);

                console.debug(
                    'TabEvent:componentWillReceiveProps__2:',
                    nextProps.selectedProvinceId,
                    provinceSupport
                );

                if (nextProps.selectedProvinceId !== provinceSupport) {
                    this.setState({
                        ...this.state,
                        sourceUri: undefined
                    });
                    return;
                }
                const newLandingPage = ObjectUtil.getValue(nextProps, undefined, ['navigation', 'state', 'params', 'landing_page_url']);

                console.debug(
                    'TabEvent:componentWillReceiveProps__3:',
                    newLandingPage
                );

                let url = newLandingPage;

                if (url.length > 0 && !!nextProps.latitude && !!nextProps.longitude) {
                    url = StringUtil.addParamsToUrl(url, {lat: nextProps.latitude, lon: nextProps.longitude});
                }

                console.debug(
                    'TabEvent:componentWillReceiveProps__4:',
                    url
                );

                this.setState({
                    sourceUri: url,
                    themeColor: ObjectUtil.getValue(nextProps, '#fff', ['navigation', 'state', 'params', 'themeColor'])
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

function mapStateToProps(state) {
    return {
        //Location
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        selectedProvinceId: state.locationReducer.getIn(['province', 'id'], ''),
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
    };
}

export default connect(mapStateToProps)(TabEvent);