import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import JJIcon from '../../../common/JJIcon'
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../resources/colors";
import {DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../../resources/dimens";
import {StringUtil} from '../../../../utils/string-util';
import {DEAL_TYPE_MOVIE} from "../../../../const";
export default class ArticleSection extends React.PureComponent {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this._renderBestPriceGuarantee()}
                {this._renderGuide()}
                {this._renderArticle()}
            </View>
        )
    }

    _renderBestPriceGuarantee = () => {
        if (this.props.bestpriceguarantee) {
            return (
                <View style={{marginBottom: DIMENSION_PADDING_MEDIUM, width: '100%'}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onBestPriceGuaranteeClicked}>

                        <View style={{width: 64, height: DIMENSION_BUTTON_MEDIUM, justifyContent: 'flex-start'}}>
                            <FastImage
                                style={{flex: 1, height: DIMENSION_BUTTON_MEDIUM, width: DIMENSION_BUTTON_MEDIUM}}
                                source={require('../../../../resources/images/jamja_true_offer.png')}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </View>

                        <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                                Khuyến mãi được JAMJA đảm bảo
                            </Text>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                                GIÁ TỐT NHẤT
                            </Text>
                        </View>

                        <JJIcon size={14}
                                color={COLOR_PRIMARY}
                                name={'chevron_right_o'}
                                style={{position: 'absolute', top: 34, right: 8}}/>

                    </TouchableOpacity>

                </View>
            )
        }
    }

    _renderGuide = () => {
        if (this.props.getredeemcodeinstruction) {
            return (
                <View style={{marginBottom: DIMENSION_PADDING_MEDIUM, width: '100%'}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onGuideClicked}>
                        <View style={{width: 64, height: DIMENSION_BUTTON_MEDIUM, flexDirection: 'row'}}>
                            <JJIcon name={'booking_o'}
                                    color={COLOR_TEXT_INACTIVE}
                                    size={DIMENSION_BUTTON_MEDIUM}/>
                        </View>

                        <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                            <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                                Hướng dẫn
                            </Text>
                            <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                                LẤY MÃ ĐẶT CHỖ & ĐỔI MÃ
                            </Text>
                        </View>

                        <JJIcon size={14}
                                color={COLOR_TEXT_INACTIVE}
                                name={'chevron_right_o'}
                                style={{position: 'absolute', top: 34, right: 8}}/>

                    </TouchableOpacity>
                </View>
            )
        }
    }

    _renderArticle = () => {
        if (this.props.article) {
            return (
                <View style={{marginBottom: DIMENSION_PADDING_MEDIUM, width: '100%'}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this._onArticleClicked}>
                        <View style={{width: 64, height: DIMENSION_BUTTON_MEDIUM, flexDirection: 'row'}}>
                            <JJIcon name={'info_o'}
                                    color={COLOR_TEXT_INACTIVE}
                                    size={DIMENSION_BUTTON_MEDIUM}/>
                        </View>

                        <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                            <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                                {this.props.dealType === DEAL_TYPE_MOVIE ? 'THÔNG TIN PHIM' : 'THÔNG TIN CHI TIẾT'}
                            </Text>
                        </View>

                        <JJIcon size={14}
                                color={COLOR_TEXT_INACTIVE}
                                name={'chevron_right_o'}
                                style={{position: 'absolute', top: 34, right: 8}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _onBestPriceGuaranteeClicked = () => {
        if (!StringUtil.isEmpty(this.props.bestpriceguarantee)) {
            this.props.navigation.push('InAppWebView', {url: this.props.bestpriceguarantee});
        }
    }

    _onArticleClicked = () => {
        if (!StringUtil.isEmpty(this.props.article)) {
                this.props.navigation.push('InAppWebView', {url: this.props.article});
        }
    }

    _onGuideClicked = () => {
        if (!StringUtil.isEmpty(this.props.getredeemcodeinstruction)) {
            this.props.navigation.push('InAppWebView', {url: this.props.getredeemcodeinstruction});
        }
    }
}

ArticleSection.propTypes = {
    navigation: PropTypes.any,
    bestpriceguarantee: PropTypes.string,
    getredeemcodeinstruction: PropTypes.string,
    article: PropTypes.string,
    dealType: PropTypes.any
}

const styles = StyleSheet.create({
    button: {
        height: 80,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        borderColor: 'white',
        padding: 16,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
})