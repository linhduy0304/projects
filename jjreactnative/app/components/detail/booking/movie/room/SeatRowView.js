import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'native-base';

import {BaseComponent} from "../../../../common/BaseComponent";
import SeatView from './SeatView';

export default class SeatRowView extends BaseComponent {

    render() {

        if (!this.props.seats || this.props.seats.size < 1) {
            return <Row/>
        }

        return (
            <Row>
                {
                    this.props.seats.map((s, i) => {
                        return (
                            <Col key={`mv_c_${i}`}>
                                <SeatView
                                    onPress={this.props.onSeatPressed}
                                    seat={s}/>
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.seats) return true;
        if (!this.props.seats) return true;

        if (!nextProps.seats.equals(this.props.seats)) return true;

        return false;
    }
}

SeatRowView.propTypes = {
    seats: PropTypes.any,
    onSeatPressed: PropTypes.any
}