import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Svg, { Circle, Ellipse, Path, Line, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';
import ticketGroup from '../../resources/images/ticket-group.png';
import { DateUtil } from '../../utils/date-utils';
import PropTypes from 'prop-types';

import moment from 'moment/min/moment-with-locales';

moment.locale('vi');

export default class TicketItem extends Component {
    _goToMovieTicket = () => {
        const { item } = this.props;
        this.props.goToMovieTicket(item.coupon_id);
    };

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                style={{ marginBottom: 16 }}
                disabled={!!this.props.isMulti}
                activeOpacity={!!this.props.isMulti ? 1 : 0.8}
                onPress={this._goToMovieTicket}
            >
                <View>
                    <View style={styles.singleTicket}>
                        <View style={styles.ticketContaner}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Image style={{ width: 60, height: 40 }} source={ticketGroup} />
                                <Text style={{ fontWeight: 'bold', margin: 5 }}>{!!item ? item.slots : 0} vé</Text>
                                <Text style={{ fontSize: 10, fontWeight: '100', textAlign: 'center' }}>
                                    {!!item && !!item.seats ? item.seats.join(', ') : ''}{' '}
                                </Text>
                            </View>
                            <View style={{ flex: 2, marginLeft: 20, backgroundColor: '#f5f5f5' }}>
                                <Text style={{ fontWeight: 'bold', color: '#E73849', fontSize: 14, lineHeight: 18 }}>
                                    {!!item
                                        ? moment
                                              .unix(item.check_in_time)
                                              .local()
                                              .format('hh:mm A')
                                        : ''}
                                </Text>
                                <Text style={{ fontWeight: 'bold', color: '#E73849', fontSize: 14, lineHeight: 18 }}>
                                    {!!item ? DateUtil.formatFullDateFromUnix(item.check_in_time) : ''}
                                </Text>
                                <Text style={{ fontWeight: '100', fontSize: 12, lineHeight: 16, color: '#454545', marginTop: 7 }} numberOfLines={2}>
                                    Rạp: {!!item ? item.cinema : ''}
                                </Text>
                            </View>
                        </View>
                        <Svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: -2.8,
                                left: 0,
                                right: -3.1
                            }}
                        >
                            <Circle r="8" fill={'white'} cy="50%" stroke="#e3e3e3" strokeWidth="1" strokeOpacity={1} />
                            <Circle r="8" fill={'white'} cy="50%" cx="99%" stroke="#e3e3e3" stroke-width="1" strokeOpacity={1} />
                            <Circle r="8" fill={'white'} cy="0" cx={'35%'} stroke="#e3e3e3" strokeWidth="1" strokeOpacity={1} />
                            <Circle
                                r="8"
                                fill={!!this.props.isMulti ? '#f5f5f5' : 'white'}
                                cy="98%"
                                cx={'35%'}
                                stroke={'#e3e3e3'}
                                strokeWidth={1}
                                strokeOpacity={1}
                            />
                            <Line x1="35%" y1="12" x2="35%" y2="88%" stroke="white" strokeWidth="1.2" strokeDasharray={[4]} />
                        </Svg>
                    </View>
                </View>
                {!!this.props.isMulti && (
                    <View style={styles.multiSection}>
                        <Svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: -1,
                                left: 0,
                                right: -3.1,
                                zIndex: 100
                            }}
                        >
                            <Circle r="8" fill={'white'} cy="125%" cx={'34.5%'} stroke="#e3e3e3" strokeWidth={1} strokeOpacity={1} />
                        </Svg>
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}
TicketItem.propTypes = {
    isMulti: PropTypes.bool,
    item: PropTypes.object
};

const styles = StyleSheet.create({
    singleTicket: {
        position: 'relative',
        marginHorizontal: 16,
        overflow: 'hidden',
        borderRadius: 4
    },
    ticketContaner: {
        padding: 16,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        position: 'relative',
        borderColor: '#e3e3e3',
        borderWidth: 1
    },
    multiSection: {
        width: '88%',
        height: 6,
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        position: 'relative',
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 3.8,
        borderBottomRightRadius: 3.8
    }
});
