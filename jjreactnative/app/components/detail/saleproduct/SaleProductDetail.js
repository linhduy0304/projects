import React  from 'react';
import { Text } from 'native-base';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'

import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../../resources/colors';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {StringUtil} from "../../../utils/string-util";
import JJStatusBar from "../../common/view/JJStatusBar";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

export default class SaleProductDetail extends React.PureComponent {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <JJStatusBar/>

                <Swiper
                    showsButtons
                    loadMinimal={true}
                    loadMinimalSize={2}
                    renderPagination={renderPagination}
                    index={this.props.navigation.state.params.position}
                    nextButton={<Text style={styles.arrowButton}>›</Text>}
                    prevButton={<Text style={styles.arrowButton}>‹</Text>}>

                    {this.props.navigation.state.params.products.map((product, i) => {
                        return (
                            <View style={{ flex: 1 }} key={product.id}>
                                <FastImage
                                    style={styles.image}
                                    source={buildImageSource(IMAGE_INTERNET, product.images[0].link)}
                                    resizeMode={FastImage.resizeMode.contain}/>

                                <View style={{ position: 'absolute', left: DIMENSION_PADDING_MEDIUM, bottom: DIMENSION_PADDING_MEDIUM }}>
                                    <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }}>
                                        {product.title}
                                    </Text>
                                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                                        {`Giá gốc: ${numberWithCommas(product.original_price)}`}
                                    </Text>
                                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                                        Giá đã giảm:
                                        <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT }}>
                                            {' ' + numberWithCommas(product.original_price)}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )
                    })}

                </Swiper>

                <TouchableOpacity style={styles.closeButton}
                    onPress={this._dismissSliderScreen}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, backgroundColor: 'transparent' }}>
                        Đóng
                    </Text>
                </TouchableOpacity>

            </View >
        )
    }


    _dismissSliderScreen = () => {
        this.props.navigation.goBack();
    }

}

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.pagination}>
            <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                {index + 1}/{total}
            </Text>
        </View>
    )
}

const numberWithCommas = (x) => {
    if (StringUtil.isBlank(x)) return '0đ';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
}

const styles = StyleSheet.create({
    closeButton: {
        padding: 10,
        position: 'absolute',
        top: 20,
        left: 10,
        justifyContent: 'center'
    },
    arrowButton: {
        fontSize: 50,
        color: 'white',
    },
    image: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    pagination: {
        position: 'absolute',
        top: 30,
        alignSelf: 'center',
    },
});


