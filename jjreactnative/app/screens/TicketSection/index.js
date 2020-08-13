import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TicketItem from './TicketItem';
import { DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY } from '../../resources/dimens';
import { COLOR_TEXT_BLACK_1, COLOR_PRIMARY } from '../../resources/colors';
import Text from '../../common/view/text/JJText';
import JJIcon from '../../common/view/icon/JJIcon';
import PropTypes from 'prop-types';

export default class TicketSection extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Mã phim chưa đổi</Text>
                        {this.props.totalTicket > 1 && (
                            <TouchableOpacity
                                disabled={this.props.bookedTicket.length < 2}
                                activeOpacity={0.8}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={this._openTicketModal}
                            >
                                <Text style={styles.seeMore}>Xem tất cả ({this.props.totalTicket})</Text>
                                <JJIcon name="chevron_down_o" size={8} color={COLOR_PRIMARY} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._openTicketModal} disabled={this.props.bookedTicket.length < 2}>
                        <TicketItem
                            item={this.props.bookedTicket[0]}
                            isMulti={this.props.bookedTicket.length > 1}
                            goToMovieTicket={this.props.goToMovieTicket}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _openTicketModal = () => {
        !!this.props.openModal && this.props.openModal();
    };
}

TicketSection.defaultProps = {
    totalTicket: 0
}

TicketSection.propTypes = {
    bookedTicket: PropTypes.array,
    openModal: PropTypes.func,
    totalTicket: PropTypes.number,
    goToMovieTicket: PropTypes.func
};

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#ffffff'
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: DIMENSION_PADDING_MEDIUM
    },
    sectionHeaderText: {
        color: COLOR_TEXT_BLACK_1,
        fontWeight: 'bold',
        fontSize: 14
    },
    seeMore: {
        color: COLOR_PRIMARY,
        fontSize: 14,
        marginRight: DIMENSION_PADDING_TINY
    }
});
