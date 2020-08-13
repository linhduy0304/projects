import React from 'react';
import { Text } from 'native-base';
import { View, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types'
import {List} from 'immutable'

import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE, DEAL_TYPE_NORMAL_DEAL} from '../../../../const';
import JJIcon from '../../../common/JJIcon';
import {COLOR_GRAY_BG, COLOR_ORANGE_MOVIE} from '../../../../resources/colors';
import {
    DIMENSION_BUTTON_SMALL,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_XX,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from '../../../../utils/string-util'
import DealImageItem from './DealImageItem'
import {NativeCommon} from '../../../../common/native/NativeCommon'
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const height = width*0.36;

export default class DealImageSection extends BaseComponent {

    render() {

        if (!!this.props.deal && this.props.deal.get('id')) {

            return (
                <View style={{ backgroundColor: COLOR_GRAY_BG }}>
                    {/* Image Preview*/}
                    {this._renderPreviewImage()}
                    {/* Rate Point */}
                    {this._renderMovieViewIfNeed()}
                    {this._renderRatePointIfNeed()}
                    {this._renderExpiredIfNeed()}
                </View >
            )
        } else {
            return null;
        }
    }

    _renderExpiredIfNeed = () => {
        if (this.props.deal.get('status') === undefined ||
            this.props.deal.get('status') === 1 ||
            (!StringUtil.isBlank(this.props.deal.get('coupon_id')) && !!this.props.deal.get('is_get', false))) return null;

        return (
            <View style={styles.expired}>
                <Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER_XX}} uppercase={true}>
                    Đã hết hạn
                </Text>
            </View>
        )
    }

    _renderRatePointIfNeed = () => {
        const dealType = this.props.deal.get('deal_type', DEAL_TYPE_NORMAL_DEAL);
        if (dealType !== DEAL_TYPE_LAST_MIN && dealType !== DEAL_TYPE_EXCLUSIVE && dealType !== DEAL_TYPE_MOVIE) return null;

        let point = this.props.deal.get('average_rate_value', 0) > 0
            ? this.props.deal.get('average_rate_value', 0).toFixed(1)
            : '__';
        return (
            <TouchableOpacity
                onPress={this._goToRateDetail}
                style={styles.rateInfo}
                activeOpacity={0.8}>
                <JJIcon name={"star_full"} size={16} color='white' />
                <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                    {point}
                    </Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: DIMENSION_TEXT_SUB }}>
                    /5
                </Text>
            </TouchableOpacity>
        )
    }

    _renderMovieViewIfNeed = () => {
        const dealType = this.props.deal.get('deal_type', DEAL_TYPE_NORMAL_DEAL);
        if (dealType !== DEAL_TYPE_MOVIE) return null;

        return (
            <View style={styles.movieOverlayContainer}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    activeOpacity={0.8}
                    onPress={this._playVideo}>
                    <FastImage
                        style={{
                            width: 40,
                            height: 40
                        }}
                        source={require('../../../../resources/icon/compress/ic_play.png')}
                        resizeMode={FastImage.resizeMode.contain}/>
                </TouchableOpacity>

                {
                    !StringUtil.isEmpty(this.props.deal.get('article')) &&
                    <TouchableOpacity
                        onPress={this._gotoArticleDetail}
                        style={styles.articleDetail}
                        activeOpacity={0.8}>
                        <JJIcon name={"info_o"} size={16} color='black' />
                        <Text style={{ color: 'black', fontSize: DIMENSION_TEXT_CONTENT, marginLeft: DIMENSION_PADDING_SMALL }}>
                            Chi tiết
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        )
    }

    _renderPreviewImage = () => {
        // Above 3 images
        if (!List.isList(this.props.deal.get('images'))) return null;

        const images = this.props.deal.get('images', []);
        if (images.size >= 3) {
            return (

                <View style={styles.imagePreviewContainer}>

                    {/* Image 1 */}
                    <DealImageItem
                        onPress={this._goToImageSlider}
                        style={styles.wrapImage1}
                        width={width * 0.75}
                        position={0}
                        url={images.get(0).get('link', '')}/>

                    <View style={{ flex: 1, backgroundColor: 'white' }}>

                        {/* Image 2 */}
                        <DealImageItem
                            onPress={this._goToImageSlider}
                            style={styles.wrapImage2}
                            width={width * 0.25}
                            position={1}
                            url={images.get(1).get('link', '')}/>

                        {/* Image 3 */}

                        <DealImageItem
                            onPress={this._goToImageSlider}
                            style={styles.wrapImage3}
                            width={width * 0.25}
                            position={2}
                            imageCount={images.size > 3 ? images.size : undefined}
                            url={images.get(2).get('link', '')}/>

                    </View>
                </View>
            )
        }

        //2 Images
        if (images.size === 2) {
            return (
                <View style={styles.imagePreviewContainer}>
                    {/* Image 1 */}

                    <DealImageItem
                        onPress={this._goToImageSlider}
                        style={styles.wrapImage1case2}
                        width={width * 0.75}
                        position={0}
                        url={images.get(0).get('link', '')}/>

                    {/* Image 2 */}
                    <DealImageItem
                        onPress={this._goToImageSlider}
                        style={styles.wrapImage2case2}
                        width={width * 0.25}
                        position={1}
                        url={images.get(1).get('link', '')}/>
                </View>
            )
        }

        //1 Images
        if (images.size === 1) {
            return (
                <View style={styles.imagePreviewContainer}>
                    {/* Image 1 */}
                    <DealImageItem
                        onPress={this._goToImageSlider}
                        style={styles.wrapImage1case1}
                        width={width}
                        position={0}
                        url={images.get(0).get('link', '')}/>
                </View>
            )
        }

        return null;
    }

    _playVideo = () => {
        NativeCommon.playVideo(this.props.deal.get('trailer_url', ''));
    }

    _goToRateDetail = () => {
        this.props.navigation.navigate('RateDetail', { deal: this.props.deal.toJS() });
    }

    _goToImageSlider = (position) => {
        if (!ios) {
            return NativeCommon.openImagePreview(this.props.deal.get('images', []).toJS(), position);
        }
        this.props.navigation.navigate("ImageSlider", { images: this.props.deal.get('images', []).toJS(), position: position });
    }

    _gotoArticleDetail = () => {
        const article = this.props.deal.get('article');
        if (StringUtil.isEmpty(article)) return;
        this.props.navigation.navigate('InAppWebView', {title: 'Thông tin chi tiết', url: article});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.deal) return false;
        if (nextProps.deal !== undefined && this.props.deal === undefined) return true;
        if (nextProps.deal.get('images', null) === null) return false;
        if (this.props.deal.get('images', null) === null) return true;
        if (nextProps.deal.get('images').size !== this.props.deal.get('images').size) return true;
        if (nextProps.deal.get('average_rate_value') !== this.props.deal.get('average_rate_value')) return true;
        if (nextProps.deal.get('status') !== this.props.deal.get('status')) return true;
        return false;
    }
}

DealImageSection.propTypes = {
    deal: PropTypes.any,
    navigation: PropTypes.any
}

const styles = StyleSheet.create({
    imagePreviewContainer: {
        flexDirection: 'row',
        height: height,
        backgroundColor: 'white',
    },
    //Rate button
    rateInfo: {
        position: 'absolute',
        height: DIMENSION_BUTTON_SMALL,
        left: DIMENSION_PADDING_MEDIUM,
        bottom: DIMENSION_PADDING_MEDIUM,
        flexDirection: 'row',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: 'rgba(231,57,57,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
    },
    //Case: > 3 images
    wrapImage1: {
        flex: 2,
        backgroundColor: COLOR_GRAY_BG,
        marginRight: 0.5,
    },
    wrapImage2: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BG,
        marginBottom: 0.5,
    },
    wrapImage3: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BG,
    },
    //Case: 2 image
    wrapImage1case2: {
        flex: 0.6,
        backgroundColor: COLOR_GRAY_BG,
        height: '100%',
        marginRight: 0.5,
    },
    wrapImage2case2: {
        flex: 0.4,
        backgroundColor: COLOR_GRAY_BG,
        height: '100%',
    },
    //Case: 1 image
    wrapImage1case1: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BG,
        height: '100%',
    },
    expired: {
        position: 'absolute',
        height: height,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //article detail button
    articleDetail: {
        position: 'absolute',
        height: DIMENSION_BUTTON_SMALL,
        right: DIMENSION_PADDING_MEDIUM,
        bottom: DIMENSION_PADDING_MEDIUM,
        flexDirection: 'row',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: COLOR_ORANGE_MOVIE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
    },
    movieOverlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

