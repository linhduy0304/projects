import React, { Component } from 'react';
import { Keyboard, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL } from '../../resources/dimens';
import { COLOR_TEXT_GRAY, COLOR_TEXT_INACTIVE } from '../../resources/colors';
import JJIcon from '../../common/view/icon/JJIcon';
import AddressRow from './AddressRow';
import HistoryRow from './HistoryRow';
import MapSection from './MapSection';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { GOOGLE_API_KEY } from '../../const';
import { Spinner } from 'native-base';
import { styles } from './style';
export default class AddressModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMap: false,
            history: [],
            loadingHistory: false,
            searchText: !!this.props.currentAddress ? this.props.currentAddress : ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentAddress.length > 0) {
            return {
                ...state,
                searchText: props.currentAddress
            };
        }
        return { ...state };
    }
    renderAddressItem = (locationResults, fetchDetails) => {
        return (
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={locationResults}
                onScroll={() => {
                    Keyboard.dismiss();
                }}
                keyExtractor={(item, index) => `address_${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <AddressRow item={item} onPress={this.setAddress} fetchDetails={fetchDetails} />}
            />
        );
    };

    renderHistoryItem = () => {
        if (this.state.loadingHistory) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20
                    }}
                >
                    <Spinner color={COLOR_TEXT_INACTIVE} size={1} />
                </View>
            );
        }
        return (
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={this.state.history}
                onScroll={() => {
                    Keyboard.dismiss();
                }}
                keyExtractor={(item, index) => `history_${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <HistoryRow item={item} onPress={this.setAddress} />}
            />
        );
    };

    setAddress = (address, lat, long) => {
        this.props.getAddress(address, lat, long);
    };

    renderMap = () => {
        if (!!this.state.isMap) {
            return <MapSection onConfirmAddress={this.setAddress} locationStore={this.props.locationStore} goBack={this._onOpenSearchMode} />;
        }
    };

    renderList = () => {
        if (!this.state.isMap) {
            return (
                <GoogleAutoComplete apiKey={GOOGLE_API_KEY} debounce={300} queryTypes="" radius={'20000'} language="vi" components="country:vn">
                    {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearchs }) => (
                        <View style={{ flex: 1, paddingHorizontal: DIMENSION_PADDING_MEDIUM }}>
                            <View style={styles.ctSearch}>
                                <JJIcon name="search" style={{ marginHorizontal: 15 }} size={20} color={COLOR_TEXT_GRAY} />
                                <TextInput
                                    style={styles.searchInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={text => {
                                        handleTextChange(text);
                                        this.setState({
                                            searchText: text
                                        });
                                    }}
                                    placeholder="Tìm kiếm vị trí"
                                    ref={input => {
                                        this.input = input;
                                    }}
                                    // value={this.state.searchText === '' ? this.state.searchText : inputValue}
                                    defaultValue={this.state.searchText}
                                    autoCorrect={false}
                                />
                                {this.state.searchText.length > 0 && (
                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={() => {
                                            this.setState({
                                                searchText: ''
                                            });
                                            clearSearchs();
                                        }}
                                    >
                                        <JJIcon name="x_circle_o" size={16} color={COLOR_TEXT_GRAY} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TouchableOpacity style={styles.openMap} onPress={this._onOpenMapMode}>
                                <JJIcon name="near_by_o" size={20} color={'#000'} />
                                <Text
                                    style={{
                                        marginLeft: DIMENSION_PADDING_SMALL,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Chọn vị trí trên bản đồ
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                {locationResults.length == 0 || inputValue.length === 0
                                    ? this.renderHistoryItem()
                                    : this.renderAddressItem(locationResults, fetchDetails)}
                            </View>
                        </View>
                    )}
                </GoogleAutoComplete>
            );
        }
    };

    componentDidMount = () => {
        setTimeout(() => {
            this.getLocationHistory();
            !!this.input && !!this.input.focus && this.input.focus();
        }, 500);
    };

    getNearBy = async (latitude, longitude) => {
        try {
            const ret = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${GOOGLE_API_KEY}`
            );
            const rawData = await ret.json();

            const data = [];
            if (!!rawData.results) {
                for (let i = 1; i <= 10; i++) {
                    data.push({
                        address: rawData.results[i].vicinity,
                        lat: rawData.results[i].geometry.location.lat,
                        long: rawData.results[i].geometry.location.lng,
                        place_id: rawData.results[i].place_id,
                        isNearby: true
                    });
                }
                this.setState({
                    history: data
                });
            }
        } catch (error) {}
    };

    getLocationHistory = async () => {
        try {
            this.setState({ loadingHistory: true });
            const ret = await AsyncStorage.getItem('LocationHistory');
            if (!ret) {
                this.setState({ history: [] });
            } else {
                const history = JSON.parse(ret);
                if (history.length > 10) {
                    history.length = 10;
                }
                this.setState({
                    history: history
                });
            }
        } catch (error) {
            console.debug(error);
        } finally {
            this.setState({ loadingHistory: false });
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.swipeDown} />
                </View>
                {this.renderList()}
                {this.renderMap()}
            </View>
        );
    }

    _onOpenSearchMode = () => {
        this.props.onTrackingTrigger('switch_to_search_address');
        this.setState({ isMap: false });
    };

    _onOpenMapMode = () => {
        this.props.onTrackingTrigger('switch_to_map_picker');
        this.setState({
            isMap: true
        });
    };
}
