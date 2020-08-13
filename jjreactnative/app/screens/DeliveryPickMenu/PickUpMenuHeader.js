import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY, DIMENSION_TEXT_SUB,
} from "../../resources/dimens";
import BottomLineListItem from '../../common/view/line/BottomLineListItem';
import {styles} from './styles';
import Text from '../../common/view/text/JJText';
import {StringUtil} from '../../utils/string-util';
import MenuItemSelection from "./MenuItemSelection";
import ExclusiveFlag from './ExclusiveFlag';
import {BasePureComponent} from "../../common/base/BasePureComponent";
import NoteMenuHeader from './NoteMenuHeader';

export default class PickUpMenuHeader extends BasePureComponent {


    render() {

        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.pickMenuDialogHeader}>
                        <Text style={styles.pickMenuDialogTitle}>
                            {this.props.title}
                        </Text>
                        <Text>
                            {StringUtil.beautyNumber(this.props.price)}
                        </Text>
                    </View>

                    <MenuItemSelection
                        value={this.props.quantity}
                        onMinus={this.props.onMinus}
                        onPlus={this.props.onPlus}/>
                </View>

                <View style={styles.discountNotice}>
                    <ExclusiveFlag size={'small'} style={{opacity: !!this.props.isDiscounted ? 1 : 0.2}}/>
                    <Text style={{fontSize: DIMENSION_TEXT_SUB, fontStyle: 'italic', marginLeft: DIMENSION_PADDING_TINY}}>
                        {!!this.props.isDiscounted ? 'Sản phẩm áp dụng ưu đãi JAMJA' : 'Sản phẩm KHÔNG áp dụng ưu đãi JAMJA'}
                    </Text>
                </View>

                <BottomLineListItem style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_MEDIUM}}/>

                <NoteMenuHeader
                    onChangeNote={this.props.onChangeNote}
                    note={this.props.note}
                />
            </View>
        )
    }
}

PickUpMenuHeader.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    isDiscounted: PropTypes.bool,
    onPlus: PropTypes.func,
    onMinus: PropTypes.func,
    onChangeNote: PropTypes.func,
    note: PropTypes.string,
}