import React from 'react'
import ListPicker from '../../../common/ListPicker'
import moment from "moment/min/moment-with-locales";
import ListPickerItem from "../../../common/ListPickerItem";
import ModalComponent from '../../../../common/view/ModalComponent';
import {ObjectUtil} from "../../../../utils/object-utils";

moment.locale('vi');

/**
 * slots
 * slotSelected
 * slotUnit
 * onSlotSelected
 */
export default class SlotPicker extends React.PureComponent {

    render() {
        console.log('----->>> slotpicker', this.props.navigation.state.params)
        const slots = this.props.navigation.state.params.slots;
        const slotSelected = this.props.navigation.state.params.slotSelected;
        const selectedIndex = slots.indexOf(slotSelected);
        return (
            <ModalComponent
                title={'CHỌN SỐ LƯỢNG ĐẶT CHỖ'}
                onClosePressed={this._onClosePressed}>

                <ListPicker
                    data={slots}
                    renderItem={this._renderItem}
                    selectedIndex={selectedIndex}/>


            </ModalComponent>
        )
    }

    _renderItem = ({item}) => {
        const isSelected = item === this.props.navigation.state.params.slotSelected;
        return (
            <ListPickerItem text={`${item} ${this.props.navigation.state.params.slotUnit}`}
                            isSelected={isSelected}
                            onPress={() => this._onSlotSelected(isSelected, item)}/>
        )
    }

    _onClosePressed = () => {
        this.props.navigation.dismiss();
    }

    _onSlotSelected = (isSelected, slot) => {
        this.props.navigation.dismiss();
        if (!isSelected && !!ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'onSlotSelected'])) {
            this.props.navigation.state.params.onSlotSelected(slot);
        }
    }
}