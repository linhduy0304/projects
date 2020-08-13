import {
    TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet,
    Clipboard, TextInput, ActivityIndicator, Alert, ActionSheetIOS, Platform,
    Text
} from "react-native";
import Moment from 'moment/min/moment-with-locales';
Moment.locale('vi')
import React from "react";
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image'

import {parsePassiveTime} from "../../../utils/DateUtil";
import DividerLine from "../../common/DividerLine";
import {
    COLOR_GRAY_BG_2, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE
} from "../../../resources/colors";
import {
    DIMENSION_BUTTON_SMALL,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import {BaseComponent} from "../../common/BaseComponent";
import AlertMenuOption from '../../common/alert/alertMenu/AlertMenuOption'
import {commentApi} from '../../../api/comment-api'
import {ObjectUtil} from '../../../utils/object-utils'
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const ios = Platform.OS === 'ios';
const NUMBER_OF_LINE = 4;
const heightText = (ios ? 17.5 : 20 ) * NUMBER_OF_LINE;

export default class CommentItem extends BaseComponent {

    menuOptions = [];
    isSetNumberOfLine= false;
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isSendingComment: false,
            commentContent: '',
            isDeleting: false,
            optionMenuVisibility: false,
            numberOfLines: null
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._toAllComment} onLongPress={this._onItemClicked}>
                <View style={{backgroundColor: !this.props.showReplyButton && !this.props.onlyView ? COLOR_GRAY_BG_2 : 'white'}}>
                    <View
                        style={{
                            padding: DIMENSION_PADDING_MEDIUM,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>

                        <View style={{height: '100%'}}>
                            <FastImage
                                style={{
                                    height: !this.props.showReplyButton && !this.props.onlyView ? 32 : 48,
                                    width: !this.props.showReplyButton && !this.props.onlyView ? 32 : 48,
                                    borderRadius: !this.props.showReplyButton && !this.props.onlyView ? 16 : 24,
                                    marginLeft: !this.props.showReplyButton && !this.props.onlyView ? 16 : 0,
                                }}
                                source={buildImageSource(IMAGE_INTERNET, ObjectUtil.getValue(this.props, '', ['comment', 'user', 'avatar']))}
                                resizeMode={FastImage.resizeMode.cover}/>
                        </View>

                        {
                            !this.state.isEditing &&
                            this._renderCommentContent()
                        }

                        {
                            this.state.isEditing &&
                            this._renderEditComment()
                        }
                    </View>

                    {this._renderReplyIfNeed()}

                    <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                    {
                        !ios && !!this.state.optionMenuVisibility &&
                        <AlertMenuOption options={this.menuOptions}
                                         visible={this.state.optionMenuVisibility}
                                         onItemSelected={this._onAndroidAlertMenuOptionSelected}/>
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _toAllComment = () => {
        if(!!this.props.toAllComment) {
            this.props.toAllComment(); 
        }
        dismissKeyboard()
    }

    _renderCommentContent = () => {
        let createdDate = Moment.utc(this.props.comment.created, 'YYYY-MM-DDTHH:mm:ss');
        let createTime = parsePassiveTime(createdDate);
        return (
            <View style={{flex: 1, marginLeft: DIMENSION_PADDING_MEDIUM}}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_CONTENT,
                    color: COLOR_TEXT_BLACK_1
                }}>
                    {ObjectUtil.getValue(this.props, '', ['comment', 'user', 'full_name'])}
                </Text>
                <View>
                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, marginTop: 1, color: COLOR_TEXT_BLACK_1}}
                        numberOfLines={this.state.numberOfLines}
                        selectable={true}
                        onLayout={(e) => {
                            if(e.nativeEvent.layout.height > heightText && !this.isSetNumberOfLine && this.props.showViewMore) {
                                this.setState({numberOfLines: NUMBER_OF_LINE})
                                this.isSetNumberOfLine = true;
                            }
                          }}
                        >
                        {ObjectUtil.getValue(this.props, '', ['comment', 'content'])}
                    </Text>
                    {
                        this.state.numberOfLines === NUMBER_OF_LINE && this.props.showViewMore &&
                        <View style={{backgroundColor: '#fff', bottom: 0, right: 0, position: 'absolute'}}>
                            <Text onPress={this._onViewMore} style={{color: COLOR_TEXT_INACTIVE}}>... Xem thêm</Text>
                        </View>
                    }
                    
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 4}}>
                    <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB}}>
                        {this.state.isDeleting ? 'Đang xoá bình luận...' : createTime}
                    </Text>
                    {!this.state.isDeleting && this._renderReplyButtonIfNeed()}
                </View>
            </View>
        )
    }

    _onViewMore = () => {
        this.setState({
            numberOfLines: null
        })
    }

    _renderEditComment = () => {
        const isDisableEdit = this.state.commentContent === this.props.comment.content || this.state.commentContent.trim().length < 1 || this.state.isSendingComment;
        return (
            <View style={{flex: 1, marginLeft: DIMENSION_PADDING_MEDIUM}}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_CONTENT,
                    color: COLOR_TEXT_BLACK_1
                }}>
                    {ObjectUtil.getValue(this.props, '', ['comment', 'user', 'full_name'])}
                </Text>
                <TextInput
                    style={{
                        minHeight: 30,
                        maxHeight: 100,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        marginTop: DIMENSION_PADDING_TINY,
                        color: COLOR_TEXT_BLACK_1,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        borderColor: COLOR_LINE,
                        borderWidth: 1,
                        textAlignVertical: "top",
                        padding: DIMENSION_PADDING_SMALL
                    }}
                    editable={!this.state.isSendingComment}
                    onChangeText={this._onCommentTextChanged}
                    underlineColorAndroid='transparent'
                    multiline={true}
                    placeholder='Bình luận của bạn'
                    defaultValue={ObjectUtil.getValue(this.props, '', ['comment', 'content'])}/>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 4, justifyContent: 'flex-end'}}>
                    {
                        !this.state.isSendingComment &&
                        <TouchableOpacity
                            style={[styles.buttonEdit, { borderColor: COLOR_LINE, marginRight: DIMENSION_PADDING_MEDIUM }]}
                            onPress={this._onCancelEditComment}>
                            <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                                Huỷ
                            </Text>
                        </TouchableOpacity>
                    }

                    {
                        this.state.isSendingComment &&
                        <View style={{flexDirection: 'row'}}>
                            <ActivityIndicator animating={true}
                                               size={'small'}
                                               color={COLOR_PRIMARY}/>
                            <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB}}>
                                Đang sửa bình luận...
                            </Text>
                        </View>
                    }

                    <TouchableOpacity
                        style={[styles.buttonEdit, { borderColor: isDisableEdit ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_PRIMARY }]}
                        disabled={isDisableEdit}
                        onPress={this._onSubmitEditComment}>
                        <Text style={{color: isDisableEdit ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onCommentTextChanged = (text) => {
        this.setState({commentContent: text})
    }

    _renderReplyButtonIfNeed = () => {
        if (!this.props.showReplyButton) {
            return null;
        } else {
            return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={"circle"}
                          size={4}
                          color={COLOR_TEXT_INACTIVE}
                          style={{padding: 4}}/>
                    <TouchableOpacity onPress={this._gotoReplyComments}>
                        <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_SUB}}>
                            Trả lời
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _renderReplyIfNeed = () => {
        if (ObjectUtil.getValue(this.props, 0, ['comment', 'replied_comment_count']) > 0 && this.props.showViewReply) {
            return (
                <TouchableOpacity
                    onPress={this._gotoReplyComments}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLOR_GRAY_BG_2,
                        padding: DIMENSION_PADDING_SMALL,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        marginLeft: 24,
                        marginBottom: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                    }}>
                    <FastImage
                        style={{
                            height: 32,
                            width: 32,
                            borderRadius: 16,
                            marginRight: DIMENSION_PADDING_MEDIUM
                        }}
                        source={{uri: ObjectUtil.getValue(this.props, '', ['comment', 'replied_comment', 'user', 'avatar'])}}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_INACTIVE}}>
                        <Text style={{fontWeight: 'bold', color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                            {ObjectUtil.getValue(this.props, '', ['comment', 'replied_comment', 'user', 'full_name']) + ' '}
                        </Text>
                        đã trả lời
                    </Text>
                    <Icon name={"circle"}
                          size={4}
                          color={COLOR_TEXT_INACTIVE}
                          style={{padding: 4}}/>

                    <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                        {ObjectUtil.getValue(this.props, '', ['comment', 'replied_comment_count'])} trả lời
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    _onItemClicked = () => {
        if (!this.state.isEditing && !this.state.isSendingComment && !this.state.isDeleting && !this.props.onlyView) {
            if (ios) {
                this._openIOSActionSheet();
            }
            else {
                this._openAndroidAlertMenu();
            }
        }
    }

    _openIOSActionSheet = () => {
        let isThisUser = this.props.isLogged &&
            this.props.user &&
            this.props.user.id &&
            this.props.comment.user &&
            this.props.user.id === this.props.comment.user.id;

        const options = [];
        if (!!this.props.showReplyButton) {
            options.push('Trả lời')
        }
        if (!!isThisUser) {
            options.push('Sửa')
        }
        options.push('Sao chép')
        if (!!isThisUser) {
            options.push('Xoá')
        }
        options.push('Huỷ')
        ActionSheetIOS.showActionSheetWithOptions({
            options: options,
            destructiveButtonIndex: isThisUser ? options.length - 2 : undefined,
            cancelButtonIndex: options.length - 1
        }, (buttonIndex) => {
            switch (options[buttonIndex]) {
                case 'Trả lời':
                    this._onReplyCommentClicked();
                    break;
                case 'Sửa':
                    this._onEditCommentClicked();
                    break;
                case 'Sao chép':
                    this._onCopyCommentClicked();
                    break;
                case 'Xoá':
                    this._onDeleteCommentClicked();
                    break;
            }
        })
    }

    _openAndroidAlertMenu = () => {
        this.setState({
            ...this.state,
            optionMenuVisibility: true
        })
    }

    _onAndroidAlertMenuOptionSelected = (item) => {
        this.setState({
            ...this.state,
            optionMenuVisibility: false
        });
        if (!item) return;
        switch (item.id) {
            case 'reply':
                this._onReplyCommentClicked();
                break;
            case 'edit':
                this._onEditCommentClicked();
                break;
            case 'copy':
                this._onCopyCommentClicked();
                break;
            case 'delete':
                this._onDeleteCommentClicked();
                break;
        }
    }

    _onEditCommentClicked = () => {
        this.setState({isEditing: true, commentContent: this.props.comment.content})
    }

    _onDeleteCommentClicked = () => {
        this.setState({isDeleting: true});
        commentApi.deleteComment(this.props.comment.id)
            .then(response => {
                if (this.props.onCommentDeleted) this.props.onCommentDeleted(this.props.comment);
            })
            .catch(error => {
                this._showErrorWhenDeleteComment();
            })
    }

    _showErrorWhenDeleteComment = () => {
        Alert.alert(
            'Lỗi',
            'Có lỗi xảy ra trong quá trình xử lý, không thể xoá bình luận, vui lòng thử lại sau!',
            [
                {text: "ĐÓNG", style: 'cancel'}
            ],
            {cancelable: true}
        )
    }

    _onReplyCommentClicked = () => {
        this._gotoReplyComments();
    }

    _onCopyCommentClicked = () => {
        Clipboard.setString(this.props.comment.content);
    }

    _gotoReplyComments = () => {
        if (!this.state.isEditing && !this.state.isSendingComment && !this.state.isDeleting) {
            if(!!this.props.onOpenKeyboard) {
                this.props.onOpenKeyboard()
            } else {
                this.props.navigation.push('AllComments', {
                    did: this.props.did,
                    parentComment: this.props.comment,
                    onCommentAdded: this.props.onCommentAdded,
                    onCommentDeleted: this.props.onCommentDeleted
                });
            }
        }
    }

    _onSubmitEditComment = () => {
        this.setState({isSendingComment: true});
        commentApi.editComment(this.props.comment.id, this.state.commentContent)
            .then(response => {
                response.parent_id = this.props.comment.parent_id;
                this.setState({
                    isEditing: false,
                    isSendingComment: false,
                    editCommentFailure: false,
                    commentContent: ''
                })
                if (this.props.onCommentEdited) this.props.onCommentEdited(response)
            })
            .catch(error => {
                this.setState({
                    isEditing: true,
                    isSendingComment: false,
                });
                Alert.alert(
                    'Lỗi',
                    'Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!',
                    [
                        {text: "ĐÓNG", style: 'cancel'}
                    ],
                    {cancelable: true}
                )
            })
    }

    _onCancelEditComment = () => {
        this.setState({isEditing: false, commentContent: ''})
    }

    _initMenuOption = () => {
        this.menuOptions = [];

        let isThisUser = this.props.isLogged &&
            this.props.user &&
            this.props.user.id &&
            this.props.comment.user &&
            this.props.user.id === this.props.comment.user.id;

        if (!!this.props.showReplyButton) {
            this.menuOptions.push({id: 'reply', title: 'Trả lời'})
        }
        if (!!isThisUser) {
            this.menuOptions.push({id: 'edit', title: 'Sửa'})
        }
        this.menuOptions.push({id: 'copy', title: 'Sao chép'})
        if (!!isThisUser) {
            this.menuOptions.push({id: 'delete', title: 'Xoá'})
        }
        this.menuOptions.push({id: 'cancel', title: 'Huỷ'})
    }

    componentDidMount() {
        super.componentDidMount();

        if (!ios) this._initMenuOption();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.did) return false;
        if (nextProps.did !== undefined && this.props.did === undefined) return true;
        if (!this.props.did) return false;
        if (nextProps.did !== this.props.did) return true;
        if (!nextProps.comment) return false;
        if (nextProps.comment !== undefined && this.props.comment === undefined) return true;
        if (!this.props.comment) return false;
        if (nextProps.comment.id !== this.props.comment.id) return true;
        if (!!nextProps.comment.replied_comment && !!this.props.comment.replied_comment && nextProps.comment.replied_comment.id !== this.props.comment.replied_comment.id) return true;
        if (nextProps.comment.replied_comment_count !== this.props.comment.replied_comment_count) return true;
        if (nextProps.comment.content !== this.props.comment.content) return true;
        if (nextProps.isLogged !== this.props.isLogged) return true;
        if (nextState.optionMenuVisibility !== this.state.optionMenuVisibility) return true;
        if (nextState.commentContent !== this.state.commentContent) return true;
        if (nextState.numberOfLines !== this.state.numberOfLines) return true;
        return false;
    }
}

CommentItem.propTypes = {
    did: PropTypes.string,
    navigation: PropTypes.object,
    comment: PropTypes.object,
    showReplyButton: PropTypes.bool,
    onCommentAdded: PropTypes.func,
    user: PropTypes.object,
    isLogged: PropTypes.bool,
    onCommentDeleted: PropTypes.func,
    onCommentEdited: PropTypes.func,
    onlyView: PropTypes.bool,
    toAllComment: PropTypes.func,
    showViewReply: PropTypes.bool,
    onOpenKeyboard: PropTypes.func,
    showViewMore: PropTypes.bool,
}

const styles = StyleSheet.create({
    buttonEdit: {
        height: DIMENSION_BUTTON_SMALL,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: DIMENSION_RADIUS_MEDIUM
    }
})
