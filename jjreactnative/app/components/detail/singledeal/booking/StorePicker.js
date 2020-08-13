import React from 'react'
import ListPicker from '../../../common/ListPicker'
import ListPickerItem from "../../../common/ListPickerItem";
import {ObjectUtil} from '../../../../utils/object-utils';
import {DEAL_TYPE_MOVIE} from "../../../../const";
import ModalComponent from '../../../../common/view/ModalComponent';

/**
 * stores
 * storeSelected
 * dealType
 * onStoreSelected
 */
export default class StorePicker extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            data:[],
            selectedIndex: 0
        }
    }

    render() {
        return(
            <ModalComponent
                title={ObjectUtil.getValue(this.props, '', ['navigation', 'state', 'params', 'dealType']) === DEAL_TYPE_MOVIE ? 'CHỌN RẠP CHIẾU' : 'CHỌN CỬA HÀNG'}
                onClosePressed={this._onClosePressed}>

                {
                    this.state.data.length > 0 &&
                    <ListPicker data={this.state.data}
                                renderItem={this._renderItem}
                                selectedIndex={this.state.selectedIndex}/>
                }


            </ModalComponent>
        )
    }

    componentDidMount() {
        this._prepareData();
    }

    _prepareData = () => {
        const stores = this.props.navigation.state.params.stores;
        const storeSelected = this.props.navigation.state.params.storeSelected;

        if (!stores) return;
        let selectedIndex = -1;
        if (!!storeSelected) {
            const selected = !!storeSelected.get('store') ? storeSelected.get('store') : storeSelected;

            selectedIndex = stores.findIndex((item, i) => {
                const store = !!item.get('store') ? item.get('store') : item;
                return store.get('id', '') === selected.get('id', '')
            })
        }

        this.setState({
            data: stores.toJS(),
            selectedIndex
        })
    }

    _renderItem = ({item, index}) => {
        const isSelected = this.state.selectedIndex === index;
        const store = !!item.store ? item.store : item;
        return (
            <ListPickerItem text={`${store.address}${!!store.distance ? ' - ' + store.distance + 'km' : ''}`}
                            isSelected={isSelected}
                            onPress={() => this._onStoreSelected(isSelected, item)}/>
        )
    }

    _onClosePressed = () => {
        this.props.navigation.dismiss();
    }

    _onStoreSelected = (isSelected, store) => {
        this.props.navigation.dismiss();
        if (!isSelected) this.props.navigation.state.params.onStoreSelected(store);
    }
}