import React from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableOpacity, View} from 'react-native'

import {BasePureComponent} from "../../../common/BasePureComponent";
import {SFUFont} from "../../sfu-font-util";
import {ERROR_AUTH_MESSAGE, ERROR_NORMAL} from "../../../../const";

export default class GridGameBoardError extends BasePureComponent {

    render() {
        return (
            <View style={this.props.style}>

                {
                    this.props.errorStatus === 'unknown' &&
                    <Text style={{marginTop: 24*this.props.scalable, color: 'white', fontSize: 14*this.props.scalable, textAlign: 'center', ...SFUFont.regular}}>
                        {ERROR_NORMAL}
                    </Text>
                }

                {
                    this.props.errorStatus === 'auth' &&
                    <Text style={{marginTop: 24*this.props.scalable, color: 'white', fontSize: 14*this.props.scalable, textAlign: 'center', ...SFUFont.regular}}>
                        {ERROR_AUTH_MESSAGE}
                    </Text>
                }

                {
                    this.props.errorStatus === 'turn' &&
                    <Text style={{color: 'white', fontSize: 14, textAlign: 'center', ...SFUFont.regular}}>
                        Bạn đã hết lượt chơi của hôm nay. Chờ tiếp ngày mai để nhận thêm 2 lượt chơi mới hoặc làm theo hướng dẫn trong
                        <Text style={{color: 'white', fontSize: 14, textAlign: 'center', ...SFUFont.demi}}>
                            {` THÊM LƯỢT `}
                        </Text>
                        phía dưới để thêm lượt chơi nhé.
                    </Text>
                }

                {
                    (!!this.props.onPressLogin || !!this.props.onPressGetMoreTurn) &&
                    <TouchableOpacity
                        style={{
                            height: 44*this.props.scalable,
                            backgroundColor: 'white',
                            margin: 12*this.props.scalable,
                            borderRadius: 10*this.props.scalable,
                            alignItems: 'center',
                            paddingLeft: 16*this.props.scalable,
                            paddingRight: 16*this.props.scalable,
                            justifyContent: 'center'
                        }}
                        activeOpacity={0.8}
                        onPress={this.props.errorStatus === 'auth' ? this.props.onPressLogin : this.props.onPressGetMoreTurn}>

                        <Text style={{color: '#E85002', fontSize: 16*this.props.scalable, ...SFUFont.bold}}
                              uppercase={true}>
                            {this.props.errorStatus === 'auth' ? 'ĐĂNG NHẬP' : ''}
                            {this.props.errorStatus === 'turn' ? 'THÊM LƯỢT' : ''}
                        </Text>

                    </TouchableOpacity>
                }

            </View>
        )
    }
}

GridGameBoardError.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    errorStatus: PropTypes.any,
    onPressLogin: PropTypes.any,
    onPressGetMoreTurn: PropTypes.any
}