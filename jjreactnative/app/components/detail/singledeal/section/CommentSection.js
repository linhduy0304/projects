import {Text} from 'native-base';
import {View, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {
    COLOR_GRAY_BG,
    COLOR_GRAY_BG_2,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE
} from '../../../../resources/colors';
import CommentItem from '../../comment/CommentItem';
import HeaderSection from '../../../common/HeaderSection';
import JJIcon from '../../../common/JJIcon';
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from '../../../../utils/string-util'

export default class CommentSection extends BaseComponent {

    render() {
        const count = this.props.comment ? this.props.comment.getIn(['meta','total_count'], 0) : 0;
        return (
            <View style={{backgroundColor: 'white'}}>

                {/* Header */}
                <HeaderSection
                    customTitle={() => {
                        return (
                            <Text style={{fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER, color: COLOR_TEXT_BLACK_1}}>
                                Bình luận{' '}
                                <Text style={{color: COLOR_TEXT_INACTIVE}}>
                                    ({StringUtil.numberFormat(count)})
                                </Text>
                            </Text>
                        )
                    }}
                    showAllText={count === 0 ? 'Hãy là người đầu tiên' : ''}
                    onShowAll={count === 0 ? this._gotoAllComments : undefined}
                />
                {/* List comments */}
                <View>
                    {
                        this.props.comment &&
                        this.props.comment.get('objects').filter((cm, i) => i < 3)
                            .map((comment, i) => {
                            return (
                                <CommentItem
                                    key={'comment_' + comment.get('id', '')}
                                    comment={comment.toJS()}
                                    navigation={this.props.navigation}
                                    did={this.props.deal.get('id', '')}
                                    showReplyButton={false}
                                    showViewReply={true}
                                    onlyView={true}
                                    onCommentAdded={this._onCommentAdded}
                                    onCommentDeleted={this._onCommentDeleted}
                                    onCommentEdited={this._onCommentEdited}
                                    toAllComment={this._gotoAllComments}
                                    showViewMore={true}
                                />
                            )
                        })
                    }

                </View>

                {this._renderViewMoreCommentIfNeed()}

                {this._renderLetsCommentIfNeed()}

                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _renderViewMoreCommentIfNeed = () => {
        const count = this.props.comment ? this.props.comment.getIn(['meta','total_count'], 0) : 0;
        if (count > 3) {
            return (
                <TouchableOpacity
                    onPress={this._gotoAllComments}
                    style={{
                        flexDirection: 'row',
                        backgroundColor: COLOR_GRAY_BG_2,
                        padding: DIMENSION_PADDING_MEDIUM,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -1.5,
                        marginBottom: -1.5
                    }}>
                    <Text style={{
                        color: COLOR_PRIMARY,
                        marginRight: DIMENSION_PADDING_TINY,
                        fontSize: DIMENSION_TEXT_CONTENT
                    }}>
                        Xem thêm {StringUtil.numberFormat(count - 3)} bình luận trước
                    </Text>
                    <JJIcon style={{marginTop: 3}}
                            name={'chevron_right_o'}
                            color={COLOR_PRIMARY}
                            size={8}/>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    _renderLetsCommentIfNeed = () =>  {
        if (this.props.comment && this.props.comment.getIn(['meta','total_count'], 0) > 0) {
            return (
                <View>

                    <TouchableOpacity
                        onPress={this._gotoAllComments}
                        style={{
                            margin: DIMENSION_PADDING_MEDIUM,
                            backgroundColor: '#4bc731',
                            borderColor: '#4bc731',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            borderWidth: 1,
                            height: DIMENSION_BUTTON_MEDIUM,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: 'white', fontWeight: 'bold'}}
                              uppercase={true}>
                            Chia sẻ suy nghĩ của bạn
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    _gotoAllComments = () => {
        this.props.navigation.navigate('AllComments',
            {
                did: this.props.deal.get('id'),
                onCommentAdded: this._onCommentAdded,
                onCommentDeleted: this._onCommentDeleted,
                onCommentEdited: this._onCommentEdited,
            });
    }

    _onCommentAdded = (comment) => {
        this.props.listener.onCommentAdded(comment);
    }

    _onCommentDeleted = (comment, parent, lastReplyComment) => {
        this.props.listener.onCommentDeleted(comment, parent, lastReplyComment);
    }

    _onCommentEdited = (comment) => {
        this.props.listener.onCommentEdited(comment);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal !== undefined && this.props.deal === undefined ||
            nextProps.comment !== undefined && this.props.comment === undefined ||
            (nextProps.comment !== undefined && !nextProps.comment.equals(this.props.comment));
    }
}

CommentSection.propTypes = {
    deal: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    listener: PropTypes.object,
    comment: PropTypes.object
}


