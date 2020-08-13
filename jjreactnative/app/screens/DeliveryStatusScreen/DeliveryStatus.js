import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import JJIcon from '../../common/view/icon/JJIcon';
import {
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE_DISABLE
} from '../../resources/colors';

import IconProgress from './IconInProgress';
import StatusInProgress from './StatusInProgress';
import Text from '../../common/view/text/JJText';
import PropTypes from 'prop-types';
moment.locale('vi');

const Dash = ({ color }) => (
    <View
        style={{
            width: 1,
            height: 5,
            borderRadius: 1,
            backgroundColor: color,
            marginVertical: 2
        }}
    />
);

export default class DeliveryStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: 0
        };
    }

    _renderIcon = () => {
        const { status } = this.props;
        let color = COLOR_TEXT_INACTIVE_DISABLE;
        switch (status) {
            case 'done':
                color = '#22C300';
                break;
            case 'inprogress':
                color = '#22C300';
                break;
            default:
                break;
        }
        switch (status) {
            case 'done':
                return (
                    <View style={[styles.iconStyle, { backgroundColor: color }]}>
                        <JJIcon name="check_o" size={13} color={'#ffffff'} />
                    </View>
                );
            case 'undone':
                return (
                    <View style={[styles.iconStyle, { backgroundColor: color }]}>
                        <JJIcon name="check_o" size={13} color={'#ffffff'} />
                    </View>
                );
            case 'inprogress':
                return <IconProgress color={color} />;
            default:
                break;
        }
    };

    onLayout = e => {
        this.setState({
            contentHeight: e.nativeEvent.layout.height
        });
    };

    _renderStatus = () => {
        const { status } = this.props;
        switch (status) {
            case 'done':
                return <Text style={[styles.statusText, { color: COLOR_TEXT_BLACK_1 }]}>{this.props.titleAfter.toUpperCase()}</Text>;
            case 'undone':
                return <Text style={[styles.statusText, { color: COLOR_TEXT_INACTIVE_DISABLE }]}>{this.props.titleBefore.toUpperCase()}</Text>;
            case 'inprogress':
                color = '#22C300';
                return <StatusInProgress title={this.props.title.toUpperCase()} color={'#22C300'} />;
            default:
                return null;
        }
    };

    _renderContent = () => {
        if (!!this.props.renderContent) {
            return this.props.renderContent(this.onLayout);
        }
    };

    _renderDash = () => {
        const { status } = this.props;
        let color = COLOR_TEXT_INACTIVE_DISABLE;
        if (status === 'done') {
            color = '#22C300';
        }
        const dashGroup = [];
        if (!!this.props.renderContent) {
            const length = this.state.contentHeight;
            for (let i = 0; i <= Math.floor(length / 9) + 2; i++) {
                dashGroup.push(<Dash color={color} key={`${status}_dash_${i}`}/>);
            }
        } else {
            for (let i = 0; i <= 3; i++) {
                dashGroup.push(<Dash color={color} key={`${status}_dash_${i}`}/>);
            }
        }
        return dashGroup;
    };

    render() {
        const { last, status, timeCheck } = this.props;
        return (
            <View style={{ paddingLeft: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this._renderIcon()}
                    {this._renderStatus()}
                    {status !== 'undone' && (
                        <Text style={styles.txtTime}>
                            {moment
                                .utc(timeCheck)
                                .local()
                                .format('HH:mm A, DD/MM/YYYY')}
                        </Text>
                    )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 17, alignItems: 'center' }}>{!last && this._renderDash()}</View>
                    <View style={{ paddingRight: 16, flex: 1 }}>{this._renderContent()}</View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtTime: {
        marginLeft: 14,
        flex: 1,
        color: '#454545',
        fontSize: 12
    },
    iconStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        // backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusText: {
        fontWeight: 'bold',
        marginLeft: 13
    }
});

DeliveryStatus.propTypes = {
    title: PropTypes.string,
    titleAfter: PropTypes.string,
    titleBefore: PropTypes.string,
    timeCheck: PropTypes.string,
    renderContent: PropTypes.any,
    status: PropTypes.string,
    last: PropTypes.boolean
}
