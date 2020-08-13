import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../common/base/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
} from "../../resources/dimens";
import JJIcon from '../../common/view/icon/JJIcon';
import BottomLineListItem from '../../common/view/line/BottomLineListItem';
import {styles} from './styles';
// import Text from '../../common/view/text/JJText';
import {StringUtil} from '../../utils/string-util';
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from "../../resources/colors";

export default class SubMenuListItem extends BaseComponent {


    render() {

        const {item} = this.props;
        if (!item) return null;

        if (!!item.get('isTitle', false)) {
            return (
                <View style={{backgroundColor: 'white', marginTop: -1}}>
                    <Text style={styles.subMenuTitle}>
                        {item.get('title', '').toUpperCase()}
                    </Text>
                </View>
            )
        }

        const selected = item.get('selected', false);

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{backgroundColor: COLOR_GRAY_BG}}
                onPress={this._onPress}>

                <View style={styles.subMenuListItemContainer}>
                    <View style={[styles.subMenuItemSelectIcon, {backgroundColor: selected ? '#22C300' : 'transparent'}]}>
                        <JJIcon
                            name={selected ? 'check_o' : 'circle_o'}
                            color={selected ? 'white' : COLOR_TEXT_INACTIVE}
                            size={selected ? 10 : 16}/>
                    </View>
                    <Text style={{flex: 1, fontWeight: selected ? 'bold' : 'normal', marginLeft: DIMENSION_PADDING_SMALL}}>
                        {item.get('title', '')}
                    </Text>
                    <Text style={{fontWeight: selected ? 'bold' : 'normal'}}>
                        {StringUtil.beautyNumber(item.get('original_price', 0))}
                    </Text>
                </View>

                <BottomLineListItem
                    style={{
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM
                    }}/>

            </TouchableOpacity>
        )
    }

    _onPress = () => {
        !!this.props.onPress && this.props.onPress(this.props.item, this.props.index);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!nextProps.item) return true;
        if (!this.props.item) return true;
        if (nextProps.item.get('id') !== this.props.item.get('id')) return true;
        if (nextProps.item.get('selected') !== this.props.item.get('selected')) return true;
        if (nextProps.item.get('title') !== this.props.item.get('title')) return true;
        return false;
    }
}

SubMenuListItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    onPress: PropTypes.func
}