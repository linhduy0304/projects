import {connect} from 'react-redux';
import {Text} from 'native-base';
import {View, FlatList} from 'react-native';
import React from 'react';

import {COLOR_GRAY_BG_2, COLOR_TEXT_INACTIVE} from '../../../resources/colors';
import {provinceChanged} from '../../../utils/locationmanager/action';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {BasePureComponent} from "../../common/BasePureComponent";
import CityListItem from './CityListItem'
import {commonApi} from '../../../api/common-api'
import {ConfigDb} from "../../../api/storage/ConfigDb";
import ModalComponent from '../../../common/view/ModalComponent';

class SelectCity extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            cities: [
                {name: 'Hà Nội', id: 'ha-noi'},
                {name: 'Hải Phòng', id: 'hai-phong'},
                {name: 'Đà Nẵng', id: 'da-nang'},
                {name: 'Tp.Hồ Chí Minh', id: 'tp-hcm'},
            ]
        }
    }

    render() {
        return (
            <ModalComponent
                title={'THÀNH PHỐ'}
                onClosePressed={this._onCloseClicked}>

                <Text style={{
                    backgroundColor: COLOR_GRAY_BG_2,
                    color: COLOR_TEXT_INACTIVE,
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_CONTENT,
                    padding: DIMENSION_PADDING_MEDIUM,
                    width: '100%'
                }}>
                    Chọn thành phố
                </Text>

                <FlatList
                    style={{backgroundColor: 'white'}}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshData}
                    initialNumToRender={2}
                    maxToRenderPerBatch={5}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    data={this.state.cities}
                    keyExtractor={this._getKeyGenerator}
                    renderItem={this._renderItem}
                />
            </ModalComponent>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshData();
    }

    _getKeyGenerator = (item, index) => `province_selection_item_${index}_${item.id}`;

    _renderItemSeparatorComponent = () => <View style={{height: 1, backgroundColor: '#e5e5e5'}}/>;

    _renderItem = ({item, index}) => <CityListItem onPress={this._onCitySelected} item={item} selectedId={this.props.selectedProvince.get('id')}/>;

    _onCitySelected = (item) => {

        if (!item || !item.id) return;
        this._onCloseClicked();
        this.props.dispatch(provinceChanged(item));
        ConfigDb.updateSelectedProvince(item);
    }

    _onCloseClicked = () => {
        this.props.navigation.dismiss();
    }

    _updateData = (response) => {
        const currentCities = this.state.cities;
        let hasChanged = false;

        response.map((city, index) => {
            const currentCity = currentCities.filter((ct, i) => ct.id === city.id);
            if (!currentCity || currentCity.length < 1) {
                currentCities.push({name: city.name, id: city.id});
                hasChanged = true;
            }
        });

        if (hasChanged) {
            this.setState({
                ...this.state,
                isRefreshing: false,
                cities: currentCities
            })
        }
        else {
            this.setState({
                ...this.state,
                isRefreshing: false,
            })
        }
    }

    _refreshData = () => {
        if (!!this.props.locationSupport && this.props.locationSupport.size > 0) {
            try {
                this._updateData(this.props.locationSupport.toJS());
                return;
            } catch (e) {
                console.log(e);
            }
        }
        commonApi.getSupportLocations()
            .then(response => {
                return response.map((province, index) => {
                    return {
                        name: province.key === 'tp-hcm' ? 'Tp.Hồ Chí Minh' : province.value,
                        id: province.key
                    }
                });
            })
            .then(response => {
                this._updateData(response);
            })
            .catch(error => {
                console.log('getSupportLocations:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false
                })
            })
    }
}

function mapStateToProps(state) {
    return {
        selectedProvince: state.locationReducer.get('province'),
        locationSupport: state.locationReducer.get('locationSupport')
    };
}

export default connect(mapStateToProps)(SelectCity);

