import React from 'react'
import PropTypes from 'prop-types'
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Rect
} from 'react-native-svg';

import JJIcon from "../common/JJIcon";

import {calculateDistance} from '../../utils/LocationUtils'
import Communications from "react-native-communications";
import {BaseComponent} from "./BaseComponent";
import {StringUtil} from '../../utils/string-util'
import {DEAL_TYPE_MOVIE} from "../../const";
import Text from '../../common/view/text/JJText';

const MAPVIEW_HEIGHT = 145;

export default class ReservationMapView extends BaseComponent {

    render() {

        let storeCount = 0;
        if (this.props.deal && this.props.deal.get('stores')) {
            storeCount = this.props.deal.get('stores').size;
        }

        console.log('ReservationMapView:render', storeCount, this.props);

        return (
            <View style={styles.container}>

                <View style={styles.mapLayout}>
                    <MapView
                        ref={(mapView) => this.mapView = mapView}
                        style={{flex: 1}}
                        liteMode={true}
                        region={this._getRegion()}
                        onLayout={this._onLayoutInit}
                    >
                        {this._renderMarker()}
                    </MapView>

                    <Svg style={styles.mapGradient}>
                        <Defs>
                            <LinearGradient id="grad" x1="100%" y1="0%" x2="0%" y2="0%">
                                <Stop offset="1" stopColor="white" stopOpacity="0.8"/>
                                <Stop offset="0.7" stopColor="white" stopOpacity="0.8"/>
                                <Stop offset="0.2" stopColor="white" stopOpacity="0"/>
                                <Stop offset="0" stopColor="white" stopOpacity="0"/>
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="150" fill="url(#grad)"/>
                    </Svg>

                    <View style={styles.textInfo}>
                        <Text style={styles.textBrandName}>
                            {this.props.deal.getIn(['brand', 'brand_name'], '')}
                        </Text>
                        <Text>
                            {this._getAddress()}
                        </Text>

                    </View>

                </View>

                <View style={styles.actionLayout}>
                    {
                        ((storeCount === 1 && !StringUtil.isBlank(this.props.deal.get('stores').get(0).get('phone_number'))) || storeCount > 1) &&
                        <TouchableOpacity
                            style={styles.buttonCall}
                            onPress={this._onPressCallStore}>
                            <Text>
                                <JJIcon name={storeCount === 1 ? 'phone_forwarded_o' : 'phone_o'} size={14}
                                        color={'#EF863B'}/>
                                <Text style={{
                                    color: '#EF863B',
                                    fontSize: 14
                                }}>{storeCount === 1 ? ' Gọi' : ' ' + storeCount} {this.props.deal.get('deal_type') ===  DEAL_TYPE_MOVIE ? ' rạp chiếu' : ' cửa hàng'}</Text>
                            </Text>
                        </TouchableOpacity>
                    }

                    {
                        storeCount === 1 &&
                        <TouchableOpacity style={
                            [
                                styles.buttonDirect,
                                !StringUtil.isBlank(this.props.deal.get('stores').get(0).get('phone_number')) ?
                                    {
                                        borderLeftWidth: 0.5,
                                        borderLeftColor: '#ededed'
                                    } : null
                            ]
                        } onPress={this._onPressNavigation}>
                            <Text>
                                <JJIcon name={'navigation_o'} size={14} color={'#EF863B'}/>
                                <Text style={{color: '#EF863B', fontSize: 14, padding: 4}}> Chỉ đường</Text>
                            </Text>
                        </TouchableOpacity>
                    }
                </View>


            </View>
        )
    }

    _onLayoutInit = (evt) => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;
        this.mapView.fitToCoordinates(this._getCoordinatesToFit(), this._getPaddingOptions())
    }

    _getRegion = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;
        let store = this.props.deal.get('stores').get(0);
        return (
            {
                latitude: store.get('latitude', 0) + 0.00009,
                longitude: store.get('longitude', 0) - 0.0006,
                latitudeDelta: 0.0009,
                longitudeDelta: 0.0005,
            }
        )
    }

    _getCoordinatesToFit = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;
        const coordinates = [];
        this.props.deal.get('stores').map(
            (store) => {
                coordinates.push({latitude: store.get('latitude', 0), longitude: store.get('longitude', 0)})
            }
        );

        return coordinates
    }

    _getPaddingOptions = () => {
        return {
            edgePadding: {
                top: 0,
                left: 200,
                bottom: 0,
                right: 0
            },
            animated: true
        }
    }

    _renderMarker = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;

        if (this.props.deal.get('stores').size === 1) {
            return (
                <Marker
                    coordinate={{
                        latitude: this.props.deal.get('stores').get(0).get('latitude', 0),
                        longitude: this.props.deal.get('stores').get(0).get('longitude', 0),
                    }}
                />
            )
        }

        return (
            this.props.deal.get('stores').map(store => (
                <Marker
                    key={'marker_' + store.get('id', '')}
                    coordinate={{
                        latitude: store.get('latitude', 0),
                        longitude: store.get('longitude', 0),
                    }}
                />
            ))
        )
    }

    _getAddress = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;

        if (this.props.deal.get('stores').size === 1) {
            return this.props.deal.get('stores').get(0).get('address', '') + this._getDistance(this.props.deal.get('stores').get(0));
        }
        return 'Áp dụng tại ' + this.props.deal.get('stores').size + ' cửa hàng của ' + this.props.deal.getIn(['brand', 'brand_name'], '');
    }

    _getDistance = (store) => {
        if (this.props.userLat === undefined || this.props.userLat === null || this.props.userLat === 0 ||
            this.props.userLong === undefined || this.props.userLong === null || this.props.userLong === 0) return '';

        return ' - (' + calculateDistance(this.props.userLat, this.props.userLong, store.get('latitude', 0), store.get('longitude', 0)) + 'km)'
    }

    _onPressCallStore = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;
        if (this.props.deal.get('stores').size === 1) {
            if (!StringUtil.isBlank(this.props.deal.get('stores').get(0).get('phone_number'))) Communications.phonecall(this.props.deal.get('stores').get(0).get('phone_number'), true)
            return;
        }

        this.props.navigation.navigate('ListStores', {deal: this.props.deal})
    }

    _onPressNavigation = () => {
        if (!this.props.deal || !this.props.deal.get('stores') || this.props.deal.get('stores').size < 1) return;
        this.props.navigation.navigate('StoreDirection', {store: this.props.deal.get('stores').get(0).toJS()});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.userLat !== this.props.userLat ||
            nextProps.userLong !== this.props.userLong;
    }
}

ReservationMapView.propTypes = {
    navigation: PropTypes.object,
    deal: PropTypes.object,
    userLat: PropTypes.number,
    userLong: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    mapLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: MAPVIEW_HEIGHT
    },
    mapGradient: {
        position: 'absolute',
        height: MAPVIEW_HEIGHT,
        width: '100%',
        top: 0,
        left: 0
    },
    textInfo: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 16,
        left: 16,
        width: '66%'
    },
    textBrandName: {
        fontWeight: 'bold'
    },
    actionLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonCall: {
        flex: 0.5,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDirect: {
        flex: 0.5,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
})