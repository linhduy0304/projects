import React  from 'react';
import { Text } from 'native-base';
import { View, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'
import MapView, {Marker} from 'react-native-maps';
import DividerLine from '../../../common/DividerLine';
import LinearGradient from 'react-native-linear-gradient';
import JJIcon from '../../../common/JJIcon'
import Communications from 'react-native-communications';
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_ORANGE, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from '../../../../resources/colors';
import HeaderSection from '../../../common/HeaderSection';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../../resources/dimens";
import {connect} from "react-redux";
import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from '../../../../utils/string-util'
import {DEAL_TYPE_MOVIE} from "../../../../const";

const { width } = Dimensions.get('window');

class ApplyLocationSection extends BaseComponent {

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                {/* Header */}
                <HeaderSection
                    title={'Địa điểm áp dụng'}
                />
                {/* Description */}
                {
                    this._renderMainContent()
                }
                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
            </View >
        )
    }

    _renderMainContent = () => {
        if (this.props.nearestStore) return this._renderContentByNearestStore();
        if (this.props.deal.get('online_store')) return this._renderOnlyOnlineStore();
        return this._renderNotAvailableInThisLocation()
    }

    _renderNotAvailableInThisLocation = () => {
        return (
            <View style={{width: '100%'}}>
                <View style={{height: 156, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM}}>
                        Khuyến mãi này không áp dụng tại {this.props.selectedProvinceName}
                    </Text>
                </View>
            </View>
        )
    }

    _renderOnlyOnlineStore = () => {
        return (
            <View style={{width: '100%'}}>
                <View style={{height: 156, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM}}>
                        Khuyến mãi này chỉ áp dụng cho mua hàng online trên hệ thống của {this.props.deal.getIn(['brand', 'brand_name'], '')}
                    </Text>
                </View>

                <DividerLine />

                <TouchableOpacity style={[styles.button, {height: 32, margin: DIMENSION_PADDING_MEDIUM, borderRadius: DIMENSION_RADIUS_MEDIUM, borderColor: COLOR_LINE, borderWidth: 1}]}
                                  onPress={this._onBuyOnlineClicked}>
                    <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                        Mua online
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderContentByNearestStore = () => {
        return (
            <View style={{width: '100%'}}>
                <TouchableWithoutFeedback
                    onPress={this._gotoStoreDirection}
                    style={{ height: 156}}>

                    <View style={{height: 156}}>
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'white' }} pointerEvents="none">
                            <MapView
                                style={{flex: 1}}
                                liteMode={true}
                                region={this._getRegion()}
                                pointerEvents="none"
                            >
                                {this._renderMarker()}
                            </MapView>
                        </View>

                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.0)']}
                            start={{ x: 0.0, y: 0.5 }}
                            end={{ x: 1.0, y: 0.5 }}
                            locations={[0, 0.2, 0.7, 1]}
                            style={{
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                bottom: 0,
                                top: 0,
                                left: 0,
                                padding: DIMENSION_PADDING_MEDIUM,
                                width: width * 3 / 4,
                            }}>

                            {this._renderDistanceIfHave()}
                            <Text style={styles.address}>
                                {this.props.nearestStore.get('address', '')}
                            </Text>

                        </LinearGradient>
                    </View>

                </TouchableWithoutFeedback>

                <View style={{ height: DIMENSION_BUTTON_MEDIUM, flexDirection: 'row' }}>

                    {this._renderButtonMenuIfNeed()}

                    {this._renderCallStoreIfNeed()}

                    <TouchableOpacity
                        onPress={this._gotoStoreDirection}
                        style={styles.button}>
                        <JJIcon name="navigation_o"
                                size={14}
                                color={COLOR_ORANGE}
                                style={{ marginTop: 3 }} />
                        <Text style={styles.titleButton}>
                            Chỉ đường
                        </Text>
                    </TouchableOpacity>

                </View>

                {this._renderViewMoreStoreIfNeed()}
            </View>
        )
    }

    _getRegion = () => {
        if (!this.props.nearestStore) return {};
        return (
            {
                latitude: this.props.nearestStore.get('latitude', 0) + 0.00009,
                longitude: this.props.nearestStore.get('longitude', 0) - 0.0006,
                latitudeDelta: 0.0009,
                longitudeDelta: 0.0005,
            }
        )
    }

    _renderMarker = () => {
        if (!this.props.nearestStore) return;

        return (
            <Marker
                coordinate={{
                    latitude: this.props.nearestStore.get('latitude', 0),
                    longitude: this.props.nearestStore.get('longitude', 0),
                }}
            />
        )
    }

    _renderButtonMenuIfNeed = () => {
        if (!!this.props.nearestStore && !!this.props.nearestStore.get('menu_images') && this.props.nearestStore.get('menu_images').size > 0) {
            return (
                <TouchableOpacity
                    onPress={this._gotoAllStoreMenu}
                    style={styles.button}>
                    <JJIcon name="list_view_o"
                            size={14}
                            color={COLOR_ORANGE}
                            style={{ marginTop: 3 }} />
                    <Text style={styles.titleButton}>
                        Xem menu
                    </Text>
                </TouchableOpacity>
            )
        }
        return null;
    }

    _renderCallStoreIfNeed = () => {
        if (this.props.nearestStore && this.props.nearestStore.get('phone_number')) {
            return (
                <TouchableOpacity
                    onPress={this._callStore}
                    style={styles.button}>
                    <JJIcon name="phone_forwarded_o"
                            size={14}
                            color={COLOR_ORANGE}
                            style={{ marginTop: 3 }} />
                    <Text style={styles.titleButton}>
                        {this.props.deal.get('deal_type') === DEAL_TYPE_MOVIE ? 'Gọi rạp chiếu' : 'Gọi cửa hàng'}
                    </Text>
                </TouchableOpacity>
            )
        }
        return null
    }

    _onBuyOnlineClicked = () => {
        if (!this.props.deal.get('online_store')) return;
        Communications.web(this.props.deal.get('online_store'))
    }

    _renderViewMoreStoreIfNeed = () => {
        const stores = this.props.deal.get('stores', []);
        if (stores.size < 1 && StringUtil.isBlank(this.props.deal.get('online_store'))) return null;
        return (
            <View style={{flex: 1, flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: COLOR_LINE}}>
                {
                    stores.size > 1 &&
                    <TouchableOpacity
                        onPress={this._goToApplyStores}
                        style={{
                            flex: 1,
                            height: 32,
                            marginRight: this.props.deal.get('online_store') ? 4:0,
                            backgroundColor: 'transparent',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: COLOR_LINE,
                            borderWidth: 1,
                        }}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: 14}}>
                            Xem thêm {stores.size - 1}{this.props.deal.get('deal_type') === DEAL_TYPE_MOVIE ? ' rạp' : ' cửa hàng'}
                        </Text>
                    </TouchableOpacity>
                }
                {
                    this.props.deal.get('online_store') &&
                    <TouchableOpacity
                        onPress={this._onBuyOnlineClicked}
                        style={{
                            flex: 1,
                            height: 32,
                            marginLeft: stores.size > 1 ? 4:0,
                            backgroundColor: 'transparent',
                            borderRadius: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: COLOR_LINE,
                            borderWidth: 1,
                        }}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: 14}}>
                            Mua online
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    _renderDistanceIfHave = () => {
        if (this.props.nearestStore && this.props.nearestStore.get('distance')) {
            return (
                <Text style={[styles.address, { color: COLOR_TEXT_INACTIVE, marginBottom: 4 }]}>
                    Gần bạn nhất - { ' ' }
                    <JJIcon color={COLOR_TEXT_INACTIVE}
                            name={'map_pin_o'}
                            size={14}/>
                    {' ' + this.props.nearestStore.get('distance')}km
                </Text>
            )
        } else {
            return null;
        }
    }

    _goToApplyStores = () => {
        this.props.navigation.navigate('ListStores', { deal: this.props.deal })
    }

    _gotoAllStoreMenu = () => {
        this.props.navigation.navigate('AllStoreMenu', { deal: this.props.deal });
    }

    _gotoStoreDirection = () => {
        this.props.navigation.navigate('StoreDirection', { store: this.props.nearestStore.toJS() });
    }

    _callStore = () => {
        Communications.phonecall(this.props.nearestStore.get('phone_number'), true)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal !== undefined && this.props.deal === undefined ||
            nextProps.nearestStore !== undefined && this.props.nearestStore === undefined;
    }
}

ApplyLocationSection.propTypes = {
    deal: PropTypes.object,
    nearestStore: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    address: {
        fontSize: 14,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titleButton: {
        color: COLOR_ORANGE,
        marginLeft: 8,
    }
});


function mapStateToProps(state) {
    return {
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], '')
    };
}

export default connect(mapStateToProps)(ApplyLocationSection);


