import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import {fromJS} from "immutable";

import Row from './Row'
import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};
const STOP_SPEED = 2000;

export default class GridGameBoard extends BasePureComponent {

    stopSpeed = 0;

    constructor(props) {
        super(props);

        this.state = {
            activeItem: fromJS({})
        };

        styles.row = {
            width: '100%',
            height: '28%',
            flexDirection: 'row'
        };
    }

    render() {
        console.log('GridGameBoard:render', this.state.activeItem.toJS());
        return (
            <View style={this.props.style}>

                <Row scalable={this.props.scalable}
                     image={this.state.activeItem.getIn(['r1', 'image'])}
                     pos={this.state.activeItem.getIn(['r1', 'pos'])}
                     style={styles.row}/>

                <Row scalable={this.props.scalable}
                     image={this.state.activeItem.getIn(['r2', 'image'])}
                     pos={this.state.activeItem.getIn(['r2', 'pos'])}
                     style={styles.row}/>

                <Row scalable={this.props.scalable}
                     image={this.state.activeItem.getIn(['r3', 'image'])}
                     pos={this.state.activeItem.getIn(['r3', 'pos'])}
                     style={styles.row}/>

            </View>
        )
    }

    _setActiveItem = (row, image, pos) => {
        let activeItem = this.state.activeItem;
        activeItem = activeItem.clear();

        let rowName = 'r1';
        if (row === 1) {
            rowName = 'r2';
        }
        else if (row === 2) {
            rowName = 'r3';
        }
        activeItem = activeItem.updateIn([rowName, 'image'], () => image);
        activeItem = activeItem.updateIn([rowName, 'pos'], () => pos);

        this.setState({
            ...this.state,
            activeItem
        });
    }

    _run = () => {
        const randomGift = this._getRandomGiftPosition();
        const randomRow = this._getRandomItemPosition();
        const randomItem= this._getRandomItemPosition();
        const image = this.props.giftList[randomGift];

        this._setActiveItem(randomRow, image, randomItem);
        this.startSubscription = setTimeout(this._run, 250);
    }

    _stopRun = () => {
        this.state.activeItem = this.state.activeItem.clear();

        const randomRow = this._getRandomItemPosition();
        const randomItem= this._getRandomItemPosition();

        if (this.stopSpeed >= STOP_SPEED) {
            clearTimeout(this.stopSubscription);
            const image = {uri: this.props.giftImage};
            this._setActiveItem(randomRow, image, randomItem);
            this.props.onStopped();
            return;
        }

        const randomGift = this._getRandomGiftPosition();
        const image = this.props.giftList[randomGift];
        this._setActiveItem(randomRow, image, randomItem);
        this.stopSpeed += 250;
        this.stopSubscription = setTimeout(this._stopRun, this.stopSpeed);
    }

    _start = () => {
        console.log('GridGameBoard:start');
        clearTimeout(this.stopSubscription);
        this._run();
    }

    _stop = () => {
        clearTimeout(this.startSubscription);
        console.log('GridGameBoard:_stop');
        this.stopSpeed = 250;
        this._stopRun();
    }

    _release = () => {
        clearTimeout(this.stopSubscription);
        clearTimeout(this.startSubscription);
        this.stopSpeed = 0;
        this.setState({
            ...this.state,
            activeItem: fromJS({})
        })
    }

    _getRandomGiftPosition = () => {
        const value = Math.floor(Math.random() * 10);
        if (value === this.state.activePosition) return this._getRandomPosition();
        return value;
    };

    _getRandomItemPosition = () => {
        const value = Math.floor(Math.random() * 4);
        if (value === this.state.activePosition) return this._getRandomPosition();
        return value;
    };

    componentDidMount() {
        super.componentDidMount();
        this.props.controller(this._start, this._stop, this._release);
    }

    componentWillUnmount() {
        clearTimeout(this.startSubscription);
        clearTimeout(this.stopSubscription);
        super.componentWillUnmount();
    }
}

GridGameBoard.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    giftImage: PropTypes.any,
    giftList: PropTypes.any,
    controller: PropTypes.any,
    onStopped: PropTypes.any,
}