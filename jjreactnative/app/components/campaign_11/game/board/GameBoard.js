import React from 'react'
import PropTypes from 'prop-types'
import {Text, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import GridGameBoard from './GridGameBoard'
import GridGameBoardPlaceholder from './GridGameBoardPlaceholder'
import GridGameBoardError from './GridGameBoardError'
import {GameState} from '../GameUtil'
import {BasePureComponent} from "../../../common/BasePureComponent";
import {DIMENSION_PADDING_SMALL} from "../../../../resources/dimens";
import {SFUFont} from "../../sfu-font-util";

const giftList = [
    require('../../../../resources/game/gift/xs.png'),
    require('../../../../resources/game/gift/card.png'),
    require('../../../../resources/game/gift/lau1.png'),
    require('../../../../resources/game/gift/lau1.png'),
    require('../../../../resources/game/gift/lau2.png'),
    require('../../../../resources/game/gift/card.png'),
    require('../../../../resources/game/gift/lau2.png'),
    require('../../../../resources/game/gift/makeup.png'),
    require('../../../../resources/game/gift/coupon.png'),
    require('../../../../resources/game/gift/coupon.png'),
    require('../../../../resources/game/gift/milktea.png'),
];

export default class GameBoard extends BasePureComponent {

    gameBoardGridController;
    customStyles = {};

    constructor(props) {
        super(props);

        const scalable = props.scalable;
        this.customStyles.size_14 = scalable * 14;
        this.customStyles.size_16 = scalable * 16;
        this.customStyles.size_72 = scalable * 72;
        this.customStyles.size_96 = scalable * 114;

        this.customStyles.main = {
            width: scalable * 330,
            height: scalable * 407,
            alignItems: 'center',
            marginTop: DIMENSION_PADDING_SMALL
        };
        this.customStyles.logo = {
            width: scalable * 174,
            height: scalable * 63,
            position: 'absolute',
            top: 12
        };

        this.customStyles.board = {
            width: this.customStyles.main.width,
            height: this.customStyles.main.height
        };

        this.customStyles.grid = {
            width: this.customStyles.board.width - this.customStyles.size_72,
            height: this.customStyles.board.height - this.customStyles.size_96,
            position: 'absolute',
            bottom: scalable*16
        };

        this.customStyles.errorBox = {
            width: this.customStyles.board.width - this.customStyles.size_72,
            height: this.customStyles.board.height - this.customStyles.size_96,
            position: 'absolute',
            bottom: scalable*16,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    render() {
        return (
            <View style={this.customStyles.main}>

                <FastImage
                    style={this.customStyles.board}
                    source={require('../../../../resources/game/game_board.png')}
                    resizeMode={FastImage.resizeMode.cover}/>

                <FastImage
                    style={this.customStyles.logo}
                    source={require('../../../../resources/game/logo_game.png')}
                    resizeMode={FastImage.resizeMode.contain}/>

                {
                    this.props.status !== GameState.STATE_ERROR &&
                    this.props.status !== GameState.STATE_NOT_ENOUGH_TURN &&
                    this.props.status !== GameState.STATE_TUT &&
                    this.props.status !== GameState.STATE_START &&
                    <GridGameBoard
                        scalable={this.props.scalable}
                        controller={this._onSetController}
                        onStopped={this.props.onGameStopped}
                        giftList={giftList}
                        giftImage={this.props.giftImage}
                        style={this.customStyles.grid}/>
                }

                {
                    this.props.status === GameState.STATE_START &&
                    <GridGameBoardPlaceholder
                        scalable={this.props.scalable}
                        giftList={giftList}
                        style={this.customStyles.grid}/>
                }

                {
                    (
                        this.props.status === GameState.STATE_ERROR ||
                        this.props.status === GameState.STATE_NOT_ENOUGH_TURN
                    ) &&
                    <GridGameBoardError
                        scalable={this.props.scalable}
                        style={this.customStyles.errorBox}
                        errorStatus={this.props.errorStatus}
                        onPressLogin={this.props.onPressLogin}
                        onPressGetMoreTurn={this.props.onPressGetMoreTurn}/>
                }

                {
                    this.props.status !== GameState.STATE_ERROR &&
                    <Text
                        style={{
                            ...SFUFont.regular,
                            fontSize: this.customStyles.size_14,
                            color: 'white',
                            position: 'absolute',
                            bottom: 0,
                            opacity: this.props.status === GameState.STATE_NOT_ENOUGH_TURN ? 0.5 : 1
                        }}>
                        Lắc điện thoại để nhận quà nhé!
                    </Text>
                }

            </View>
        )
    }

    _onSetController = (start, stop, release) => {
        this.gameBoardGridController = {
            start,
            stop,
            release
        }
    }

    _startRunGame = () => {
        if (!this.gameBoardGridController) return;
        this.gameBoardGridController.start();
    }

    _stopRunGame = () => {
        if (!this.gameBoardGridController) return;
        this.gameBoardGridController.stop();
    }

    _releaseGame = () => {
        if (!this.gameBoardGridController) return;
        this.gameBoardGridController.release();
    }

    componentDidMount() {
        super.componentDidMount();

        !!this.props.controller && this.props.controller(this._startRunGame, this._stopRunGame, this._releaseGame);
    }

    componentWillUnmount() {
        this.gameBoardGridController = undefined;
        super.componentWillUnmount();
    }
}

GameBoard.propTypes = {
    scalable: PropTypes.any,
    controller: PropTypes.any,
    status: PropTypes.any,
    giftImage: PropTypes.any,
    onGameStopped: PropTypes.any,
    errorStatus: PropTypes.any,
    onPressLogin: PropTypes.any,
    onPressGetMoreTurn: PropTypes.any
}
