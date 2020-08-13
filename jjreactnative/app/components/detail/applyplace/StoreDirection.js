import { Marker } from 'react-native-maps';
import { Text, Container } from 'native-base';
import { View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import React, { Component } from 'react';

import { strings } from '../../../../locates/i18n';
import JJHeader from '../../common/JJHeader';

export default class StoreDirection extends Component {

    static navigationOptions = {
        header: null,
    }

    openNativeMap(address) {
        Platform.select({
            ios: () => {
                Linking.openURL(`http://maps.apple.com/maps?daddr=${address}`);
            },
            android: () => {
                Linking.openURL(`http://maps.google.com/maps?daddr=${address}`).catch(err => console.error('An error occurred', err));;
            }
        })();
    }

    render() {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'BẢN ĐỒ'}
                />
                {/* Content View */}
                <View style={{ flex: 1, backgroundColor: 'green' }}>

                    <MapView
                        style={styles.map}
                        region={{
                            latitude: this.props.navigation.state.params.store.latitude,
                            longitude: this.props.navigation.state.params.store.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: this.props.navigation.state.params.store.latitude,
                                longitude: this.props.navigation.state.params.store.longitude
                            }}
                            title={this.props.navigation.state.params.store.address}
                        />
                    </MapView>

                    <TouchableOpacity
                        onPress={() => {
                            this.openNativeMap(this.props.navigation.state.params.store.address)
                        }}
                        style={{
                            position: 'absolute',
                            alignSelf: 'center', bottom: 16,
                            padding: 16,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>

                        <Icon name={"md-navigate"} size={40} color='gray' />
                        <Text style={{ fontSize: 18, color: 'gray', marginTop: 8 }}>Chỉ Đường</Text>

                    </TouchableOpacity>

                </View>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    address: {
        fontSize: 12,
        justifyContent: 'flex-start',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titleButton: {
        color: 'orange',
        marginLeft: 8,
    }
});


