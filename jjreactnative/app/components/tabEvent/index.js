import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Text} from 'native-base'
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {BaseComponent} from "../common/BaseComponent";
import TabEventToolbar from './TabEventToolbar'
import JJWebView from "../webview/JJWebView";
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";
import {StringUtil} from "../../utils/string-util";
import JJIcon from '../common/JJIcon'
import {fetcherConfig} from "../../api/fetcher";

class TabEvent extends BaseComponent {

    user;

    constructor(props) {
        super(props);
        let url = !!props.config && props.config.get('landing_page_url') || undefined;
        if (!!props.latitude && !!props.longitude) {
            url = StringUtil.addParamsToUrl(url, {lat: props.latitude, lon: props.longitude});
        }
        const token = encodeURIComponent(fetcherConfig.getHeaders().Authorization);
        this.user = {user: token};
        this.state = {
            sourceUri: url,
            url: url,
            progress: 0,
            canGoBack: false,
            canGoForward: false
        }
    }

    render() {
        console.log('TabEvent:render', this.state);

        return (
            <View
                style={{
                    flex: 1
                }}>

                <TabEventToolbar onSideMenuButtonPress={this.props.onToggleBurger}
                                 headerColor={!!this.props.config && this.props.config.get('theme_color')}
                                 navigation={this.props.navigation}/>

                {
                    !this.props.notSupport &&
                    <JJWebView
                        url={this.state.sourceUri}
                        style={{flex: 1}}
                    />
                }

                {
                    this._renderNotSupportLocation()
                }

            </View>
        )
    }

    _renderNotSupportLocation = () => {
        if (!this.props.notSupport) return null;

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
    }

    componentWillReceiveProps(nextProps) {
        try {
            const sourceUri = !!nextProps.config && nextProps.config.get('landing_page_url') || undefined;
            this.setState({
                ...this.state,
                sourceUri: sourceUri
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}

TabEvent.propTypes = {
    onToggleBurger: PropTypes.any,
    navigation: PropTypes.any,
    setOnScrollToTopMethod: PropTypes.any,
    config: PropTypes.any,
    notSupport: PropTypes.any
}

function mapStateToProps(state) {
    return {
        //Location
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
    };
}

export default connect(mapStateToProps)(TabEvent);