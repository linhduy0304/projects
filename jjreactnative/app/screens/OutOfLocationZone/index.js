import React from 'react';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from "react-native-fast-image";

import ScreenTitleHeader from '../../common/view/header/ScreenTitleHeader';
import {BaseComponent} from "../../common/base/BaseComponent";
import {COLOR_PRIMARY} from "../../resources/colors";
import ButtonFilled from '../../common/view/button/ButtonFilled';
import {styles} from './styles';
import Text from '../../common/view/text/JJText';
import {ObjectUtil} from '../../utils/object-utils';
import UserMarker from '../../common/view/highlight/UserMarker';
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {AppConfig} from '../../common/config';
import {AnalyticsHelper} from "../../common/analytics";

const StoreHeight = AppConfig.windowHeight*0.2;

const SCREEN = 'OutOfLocationZone';

export default class OutOfLocationZone extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            bind: false
        }
    }


    render() {

        const {storeLocation, userLocation} = this.props.navigation.state.params;

        return (
            <View style={{flex: 1}}>

                <ScreenTitleHeader
                    title={'BẠN ĐANG Ở QUÁ XA CỬA HÀNG'}
                    titleColor={COLOR_PRIMARY}
                    onGoBackPress={this._onBackPress}/>

                <View style={{flex: 1}}>
                    {
                        !!this.state.bind &&
                        <MapView
                            ref={this._onMapReference}
                            provider={PROVIDER_GOOGLE}
                            style={{flex: 1}}
                            liteMode={false}
                            mapPadding={{
                                bottom: 32,
                                top: 32,
                                left: 32,
                                right: 32
                            }}
                            onMapReady={this._onMapReady}>

                            <Marker
                                identifier={'store_location'}
                                coordinate={{
                                    latitude: ObjectUtil.getValue(storeLocation, 0, ['lat']),
                                    longitude: ObjectUtil.getValue(storeLocation, 0, ['lon'])
                                }}
                            />

                            <Marker
                                identifier={'user_location'}
                                coordinate={{
                                    latitude: ObjectUtil.getValue(userLocation, 0, ['lat']),
                                    longitude: ObjectUtil.getValue(userLocation, 0, ['lon'])
                                }}
                                anchor={{
                                    x: 0.5,
                                    y: 0.5
                                }}>

                                <UserMarker/>

                            </Marker>
                        </MapView>
                    }
                </View>

                <View style={styles.bottomView}>

                    <View style={{width: '100%', height: StoreHeight}}>
                        <FastImage
                            style={{width: '100%', height: '100%'}}
                            source={require('../../resources/images/redeem_near_by_store.png')}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </View>

                    <Text style={{padding: DIMENSION_PADDING_MEDIUM, fontSize: 16, textAlign: 'center'}}>
                        {`Vui lòng đến trước cửa hàng\nvà bấm nút Sử dụng mã`}
                    </Text>

                    <ButtonFilled
                        title={'OK'}
                        textSize={16}
                        style={styles.bottomButton}
                        onPress={this._onBackPress}/>
                </View>

            </View>
        )
    }

    _onBackPress = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: SCREEN,
                section: 'header'
            },
            'button_close_click',
            'go_back'
        );
        this.props.navigation.goBack();
    }

    _onMapReference = ref => this.mapView = ref;

    _onMapReady = () => {
        if (!this.mapView) return;

        this.mapView.fitToSuppliedMarkers(['store_location', 'user_location'], {edgePadding: {top: 18, bottom: 18, left: 18, right: 18}, animated: true })
    }

    componentDidMount() {
        super.componentDidMount();
        this.timeOutTask = setTimeout(() => {
            if (!this.mounted) return;
            this.setState({
                bind: true
            })
        }, 500);
    }

    componentWillUnmount() {
        if (!!this.timeOutTask) clearTimeout(this.timeOutTask);
        super.componentWillUnmount();
    }
}