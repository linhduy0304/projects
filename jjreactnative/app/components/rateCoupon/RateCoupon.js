import {connect} from "react-redux";
import React from "react";
import {View, Animated, StyleSheet, Alert} from 'react-native';
import {Text, Textarea, Button, Container, Content} from "native-base";
import PropTypes from 'prop-types'
import StarRating from 'react-native-star-rating'
import FastImage from 'react-native-fast-image'

import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../resources/colors";
import { rateCoupon } from './action'
import {StringUtil} from '../../utils/string-util'
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

type Props = {
    user?: PropTypes.object,
    coupons?: PropTypes.array,
    isLoggedMerchant?: PropTypes.bool
}

class RateCoupon extends React.PureComponent<Props> {

    scaleAnimate = {
        height: new Animated.Value(),
        visibleView: true,
        contentHeight: 0,
        fade: new Animated.Value(0)
    };

    review = null

    constructor() {
        super();
        this.state = {
            rateValue: 0,
            rateIndex: 0,
        }
    }

    render() {
        let coupon = this._getCouponUnRate()

        return (
            <Container style={{backgroundColor: 'white'}}>
                <Content>
                    <FastImage
                        style={{width: '100%', height: 200}}
                        source={require('../../resources/images/bg_head_rate.png')}
                        resizeMode={FastImage.resizeMode.contain}/>

                    <Text style={{fontWeight: 'bold', fontSize: 14, width: '100%', textAlign: 'center', padding: 8, color: '#454545', marginTop: -48}}>
                        {this.props.user !== undefined && this.props.user !== null ? this.props.user.full_name: null}
                    </Text>

                    {
                        this.scaleAnimate.visibleView &&
                        <Animated.View
                            style={{
                                flexDirection: 'column',
                                height: this.scaleAnimate.height,
                            }}
                            onLayout={this._initScaleView}>

                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(coupon.brand !== undefined && coupon.brand !== null ? coupon.brand.thumb:null, 0, 60))}
                                style={{height: 60, width: undefined}}
                                resizeMode={FastImage.resizeMode.contain}/>

                            <Text style={{fontWeight: 'bold', fontSize: 14, width: '100%', textAlign: 'center', padding: 8, color: '#454545'}}
                                  numberOfLines={2}>
                                {coupon.deal !== undefined && coupon.deal !== null ? coupon.deal.title: null}
                            </Text>
                        </Animated.View>

                    }

                    <Text style={{fontSize: 14, width: '100%', textAlign: 'center', padding: 8, color: COLOR_TEXT_BLACK_1, backgroundColor: 'white'}}>
                        Vui lòng đánh giá dịch vụ
                    </Text>

                    <View style={{alignItems: 'center', backgroundColor: 'white', paddingBottom: 8}}>
                        <StarRating
                            containerStyle={{width: 250, backgroundColor: 'white'}}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.rateValue}
                            selectedStar={(rating) => this._onStarRatingPress(rating)}
                            emptyStarColor={COLOR_PRIMARY}
                            fullStarColor={COLOR_PRIMARY}
                        />
                    </View>

                    {
                        ((!this.scaleAnimate.visibleView && (this.scaleAnimate.height === undefined || this.scaleAnimate.height._value <= 0)) ||
                        (this.scaleAnimate.visibleView && this.scaleAnimate.height !== undefined && this.scaleAnimate.height._value > 0)) &&
                        <Animated.View
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderTopWidth: 0.5,
                                borderColor: '#ededed',
                                flexDirection: 'column',
                                opacity: this.scaleAnimate.fade
                            }}>
                            <Text style={{fontSize: 14, width: '100%', textAlign: 'center', color: '#454545'}}>
                                {this.state.rateValue > 3 ? 'Rất vui vì bạn đã hài lòng khi dùng bữa. Bạn có thêm nhận xét gì không nào?':'Có thêm ý kiến? Hãy giúp chúng tôi hoàn thiện dịch vụ hơn'}
                            </Text>
                            <Textarea style={styles.input}
                                      placeholder={'Bổ sung ý kiến của bạn...'}
                                      onChangeText={(text) => this.review = text}
                                      placeholderTextColor={'#999999'}
                                      rowSpan={5}
                                      textAlignVertical={'top'}
                                      multiline={true}/>

                            <Button style={{backgroundColor: COLOR_PRIMARY, borderRadius: 4, borderColor: COLOR_PRIMARY, marginTop: 16, width: '100%', justifyContent: 'center'}}
                                    onPress={this._onSubmitReview}>

                                <Text style={{fontSize: 14}}>
                                    GỬI
                                </Text>
                            </Button>
                        </Animated.View>
                    }
                </Content>
            </Container>
        )
    }

    _getCouponUnRate = () => {
        if (this.props.coupons === undefined || this.props.coupons === null || this.props.coupons.length < 1) {
            this.props.navigation.goBack()
            return null
        }
        return this.props.coupons[this.state.rateIndex]
    }

    _initScaleView = (evt) => {
        if (this.scaleAnimate.contentHeight>0) return;
        this.scaleAnimate.contentHeight = evt.nativeEvent.layout.height;
        this.scaleAnimate.height.setValue(this.scaleAnimate.visibleView ? this.scaleAnimate.contentHeight : 0 );
    }

    _startScaleAnimate = () => {
        if (!this.scaleAnimate.visibleView) return;
        Animated.sequence([
            Animated.timing(
                this.scaleAnimate.height,
                {
                    toValue: this.scaleAnimate.visibleView ? 0 : this.scaleAnimate.contentHeight,
                    duration: 400,
                }
            ),
            Animated.timing(
                this.scaleAnimate.fade,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            )
        ]).start(() => this.scaleAnimate.visibleView = false);
    }

    _startResetView = () => {
        Animated.sequence([
            Animated.timing(
                this.scaleAnimate.height,
                {
                    toValue: this.scaleAnimate.visibleView ? this.scaleAnimate.contentHeight : 0,
                    duration: 200,
                }
            ),
            Animated.timing(
                this.scaleAnimate.fade,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    _onStarRatingPress = (rating) => {
        this.setState({
            rateValue: rating
        }, () => {
            this._startScaleAnimate()
        });
    }

    _onSubmitReview = () => {
        if (this.state.rateValue <= 0) return;
        if (this.state.rateValue <= 3 && (this.review === undefined || this.review === null || this.review.trim().length < 1)) {
            this._showAlertWarning();
            return
        }
        this._sendRatingToServer()
    }

    _sendRatingToServer = () => {
        const rate = this.props.coupons[this.state.rateIndex];
        if (rate === undefined || rate === null) {
            this.props.navigation.goBack();
            return
        }
        this.props.dispatch(rateCoupon(rate.id, this.state.rateValue, this.review))

        if (this.state.rateIndex + 1 >= this.props.coupons.length) {
            this.props.navigation.goBack();
            return
        }
        this.review = null;
        this.scaleAnimate.visibleView = true;

        this.setState(prev => {
            return {
                rateValue: 0,
                rateIndex: prev.rateIndex + 1,
            }
        }, () => {
            this._startResetView()
        })
    }

    _showAlertWarning = () => {
        let coupon = this._getCouponUnRate();
        const brandName = coupon.brand === undefined ? '':coupon.brand.brand_name;
        Alert.alert(
            'Lưu ý',
            'Nhằm giúp ' +
            brandName +
            ' hoàn thiện hơn chất lượng phục vụ, vui lòng chia sẻ thêm về những điểm bạn chưa hài lòng ở ' +
            brandName +
            ' trước khi tiếp tục!'
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#f5f5f5',
        backgroundColor: '#f5f5f5',
        color: '#454545',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 8
    }
})

const mapStateToProps = (state, props) => {
    return {
        user: state.loginReducer.user,
        coupons: props.navigation.state.params.coupons
    }
};

export default connect(mapStateToProps)(RateCoupon);