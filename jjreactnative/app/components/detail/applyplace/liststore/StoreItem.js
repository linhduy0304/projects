import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import Communications from "react-native-communications";

import {BaseComponent} from "../../../common/BaseComponent";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB,
    DIMENSION_TEXT_UNDER_TINY
} from "../../../../resources/dimens";
import {COLOR_GRAY_BG, COLOR_GRAY_BG_2, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../../resources/colors";
import {StringUtil} from '../../../../utils/string-util'
import JJIcon from "../../../common/JJIcon";
import {DEAL_TYPE_MOVIE} from "../../../../const";

export default class StoreItem extends BaseComponent {

    render() {

        return (
            <View style={{flex: 1, backgroundColor: !!this.props.selected ? COLOR_GRAY_BG : 'white'}}>
                <TouchableOpacity onPress={this._storeClicked}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: DIMENSION_PADDING_MEDIUM
                    }}>
                        <View style={{flex: 1}}>
                            <Text style={{
                                paddingRight: DIMENSION_PADDING_SMALL,
                                fontSize: DIMENSION_TEXT_CONTENT,
                                color: COLOR_TEXT_BLACK_1
                            }}>
                                {this.props.store.address}
                            </Text>
                        </View>
                        {
                            !StringUtil.isBlank(this.props.store.distance) &&
                            <View style={{
                                flex: 0,
                                flexDirection: 'row',
                                minWidth: 90,
                                maxWidth: '40%',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                                <JJIcon name={'map_pin_o'}
                                        color={COLOR_TEXT_BLACK_1}
                                        size={DIMENSION_TEXT_SUB}/>
                                <Text style={{
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    color: COLOR_TEXT_BLACK_1,
                                    padding: DIMENSION_PADDING_TINY
                                }}>
                                    {this.props.store.distance} km
                                </Text>
                                <JJIcon name={'chevron_right_o'}
                                        color={COLOR_TEXT_BLACK_1}
                                        size={DIMENSION_TEXT_UNDER_TINY}/>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
                {this._renderActionIfNeed()}
            </View>
        )
    }

    _renderActionIfNeed() {
        if (this.props.selected) {
            return (
                <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG_2, flexDirection: 'row'}}>
                    {
                        !StringUtil.isBlank(this.props.store.phone_number) &&
                        <TouchableOpacity
                            onPress={this._onCallClicked}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: DIMENSION_BUTTON_MEDIUM,
                                flex: 1
                            }}>
                            <JJIcon name={'phone_forwarded_o'}
                                    color={COLOR_PRIMARY}
                                    style={{
                                        marginTop: DIMENSION_PADDING_TINY,
                                        marginRight: DIMENSION_PADDING_SMALL
                                    }}
                                    size={16}/>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                                {this.props.dealType === DEAL_TYPE_MOVIE ? 'Gọi rạp chiếu' : 'Gọi cửa hàng'}
                            </Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={this._onDirectionClicked}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: DIMENSION_BUTTON_MEDIUM,
                            flex: 1
                        }}>
                        <JJIcon name={'navigation_o'}
                                color={COLOR_PRIMARY}
                                style={{marginTop: DIMENSION_PADDING_TINY, marginRight: DIMENSION_PADDING_SMALL}}
                                size={16}/>

                        <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                            Chỉ đường
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    _onCallClicked = () => {
        Communications.phonecall(this.props.store.phone_number, true);
    }

    _onDirectionClicked = () => {
        this.props.navigation.navigate('StoreDirection', {store: this.props.store});
    }

    _storeClicked = () => {
        if (!this.props.selected) this.props.onItemClicked(this.props.store);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selected !== this.props.selected ||
            nextProps.store.id !== this.props.store.id;
    }
}

StoreItem.propTypes = {
    navigation: PropTypes.object,
    store: PropTypes.object,
    dealType: PropTypes.any,
    selected: PropTypes.bool,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    onItemClicked: PropTypes.func
}