import React from 'react';
import {Text} from 'native-base';
import {
    View,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    StyleSheet,
    ScrollView,
    WebView
} from 'react-native';

import JJIcon from "../../common/JJIcon";
import {COLOR_ORANGE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import DividerLine from "../../common/DividerLine";
import JJHeader from '../../common/JJHeader'

const headerHeigh = Platform.OS === 'ios' ? 44 : 56;

/**
 * promocode
 * action
 * onActionListener
 */
export default class PromoCodeDetail extends React.PureComponent {

    constructor() {
        super()
    }

    componentDidMount() {
        console.log('PromoCodeDetail:componentDidMount')
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    title={'MÃ GIẢM THÊM'}
                    leftItem={this._renderCloseButton}
                />

                {this._renderContent()}
            </View>
        )
    }

    _renderContent = () => {

        let { promocode, action} = this.props.navigation.state.params;

        if (promocode === undefined || promocode === null) {
            return null
        }

        let actionText = 'OK';
        let buttonBackgroundColor = 'white';
        let buttonBorderColor = COLOR_ORANGE;
        let buttonTextColor = 'white';

        if (action === 'copy') {
            actionText = 'COPY MÃ GIẢM THÊM';
            buttonBorderColor = COLOR_PRIMARY;
            buttonTextColor = COLOR_PRIMARY;
        }
        else if (action === 'active') {
            actionText = 'KÍCH HOẠT';
            buttonBackgroundColor = COLOR_ORANGE;
            buttonBorderColor = COLOR_ORANGE;
        }
        else if (action === 'deactive') {
            actionText = 'BỎ KÍCH HOẠT';
            buttonBorderColor = COLOR_ORANGE;
            buttonTextColor = COLOR_ORANGE;
        }
        else if (action === 'close') {
            actionText = 'OK';
            buttonBorderColor = COLOR_PRIMARY;
            buttonTextColor = COLOR_PRIMARY;
        }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, marginTop: DIMENSION_PADDING_MEDIUM, marginLeft: DIMENSION_PADDING_MEDIUM}}
                      numberOfLines={1}>
                    Mã:
                    <Text style={{color: '#4BC731', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER}}>
                        {' ' + promocode.get('code_name', '') + ' '}
                    </Text>
                    -
                    <Text style={{color: '#EF863B', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER}}>
                        {' ' + promocode.get('description', '')}
                    </Text>
                </Text>

                {this._renderErrorIfNeed(promocode)}

                <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_MEDIUM}}>
                    - -
                </Text>

                <WebView
                    source={{ html: promocode.get('condition', '') }}
                    scalesPageToFit={Platform.OS !== 'ios'}
                    style={{
                        flex: 1,
                        padding: DIMENSION_PADDING_MEDIUM,
                        marginBottom: DIMENSION_BUTTON_MEDIUM + DIMENSION_PADDING_MEDIUM + DIMENSION_PADDING_SMALL
                    }}
                />

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'white',
                    width: '100%'
                }}>
                    <DividerLine/>

                    <TouchableOpacity style={[styles.buttonGetCode, {
                        backgroundColor: buttonBackgroundColor,
                        borderColor: buttonBorderColor
                    }]}
                                      onPress={this._onActionButtonClicked}>
                        <Text style={{
                            color: buttonTextColor,
                            fontSize: DIMENSION_TEXT_HEADER,
                            fontWeight: 'bold'
                        }}>
                            {actionText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderCloseButton = () => {
        return (
            <TouchableOpacity
                style={{
                    height: headerHeigh,
                    width: headerHeigh,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    this.props.navigation.goBack();
                }}>
                <JJIcon
                    style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                    name={'x_o'}
                    color={COLOR_TEXT_BLACK_1}
                    size={16} />
            </TouchableOpacity>
        )
    }

    _renderErrorIfNeed = (promoCode) => {
        if (promoCode.get('errors') && promoCode.get('errors', []).size > 0) {
            return (
                <View style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}>
                    <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                        * Lưu ý:
                    </Text>
                    <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                        {
                            promoCode.get('errors').map((error, i) => {
                                return '- ' + error + '\n'
                            })
                        }
                    </Text>
                </View>
            )
        } 
        return null;
    }

    _onActionButtonClicked = () => {
        let { promocode, action, onActionListener} = this.props.navigation.state.params;

        if (promocode === undefined || promocode === null) return;
        if (onActionListener) onActionListener(promocode, action);
        this._onBackButtonClicked()
    }

    _onBackButtonClicked = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    buttonGetCode: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_TINY,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
