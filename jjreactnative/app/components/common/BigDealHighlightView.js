import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "./BaseComponent";
import {View} from "react-native";
import HighLightView from "./HighLightView";
import {DIMENSION_BUTTON_SMALL, DIMENSION_TEXT_HEADER_XX} from "../../resources/dimens";
import {Text} from "native-base";
import moment from "moment";
import {DateUtil} from "../../utils/date-utils";

export default class BigDealHighlightView extends BaseComponent {

    render() {

        const {time, highlight} = this.props;

        if (this._isExpired(time)) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <HighLightView
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}
                        height={DIMENSION_BUTTON_SMALL}
                        contentWeight={'bold'}
                        contentText={!!highlight ? highlight : ''}
                        contentFontSize={16}
                        uppercase={true}
                    />

                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        right: 0,
                        marginBottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER_XX}}
                              uppercase={true}>
                            Đã hết hạn
                        </Text>

                    </View>
                </View>
            )
        }

        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0
                }}>
                <HighLightView
                    height={DIMENSION_BUTTON_SMALL}
                    contentWeight={'bold'}
                    contentText={!!highlight ? highlight : ''}
                    contentFontSize={16}
                    uppercase={true}
                />
            </View>
        )
    }

    _isExpired = (time) => {
        const endDate = moment.utc(time).local();
        return DateUtil.isExpired(endDate);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.time !== this.props.time ||
            nextProps.highlight !== this.props.highlight;
    }
}

BigDealHighlightView.propTypes = {
    time: PropTypes.any,
    highlight: PropTypes.any
}