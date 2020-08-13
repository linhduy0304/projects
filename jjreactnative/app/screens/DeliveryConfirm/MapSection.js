import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { DIMENSION_TEXT_HEADER } from '../../resources/dimens';
import JJIcon from '../../common/view/icon/JJIcon';
import JJLocationManager from '../../utils/locationmanager/JJLocationManager';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
import MapView from 'react-native-maps';
import marker from '../../resources/images/marker-ggmap.png';
import { GOOGLE_API_KEY } from '../../const';
import { styles } from './style';
import Alert from '../../common/view/alert/Alert';
import { AppConfig } from '../../common/config';

export default class MapSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };
    }

    componentDidMount = () => {
        this.getCurrentLocation();
    };

    getCurrentLocation = () => {
        const { locationStore } = this.props;
        const locationManager = new JJLocationManager();
        locationManager.fetchLocation(
            (latitude, longitude) => {
                this.setState({
                    region: {
                        latitudeDelta,
                        longitudeDelta,
                        latitude: latitude,
                        longitude: longitude
                    }
                });
            },
            error => {
                this.setState({
                    region: {
                        latitudeDelta,
                        longitudeDelta,
                        latitude: locationStore.get('latitude', 0),
                        longitude: locationStore.get('longitude', 0)
                    }
                });
            }
        );
    };

    onRegionChange = region => {
        this.setState(
            {
                region
            },
            () => {
                this.getAddress(region);
            }
        );
    };

    getAddress = async region => {
        try {
            const ret = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${GOOGLE_API_KEY}&result_type=street_address`
            );
            const data = await ret.json();

            if (!!data.results && data.results.length > 0) {
                this.setState({
                    address: data.results[0].formatted_address,
                    lat: data.results[0].geometry.location.lat,
                    long: data.results[0].geometry.location.lng
                });
            }
        } catch (error) {
            console.debug(error);
        }
    };

    onConfirmAddress = () => {
        if (this.state.address && !!this.state.lat && !!this.state.long) {
            this.props.onConfirmAddress(this.state.address, this.state.lat, this.state.long);
        } else {
            // Alert.alert('Lỗi', 'Thông tin địa chỉ không hợp lệ');
            this.refs.alert.show('Lỗi', 'Thông tin địa chỉ không hợp lệ', [
                {
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {}
                }
            ]);
        }
    };

    render() {
        let styleMap = AppConfig.ios ? {bottom: 60, left: 16} : {bottom: 0, left: 0};
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={this.props.goBack}>
                        <JJIcon name="chevron_left_o" size={24} color={'#000'} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', marginLeft: 17, flex: 1 }}>{this.state.address}</Text>
                </View>
                <View style={styles.map}>
                    {!!this.state.region && (
                        <MapView
                            style={styles.map}
                            // region={region}
                            onRegionChangeComplete={this.onRegionChange}
                            initialRegion={this.state.region}
                            mapPadding={styleMap}
                        />
                    )}

                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={marker} />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.confirmAddressButton} onPress={this.onConfirmAddress}>
                        <Text
                            style={{
                                color: '#ffffff',
                                fontSize: DIMENSION_TEXT_HEADER,
                                fontWeight: 'bold'
                            }}
                        >
                            XÁC NHẬN
                        </Text>
                    </TouchableOpacity>
                </View>
                <Alert ref={'alert'} />
            </View>
        );
    }
}
