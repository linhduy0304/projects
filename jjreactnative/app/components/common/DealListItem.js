import React from "react";
import { strings } from '../../../locates/i18n';
import { Image, TouchableHighlight, View, TouchableOpacity, Dimensions } from "react-native";
import { Text } from 'native-base';
import DividerLine from './DividerLine';
import { DEAL_TYPE_ECOUPON, DEAL_TYPE_LAST_MIN, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_NORMAL_DEAL, DEAL_TYPE_GIVEAWAY_DEAL, DEAL_TYPE_INVITATION_DEAL } from "../../const";
import {BaseComponent} from "./BaseComponent";
import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window');

export default class DealListItem extends BaseComponent {

    constructor(props) {
        super(props);
    }

    _goToDealDetail = () => {
        this.props.navigation.navigate('DealDetail', { "deal": this.props.item })
    }

    _doFollow = () => {
        this.props.navigation.navigate('BookingSuccess')
    }

    render() {
        return (
            <TouchableHighlight underlayColor='white' onPress={this._goToDealDetail}>
                <View style={{ backgroundColor: 'white' }}>
                    {/* Header View*/}
                    <View style={{ height: 50 }} >

                        <View style={{ position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 100, height: 30, position: 'absolute', resizeMode: 'contain' }}
                                   defaultSource={require("../../resources/images/jamja_placeholder.jpg")}
                                source={{ uri: this.props.item.brand.image }} />
                        </View>

                        <View style={{ position: 'absolute', height: '100%', width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={this._doFollow}
                                style={{ height: 40, alignItems: 'center', flexDirection: 'row', }}>
                                <Image style={{ width: 15, height: 15, marginLeft: 5, marginRight: 5, resizeMode: 'contain', }}
                                    source={require('../../resources/images/ic_follow.png')} resizeMethod={'resize'}/>
                                <Text style={{ marginRight: 5, color: 'gray' }}>{strings('deal.bt_follow')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Divider */}
                    <DividerLine />

                    {/* ImageView */}
                    <View style={{ height: width / 2, }}>
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'gray' }}>
                            <Image style={{ flex: 1, resizeMode: 'cover' }}
                                   defaultSource={require("../../resources/images/jamja_placeholder.jpg")}
                                source={{ uri: this.props.item.images[0].link }} resizeMethod={'resize'}/>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom: 10 }}>
                            <View style={{ backgroundColor: 'rgba(255,0,0,0.7)', padding: 8 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.item.highlight}</Text>
                            </View>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 8 }}>
                                <Text style={{ color: 'white' }}>{strings('deal.remain_time', { "number_day": 2 })}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Header Divider */}
                    <DividerLine />

                    {/* FooterView */}
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 8, alignItems: 'center' }}>
                        <Text style={{ flex: 1, marginRight: 4 }}>{this.props.item.title}</Text>
                        {this._renderActionButton()}
                    </View>

                    {/* Header Divider */}
                    <DividerLine />

                    {/* BottomView */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 14, color: 'gray', marginRight: 2 }}>{this.props.item.save_count}</Text>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }}
                                    source={require('../../resources/images/ic_saved.png')} resizeMethod={'resize'}/>
                        </View>
                        <Text style={{ color: 'gray' }}>{strings('deal.near_you')}</Text>
                    </View>

                    {/* Header Divider */}
                    <DividerLine />

                </View>

            </TouchableHighlight >
        )
    }

    _renderActionButton() {

        if (this.props.item.deal_type === DEAL_TYPE_EXCLUSIVE) {
            return (
                <TouchableOpacity style={{ height: 31, width: 105, justifyContent: 'center' }}>
                    <Image style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover' }}
                        source={require('../../resources/images/deal/deal_cta_pink.png')}
                           resizeMethod={'resize'}/>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 15, backgroundColor: 'rgba(0,0,0,0)' }}>{strings('deal.bt_get_code')}</Text>
                </TouchableOpacity>
            )
        }

        if (this.props.item.deal_type === DEAL_TYPE_LAST_MIN) {
            return (
                <TouchableOpacity style={{ borderColor: 'red', borderRadius: 5, borderWidth: 1, height: 31, width: 105, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>{strings('deal.bt_booking')}</Text>
                </TouchableOpacity>
            )
        }

        if (this.props.item.deal_type === DEAL_TYPE_ECOUPON) {
            if (this.props.item.pre_generated_code.length > 0) {
                return (
                    <TouchableOpacity style={{ height: 31, width: 105, justifyContent: 'center' }}>
                        <Image style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover' }}
                            source={require('../../resources/images/deal/deal_cta_pink.png')}
                               resizeMethod={'resize'}/>
                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 15, backgroundColor: 'rgba(0,0,0,0)' }}>{strings('deal.bt_get_code')}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity style={{ borderColor: 'gray', borderRadius: 5, borderWidth: 1, height: 31, width: 105, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'gray' }}>{strings('deal.bt_detail')}</Text>
                    </TouchableOpacity>
                )
            }
        }

        if (this.props.item.deal_type === DEAL_TYPE_NORMAL_DEAL
            || this.props.item.deal_type === DEAL_TYPE_GIVEAWAY_DEAL
            || this.props.item.deal_type === DEAL_TYPE_INVITATION_DEAL) {
            return (
                <TouchableOpacity style={{ borderColor: 'gray', borderRadius: 5, borderWidth: 1, height: 31, width: 105, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>{strings('deal.bt_detail')}</Text>
                </TouchableOpacity>
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.item && this.props.item === undefined) return true;
        if (nextProps.item === undefined && this.props.item === undefined) return false;
        if (nextProps.item.id !== this.props.item.id) return true;
        if (nextProps.item.is_following !== this.props.is_following) return true;
        if (nextProps.item.is_saved !== this.props.is_saved) return true;
        if (nextProps.item.save_count !== this.props.save_count) return true;
        return false;
    }
}

DealListItem.propTypes = {
    item: PropTypes.object,
    navigation: PropTypes.object
}
