import React from 'react';
import {Text} from 'native-base';
import {Dimensions, Platform} from 'react-native';
import HTML from 'react-native-render-html';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../BasePureComponent";
import {COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {NativeCommon} from "../../../common/native/NativeCommon";

const Width = Dimensions.get('window').width;
const ios = Platform.OS === 'ios';

export default class JJTextViewHtml extends BasePureComponent {


    render() {

        const {text} = this.props;

        if (!text || text.length < 1) return null;

        const htmlContent = this._formatText(text);

        if (htmlContent.indexOf('<a') >= 0 && htmlContent.indexOf('</a>') > 0) {
            return (
                <HTML
                    html={htmlContent}
                    imagesMaxWidth={Width}
                    staticContentMaxWidth={Width}
                    baseFontStyle={{color: this.props.fontColor, fontSize: this.props.fontSize}}
                    allowFontScaling={true}
                    textSelectable={true}
                    containerStyle={{padding: this.props.padding, maxHeight: this.props.maxHeight}}
                    onLinkPress={this._onLinkPressed}/>
            )
        }

        return (
            <Text
                style={{
                    color: this.props.fontColor,
                    fontSize: this.props.fontSize,
                    maxHeight: this.props.maxHeight,
                    padding: this.props.padding,
                    width: Width
                }}>
                {htmlContent}
            </Text>
        )
    }

    _formatText = text => {
        return this._detectWebUrl(this._detectPhoneNumber(text));
    }

    _detectPhoneNumber = text => {
        try {
            const regex = /\D?[0-9]{2,4}\D?\s?[0-9]{2,4}\D?\s?[0-9]{2,4}\D?\s?[0-9]{2,4}/gmi;

            let m;
            let builder = '';

            let startIndex = 0;
            let lastIndex = 0;

            while ((m = regex.exec(text)) !== null) {

                if (!!m[0] && m[0].length > 0) {
                    if (startIndex === 0) startIndex = m.index;

                    const found = m[0].trim();
                    builder += `${text.substring(lastIndex, m.index)}<a href="${ios ? 'telprompt' : 'tel'}:${found}"> ${found}</a>`;

                    if (lastIndex !== regex.lastIndex) lastIndex = regex.lastIndex;
                }

                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }

            builder += text.substring(lastIndex, text.length);

            return builder;
        }
        catch (e) {
            console.debug(e);
        }
        return text;
    }

    _detectWebUrl = text => {
        try {
            const regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[a-z-]+)+\.?(:\d+)?(\/\S*)?)/gim;

            let m;
            let builder = '';

            let startIndex = 0;
            let lastIndex = 0;

            while ((m = regex.exec(text)) !== null) {

                if (!!m[0] && m[0].length > 0) {
                    if (startIndex === 0) startIndex = m.index;

                    const found = m[0].trim();
                    builder += `${text.substring(lastIndex, m.index)}<a href="${found}"> ${found}</a>`;

                    if (lastIndex !== regex.lastIndex) lastIndex = regex.lastIndex;
                }

                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }

            builder += text.substring(lastIndex, text.length);

            return builder;
        }
        catch (e) {
            console.debug(e);
        }
        return text;
    }

    _onLinkPressed = (event, url, element) => {
        if (!!url) {
            NativeCommon.openUrl(url);
        }
    }
}

JJTextViewHtml.defaultProps = {
    fontSize: DIMENSION_TEXT_CONTENT,
    fontColor: COLOR_TEXT_BLACK_1
}

JJTextViewHtml.propTypes = {
    text: PropTypes.any,
    fontSize: PropTypes.any,
    fontColor: PropTypes.any,
    maxHeight: PropTypes.any,
    padding: PropTypes.any
}