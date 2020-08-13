import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import HeaderSection from './header/SectionHeader';
import { COLOR_GRAY_BG, COLOR_TEXT_BLACK_1, COLOR_PRIMARY } from '../../resources/colors';
import { DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM } from '../../resources/dimens';
import { BaseComponent } from '../base/BaseComponent';
import { StringUtil } from '../../utils/string-util';
import { NativeCommon } from '../native/NativeCommon';
import { buildImageSource, IMAGE_INTERNET } from '../../utils/image-util';

const screenWidth = Dimensions.get('window').width;
const ios = Platform.OS === 'ios';

export default class MenuSection extends BaseComponent {
    render() {
        if (!this.props.images) return null;
        const imageCount = this.props.images.size;

        return (
            <View style={{ backgroundColor: 'white' }}>
                {/* Title */}
                <HeaderSection
                    title={'Menu áp dụng'}
                    lineStyle={this.props.lineStyle ? this.props.lineStyle : COLOR_PRIMARY}
                    onShowAll={this._goToAllStoreMenu}
                />

                {/* Description */}
                {imageCount > 0 && (
                    <View style={styles.menuContainer}>
                        {this.props.images
                            .filter((image, i) => {
                                return i < 5;
                            })
                            .map((image, i) => {
                                const width = (screenWidth - 16) / 5;
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingRight: DIMENSION_PADDING_MEDIUM,
                                            width: width
                                        }}
                                        key={`menu_st_${i}_${image.get('thumbnail')}`}
                                    >
                                        <TouchableOpacity onPress={() => this._goToImageSlider(i)} style={styles.imageContainer}>
                                            <FastImage
                                                style={styles.image}
                                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(image.get('link', ''), width))}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            {i >= 4 && imageCount > 5 && <Text style={styles.textCount}>+{imageCount - 5}</Text>}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                    </View>
                )}
            </View>
        );
    }

    _goToAllStoreMenu = () => {
        if (this.props.deal.getIn(['stores'], []).size > 0) {
            this.props.navigation.navigate('AllStoreMenu', { deal: this.props.deal });
        }
    };

    _goToImageSlider(position) {
        if (this.props.images.size > 5 && position >= 4) {
            this._goToAllStoreMenu();
            return;
        }
        if (!ios) {
            return NativeCommon.openImagePreview(this.props.images.toJS(), position);
        }
        this.props.navigation.navigate('ImageSlider', {
            images: this.props.images.toJS(),
            position: position
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.images !== undefined && this.props.images === undefined;
    }
}

MenuSection.propTypes = {
    deal: PropTypes.object,
    images: PropTypes.object,
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 5,
        backgroundColor: 'white',
        height: 56,
        flexDirection: 'row',
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM
        // marginLeft: DIMENSION_PADDING_MEDIUM
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 0.1,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    textCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR_TEXT_BLACK_1,
        textAlign: 'center',
        width: '100%',
        padding: 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        position: 'absolute',
        bottom: 0
    }
});
