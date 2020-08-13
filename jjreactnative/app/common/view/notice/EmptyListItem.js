import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import JJIcon from '../icon/JJIcon';
import {styles} from './styles';
import Text from '../text/JJText';
import {COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";

export default class EmptyListItem extends BasePureComponent {

    render() {
        return (
            <View style={styles.emptyListItemContainer}>
                <JJIcon
                    name={this.props.icon}
                    size={24}
                    color={COLOR_TEXT_INACTIVE_DISABLE}/>

                <Text style={styles.emptyListItemText}>
                    {this.props.message}
                </Text>
            </View>
        )
    }
}

EmptyListItem.defaultProps = {
    icon: 'search',
    message: 'Không tìm thấy sản phẩm nào!'
};

EmptyListItem.propTypes = {
    icon: PropTypes.string,
    message: PropTypes.string
};