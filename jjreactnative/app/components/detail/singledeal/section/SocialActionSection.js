import React from 'react';
import { Text } from 'native-base';
import {View, StyleSheet, Easing, Dimensions} from 'react-native';
import PropTypes from 'prop-types'
import Popover from 'react-native-popover-view'
import moment from 'moment/min/moment-with-locales';
import {connect} from "react-redux";

import {
    COLOR_GREEN,
    COLOR_ORANGE,
    COLOR_PRIMARY,
    COLOR_TEXT_INACTIVE
} from '../../../../resources/colors';
import { ConfigDb } from '../../../../api/storage/ConfigDb';
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import DealShortInfoSection from './DealShortInfoSection'
import DealSocialActionButton from './DealSocialActionButton'
import MovieTitleView from './MovieTitleView'
import {DEAL_TYPE_MOVIE} from "../../../../const";
import NoticeSection from '../../../../common/view/notice/NoticeSection';

moment.locale('vi');

const { width } = Dimensions.get('window');

class SocialActionSection extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowSaveDealPopover: false,
        }
    }

    render() {
        if (!this.props.dealSlug) return null;

        return (
            <View>
                <View style={{ backgroundColor: 'white' }}>

                    {/* Header */}
                    <DealShortInfoSection dealSlug={this.props.dealSlug}
                                          storeCount={this.props.storeCount}
                                          onlineStore={this.props.onlineStore}
                                          endValidTime={this.props.endValidTime}
                                          productCount={this.props.productCount}
                                          dealType={this.props.dealType}
                                          onOpenApplyStoreClicked={this.props.onOpenApplyStore}
                                          onOpenProductListClicked={this.props.onOpenProductListClicked}/>

                    {
                        this.props.dealType === DEAL_TYPE_MOVIE &&
                        <MovieTitleView
                            title={this.props.title}
                            genre={this.props.genre}
                            imdb={this.props.imdb}
                            run_time={this.props.run_time}
                            rating={this.props.rating}/>
                    }

                    {/* Action */}
                    <View style={styles.wrapSocialAction}>

                        <DealSocialActionButton icon={'thumbs_up_o'}
                                                count={this.props.upVoteCount}
                                                label={'Thích'}
                                                color={this.props.isVoteUp ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE}
                                                onPress={this._onLikeClicked}/>

                        <DealSocialActionButton icon={'thumbs_down_o'}
                                                count={this.props.downVoteCount}
                                                label={'Không thích'}
                                                color={this.props.isVoteDown ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE}
                                                onPress={this.props.onDisLikeClicked}/>

                        <DealSocialActionButton ref={this._onButtonSaveRef}
                                                icon={'bookmark_o'}
                                                count={this.props.saveCount}
                                                label={'Đánh dấu'}
                                                color={this.props.isSaved ? COLOR_GREEN : COLOR_TEXT_INACTIVE}
                                                onPress={this.props.onSaveClicked}/>

                        <DealSocialActionButton icon={'been_here_o'}
                                                count={this.props.checkInCount}
                                                label={'Đã đến'}
                                                color={!!this.props.checkedIn ? COLOR_ORANGE : COLOR_TEXT_INACTIVE}
                                                onPress={this.props.onCheckinClicked}/>

                        <DealSocialActionButton icon={'message_square_o'}
                                                count={this.props.commentCount}
                                                label={'Bình luận'}
                                                color={COLOR_TEXT_INACTIVE}
                                                onPress={this.props.onCommentClicked}/>
                    </View>

                    <Popover
                        popoverStyle={{ backgroundColor: '#3399ff', maxWidth: width }}
                        isVisible={this.state.isShowSaveDealPopover}
                        placement={'top'}
                        fromView={this.saveButtonRef}
                        showBackground={false}
                        animationConfig={{ duration: 100, easing: Easing.ease }}
                        onClose={this._onCloseRemainTimePopover}>

                        <Text style={{
                            padding: DIMENSION_PADDING_MEDIUM,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            color: 'white',
                            fontSize: DIMENSION_TEXT_CONTENT,
                            maxWidth: width}}>
                            {`Bạn thích khuyến mãi này? \nHãy lưu để JAMJA nhắc bạn khỏi quên!`}
                        </Text>
                    </Popover>

                </View>
                {
                    !!this.props.alert_deal_detail &&
                    <NoticeSection
                        icon={this.props.alert_icon}
                        message={this.props.alert_deal_detail}
                        tooltip={this.props.alert_deal_detail_tooltip}/>
                }
            </View>
        )
    }

    _onButtonSaveRef = (ref) => this.saveButtonRef = ref;

    _onCloseRemainTimePopover = () => this.setState({ isShowSaveDealPopover: false });

    _onOpenRemainTimePopover = () => {
        if (!this.props.isLoginned) return;
        if (!ConfigDb.hasVisibleSaveDealPopover()) {
            this.setState({ isShowSaveDealPopover: true }, ConfigDb.saveDealPopoverVisible);
        }
    }

    _onLikeClicked = () => {
        this._onOpenRemainTimePopover();
        this.props.onLikeClicked();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dealSlug !== this.props.dealSlug) return true;
        if (nextProps.upVoteCount !== this.props.upVoteCount) return true;
        if (nextProps.downVoteCount !== this.props.downVoteCount) return true;
        if (nextProps.isVoteUp !== this.props.isVoteUp) return true;
        if (nextProps.isVoteDown !== this.props.isVoteDown) return true;
        if (nextProps.saveCount !== this.props.saveCount) return true;
        if (nextProps.isSaved !== this.props.isSaved) return true;
        if (nextProps.checkedIn !== this.props.checkedIn) return true;
        if (nextProps.checkInCount !== this.props.checkInCount) return true;
        if (nextProps.commentCount !== this.props.commentCount) return true;
        if (nextState.isShowSaveDealPopover !== this.state.isShowSaveDealPopover) return true;

        return false;
    }
}

SocialActionSection.propTypes = {
    dealSlug: PropTypes.any,
    storeCount: PropTypes.any,
    onlineStore: PropTypes.any,
    productCount: PropTypes.any,
    endValidTime: PropTypes.any,

    dealType: PropTypes.any,
    title: PropTypes.any,
    run_time: PropTypes.any,
    genre: PropTypes.any,
    imdb: PropTypes.any,
    rating: PropTypes.any,

    upVoteCount: PropTypes.any,
    downVoteCount: PropTypes.any,
    isVoteUp: PropTypes.any,
    isVoteDown: PropTypes.any,
    saveCount: PropTypes.any,
    isSaved: PropTypes.any,
    checkedIn: PropTypes.any,
    checkInCount: PropTypes.any,
    commentCount: PropTypes.any,

    alert_deal_detail: PropTypes.string,
    alert_icon: PropTypes.string,
    use_delivery: PropTypes.bool,
    alert_deal_detail_tooltip: PropTypes.string,

    onOpenApplyStore: PropTypes.any,
    onOpenProductListClicked: PropTypes.any,
    onLikeClicked: PropTypes.any,
    onDisLikeClicked: PropTypes.any,
    onCheckinClicked: PropTypes.any,
    onCommentClicked: PropTypes.any,
    onSaveClicked: PropTypes.any
}

const styles = StyleSheet.create({
    wrapSocialAction: {
        backgroundColor: 'white',
        paddingTop: 2,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
    };
}

export default connect(mapStateToProps)(SocialActionSection);

