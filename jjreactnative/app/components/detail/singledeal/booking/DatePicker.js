import React from 'react'
import ListPicker from '../../../common/ListPicker'
import {DateUtil} from "../../../../utils/date-utils";
import moment from "moment/min/moment-with-locales";
import ListPickerItem from "../../../common/ListPickerItem";
import {ObjectUtil} from '../../../../utils/object-utils'
import ModalComponent from '../../../../common/view/ModalComponent';

moment.locale('vi');

/**
 * dates
 * dateSelected
 * onDateSelected
 */
export default class DatePicker extends React.PureComponent {

    render() {

        return(
            <ModalComponent
                title={'CHỌN NGÀY ĐẶT CHỖ'}
                onClosePressed={this._onClosePressed}>

                <ListPicker data={this.props.navigation.state.params.dates}
                            renderItem={this._renderItem}/>


            </ModalComponent>
        )
    }

    _renderItem = ({item}) => {
        const isSelected = moment(item.time).isSame(this.props.navigation.state.params.dateSelected, 'day');
        return (
            <ListPickerItem text={`${DateUtil.formatFullCalendarDate(item.time)}${item.type === 'flash_sale' ? ' ⚡' : ''}`}
                            isSelected={isSelected}
                            onPress={() => this._onDateSelected(isSelected, item)}/>
        )
    }

    _onClosePressed = () => {
        this.props.navigation.dismiss();
    }

    _onDateSelected = (isSelected, date) => {
        this.props.navigation.dismiss();
        if (!isSelected && !!ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'onDateSelected'])) {
            this.props.navigation.state.params.onDateSelected(date.time);
        }
    }
}