import React from 'react';
import {View, StyleSheet, WebView} from 'react-native';
import {Text} from "native-base";

import ModalComponent from '../../common/view/ModalComponent';
import {BasePureComponent} from "../../common/base/BasePureComponent";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../resources/dimens";
import {AppConfig} from '../../common/config';

export default class PromoCodeDetailDialog extends BasePureComponent {

    render() {

        const {promocode} = this.props.navigation.state.params;

        return (
            <ModalComponent
                title={'Mã giảm thêm'}
                onClosePressed={this._onClosePressed}>

                {
                    !!promocode &&
                    <View style={{flex: 1}}>
                        <Text style={styles.textPromo}
                              numberOfLines={1}>
                            Mã:
                            <Text style={styles.textPromoCodeName}>
                                {' ' + promocode.get('code_name', '') + ' '}
                            </Text>
                            -
                            <Text style={styles.textPromoCodeDescription}>
                                {' ' + promocode.get('description', '')}
                            </Text>
                        </Text>

                        {this._renderErrorIfNeed(promocode)}

                        <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_MEDIUM}}>
                            - -
                        </Text>

                        <WebView
                            source={{ html: promocode.get('condition', '') }}
                            scalesPageToFit={!AppConfig.ios}
                            style={{
                                flex: 1,
                                padding: DIMENSION_PADDING_MEDIUM,
                                marginBottom: DIMENSION_BUTTON_MEDIUM + DIMENSION_PADDING_MEDIUM + DIMENSION_PADDING_SMALL
                            }}
                        />
                    </View>
                }

            </ModalComponent>
        )
    }

    _renderErrorIfNeed = (promoCode) => {
        if (promoCode.get('errors') && promoCode.get('errors', []).size > 0) {
            return (
                <View style={styles.errorLayout}>
                    <Text style={styles.labelWarning}>
                        * Lưu ý:
                    </Text>
                    <Text style={styles.errorMessage}>
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

    _onClosePressed = () => {
        this.props.navigation.dismiss();
    }
}

const styles = StyleSheet.create({
    textPromo: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER,
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM
    },
    textPromoCodeName: {
        color: '#4BC731',
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_HEADER
    },
    textPromoCodeDescription: {
        color: '#EF863B',
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_HEADER
    },
    errorLayout: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    },
    labelWarning: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold'
    },
    errorMessage: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT
    }
});

