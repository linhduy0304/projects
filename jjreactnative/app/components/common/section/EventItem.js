import React from 'react'
import {View, TouchableWithoutFeedback, Linking} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import {BaseComponent} from "../BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {StringUtil} from '../../../utils/string-util'
import {COLOR_GRAY_BG} from "../../../resources/colors";
import {CommonUtil} from "../../../utils/common-utils";
import {AnalyticsUtil} from "../analytics/analytics";

export default class EventItem extends BaseComponent {

    render() {
        const {event} = this.props;
        if (event === undefined || event === null) return null;

        const textColor = !!event.text_color ? event.text_color : 'white';

        return (
            <TouchableWithoutFeedback
                style={{
                    width: this.props.width,
                    height: this.props.height,
                }}
                onPress={this._onOpenDetailClicked}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: !!event.bg_color ? event.bg_color : COLOR_GRAY_BG,
                        paddingBottom: 10,
                        paddingTop: DIMENSION_PADDING_MEDIUM,
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM
                    }}>
                    <Text style={{ color: textColor, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}>
                        {event.title}
                    </Text>
                    <View style={{ width: 60, height: 2, backgroundColor: textColor, marginBottom: DIMENSION_PADDING_TINY, marginTop: DIMENSION_PADDING_TINY }} />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text numberOfLines={2}
                              style={{ color: textColor, fontSize: DIMENSION_TEXT_CONTENT, flex: 1, paddingRight: DIMENSION_PADDING_TINY }}>
                            {event.description}
                        </Text>
                        <View
                            style={{
                                borderColor: textColor,
                                borderWidth: 1,
                                backgroundColor: !!event.cta_color ? event.cta_color : 'rgba(255,255,255,0.4)',
                                borderRadius: DIMENSION_RADIUS_MEDIUM,
                            }}>
                            <Text
                                style={{
                                    paddingRight: DIMENSION_PADDING_MEDIUM,
                                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                                    paddingBottom: DIMENSION_PADDING_TINY,
                                    paddingTop: DIMENSION_PADDING_TINY,
                                    color: textColor,
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    fontWeight: 'bold'
                                }}>
                                {event.cta_label}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        )
    }

    _onOpenDetailClicked = () => {
        if (StringUtil.isEmpty(this.props.event)) return;
        this._logClicked();

        const deeplink = this.props.event.deep_link;

        if (!StringUtil.isEmpty(deeplink)) {
            CommonUtil.openLink(this.props.navigation, deeplink);
            return;
        }

        const targetUrl = this.props.event.web_link;
        if (!StringUtil.isEmpty(targetUrl)) {
            CommonUtil.openLink(this.props.navigation, targetUrl);
        }
    }

    _logClicked = () => {
        try {
            AnalyticsUtil.logNormalEvent(
                'event_clicked',
                {
                    name: this.props.event.title
                },
                'event'
            )
        } catch (e) {
            console.log(e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.event && this.props.event === undefined) return true;
        if (nextProps.event === undefined) return false;
        if (this.props.event === undefined) return false;
        if (nextProps.event.title !== this.props.event.title) return true;
        return false;
    }
}

EventItem.propTypes = {
    event: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any,
    navigation: PropTypes.any
}