import React from 'react';
import {
    Keyboard,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    ActivityIndicator,
    Platform,
    Alert
} from 'react-native';
import PropTypes from 'prop-types'
import DividerLine from '../../common/DividerLine';
import {Text, Container} from 'native-base';
import JJHeader from '../../common/JJHeader';
import CommentItem from './CommentItem';
import {connect} from 'react-redux';
import {fromJS} from 'immutable'
import {
    COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_HINT, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE, COLOR_GRAY_BORDER
} from "../../../resources/colors";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";

import LoadingView from "../../common/LoadingView";
import {commentApi} from '../../../api/comment-api'
import {StringUtil} from '../../../utils/string-util'
import {ObjectUtil} from '../../../utils/object-utils';

import ViewWithKeyboard from '../../../common/view/ViewWithKeyboard';
import {BaseComponent} from "../../../common/base/BaseComponent";
import { from } from 'rxjs';
import JJIcon from '../../common/JJIcon';
import { styles } from './styles';

const ios = Platform.OS === 'ios';
const offset = ios ? 23 : 0;
const ITEM_LIMIT = 10;

class AllComments extends BaseComponent {

    static navigationOptions = {
        header: null,
    }

    parentComment = undefined;
    did = undefined;

    constructor(props, context) {
        super(props, context);
        this.state = {
            isRefreshing: true,
            isLoading: true,
            isError: false,
            isPreparing: true,
            isSendingComment: false,
            comments: undefined,
            text: '',
            title: 'BÌNH LUẬN',
            height: 0,
            totalComment: 0,
            offset: 0,
        };
    }

    render() {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={!!this.parentComment ? 'TRẢ LỜI BÌNH LUẬN' : 'BÌNH LUẬN'}
                />

                {this._renderBodyContentContainer()}

            </Container>
        )
    }

    _renderBodyContentContainer = () => {

        if (this.state.isPreparing) {
            return <LoadingView/>
        }

        if (this.state.isError) {
            return (
                <Text style={{padding: DIMENSION_PADDING_MEDIUM, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                    Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!
                </Text>
            )
        }

        const disableSendButton = this.state.text.trim().length < 1 || !!this.state.isSendingComment;

        return (
            <ViewWithKeyboard
                style={{flex: 1, backgroundColor: 'white'}}>

                {this._renderMainContent()}

                <DividerLine/>

                <View style={styles.ctInputBottom}>

                    <TextInput
                        ref='textInputComment'
                        style={[styles.ctInput, {
                            height: Math.max(40, Math.min(this.state.height, 180)),
                            paddingTop: DIMENSION_PADDING_SMALL + (ios ? 2 : 0),
                        }]}
                        editable={!this.state.isSendingComment}
                        onChangeText={this._onChangeText}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        onContentSizeChange={this._onContentSizeInputChange}
                        placeholder={!!this.parentComment ? 'Viết trả lời của bạn' : 'Viết bình luận của bạn'}
                        placeholderTextColor={COLOR_TEXT_HINT}
                        value={this.state.text}
                    />

                    <TouchableOpacity
                        onPress={this._doSendComment}
                        style={styles.ctSend}
                        disabled={disableSendButton}>
                        <Text style={{
                            color: disableSendButton ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_PRIMARY,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            fontWeight: 'bold'
                        }}>
                            GỬI
                        </Text>
                    </TouchableOpacity>

                </View>

            </ViewWithKeyboard>
        )
    }

    _renderMainContent = () => {
        return (
            <FlatList
                ref={'scrollView'}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
                contentContainerStyle={{justifyContent: 'flex-end'}}
                data={!!this.state.comments ? this.state.comments.toJS() : []}
                keyboardShouldPersistTaps = {'always'}
                inverted={true}
                keyExtractor={(item, index) => `comment_item_${index}_${item.id}`}
                removeClippedSubviews={true}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderNoData}
                ListFooterComponent={this._renderFooter}
                ListHeaderComponent={this._renderHeader}/>
        )
    }

    _renderHeader = () => {
        if (!this.state.isSendingComment) return null;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: DIMENSION_PADDING_SMALL
            }}>
                <ActivityIndicator size={'small'}
                                   color={COLOR_PRIMARY}
                                   animating={true}/>
            </View>
        )
    }

    _renderNoData = () => {
        return (
            <View style={{flex: 1}}>
                <Text style={{
                    color: COLOR_TEXT_INACTIVE,
                    fontSize: DIMENSION_TEXT_CONTENT,
                    padding: DIMENSION_PADDING_MEDIUM
                }}>
                    Hãy là người đầu tiên {!this.parentComment ? '' : 'trả lời'} bình luận!
                </Text>
            </View>
        )
    }

    _onChangeText = (text) => {
        this.setState({
            ...this.state,
            text: text
        })
    }

    _onContentSizeInputChange = (event) => {
        this.setState({
            ...this.state,
            height: event.nativeEvent.contentSize.height + offset
        })
    }

    _refreshData = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            offset: 0
        }, () => {
            this._fetchData(true);
        })
    }

    _loadMore = () => {
        this._fetchData(false);
    }

    _renderItem = ({item}) => {
        return (
            <CommentItem navigation={this.props.navigation}
                         did={this.did}
                         comment={item}
                         showViewReply={true}
                         showReplyButton={!this.parentComment}
                         onCommentAdded={this._onCommentAdded}
                         onCommentDeleted={this._onCommentDeleted}
                         onCommentEdited={this._onCommentEdited}
                         user={this.props.user}
                         isLogged={this.props.isLoginned}/>
        )
    }

    _renderFooter = () => {
        return  (
            <View>
                {this._renderParentComment()}
                {this._renderViewMore()}
            </View>
        )
    }

    _renderParentComment = () => {
        if(!!this.parentComment) {
            return (
                <View style={{backgroundColor: 'white'}}>
                        <CommentItem
                                    comment={this.parentComment}
                                    showReplyButton={true}
                                    onCommentAdded={this._onCommentAdded}
                                    onlyView={true}
                                    showViewReply={false}
                                    onOpenKeyboard={this._onOpenKeyboard}
                        />
                        <DividerLine style={{marginTop: -1}}/>
                    </View>
            )
        }
        return null
    }

    _onOpenKeyboard = () => {
        if (!!this.refs && !!this.refs.textInputComment) {
            this.refs.textInputComment.focus();
        }
    }

    _renderViewMore = () => {
        const {totalComment, comments, isLoading} = this.state;

        if(!comments) return null;
        const size = comments.size;
        if (totalComment > size) {
            if(isLoading) {
                return <Text style={{
                    textAlign: 'center',
                    marginVertical: DIMENSION_PADDING_MEDIUM,
                    color: COLOR_GRAY_BORDER

                }}>Đang tải thêm {this._getTypeComment()}...</Text>
            }
            return (
                <TouchableOpacity
                    onPress={this._loadMore}
                    style={styles.ctViewMore}>
                    <Text style={{
                        color: COLOR_PRIMARY,
                        marginRight: DIMENSION_PADDING_TINY,
                        fontSize: DIMENSION_TEXT_CONTENT
                    }}>
                        Xem thêm {StringUtil.numberFormat(totalComment - size)} {this._getTypeComment()} trước
                    </Text>
                    <JJIcon style={{marginTop: 3}}
                            name={'chevron_up_o'}
                            color={COLOR_PRIMARY}
                            size={8}/>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    _getTypeComment = () => {
        if(!!this.parentComment) return 'trả lời';
        return 'bình luận'
    }

    _doSendComment = () => {
        if (!!this.state.isSendingComment) return;
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'comment_list',
                        action_name: 'click_send_comment',
                    },
                    action: {
                        name: 'click_send_comment',
                        category: 'login'
                    }
                });
            return;
        }
        if (!this.state.text || this.state.text.trim().length < 1) return;
        this.setState({
            ...this.state,
            isSendingComment: true
        }, () => {
            commentApi.sendComment(this.did, !!this.parentComment ? this.parentComment.id : undefined, this.state.text)
                .then(response => {
                    if (!!response.error) {
                        this.setState({
                            ...this.state,
                            isSendingComment: false
                        });
                        return;
                    }
                    const comment = fromJS(response);
                    if (!!this.state.comments) {
                        this.state.comments = this.state.comments.unshift(comment);
                    }
                    else {
                        this.state.comments = fromJS([comment]);
                    }
                    this.setState({
                        ...this.state,
                        isSendingComment: false,
                        text: ''
                    }, () => {
                        Keyboard.dismiss();
                        if (this.refs.scrollView) {
                            this.refs.scrollView.scrollToIndex({animated: true, index: 0});
                        }
                        this._onCommentAdded(response);
                    });
                })
                .catch(error => {
                    this.setState({
                        ...this.state,
                        isSendingComment: false
                    });
                    Keyboard.dismiss();
                    Alert.alert(
                        'Lỗi',
                        'Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!',
                        [
                            {text: "ĐÓNG", style: 'cancel'}
                        ],
                        {cancelable: true}
                    )
                })
        });
    }

    _fetchData = (refresh) => {
        let comments = this.state.comments
        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            let offset = this.state.offset;

            this._fetchCommentTask = from(commentApi.getCommentList(
                !this.parentComment ? this.did : undefined,
                !!this.parentComment ? this.parentComment.id : undefined,
                offset,
                ITEM_LIMIT)
            )
            this._fetchCommentTask.subscribe(
                this._fetchCommentTaskSuccess,
                this._fetchCommentTaskError,
                this._fetchCommentTaskCompleted
            );
            
        })
    }

    _fetchCommentTaskSuccess = (response) => {
        if (!this.mounted) return;
        if(!response) return;

        let resComments = [];
        let comments = this.state.comments;
        if (!!this.parentComment) {
            resComments = response.objects.map((comment, i) => {
                comment.parent_id = !!this.parentComment ? this.parentComment.id : undefined;
                return comment;
            })
        } else {
            resComments = response.objects;
        }
        let offset = this.state.offset + resComments.length
        if(this.state.offset === 0) {
            comments = fromJS(resComments);
        } else {
            comments = comments.push(...fromJS(resComments));
        }
      
        this.setState({
            ...this.state,
            offset,
            isLoading: false,
            isRefreshing: false,
            isError: false,
            totalComment: response.meta && response.meta.total_count,
            comments
        })
    }

    _fetchCommentTaskError = () => {
        if (!this.mounted) return;
        this.setState({
            ...this.state,
            isLoading: false,
            isRefreshing: false,
            isError: true
        })
    };

    _fetchCommentTaskCompleted = () => {
        try {
            if (!this.mounted) return;
            !!this._fetchCommentTask && this._fetchCommentTask.unsubscribe();
        } catch (e) {}
        this._fetchCommentTask = undefined;
    };

    _fetchParentComment = (parentCommentId) => {
        commentApi.getComment(parentCommentId)
            .then(response => {
                this.parentComment = response;
                if (!!this.parentComment) this.state.title = 'TRẢ LỜI BÌNH LUẬN';
                this.setState({
                    ...this.state,
                    isPreparing: false
                }, this._refreshData)
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    isError: true,
                    isPreparing: false
                })
            })
    }

    _onCommentAdded = (comment) => {
        if (!comment.id) return;

        if (!!this.parentComment) {
            comment.parent_id = this.parentComment.id;
        }
        if (this.props.navigation.state.params.onCommentAdded) {
            this.props.navigation.state.params.onCommentAdded(comment);
        }

        const commentIndex = this.state.comments.findIndex((cm, i) => cm.get('id') === comment.id);

        if (commentIndex < 0 && !!comment.parent_id) {
            const indexOfParentComment = this.state.comments.findIndex((cm, i) => cm.get('id') === comment.parent_id);
            if (indexOfParentComment >= 0) {
                this.setState({
                    ...this.state,
                    comments: this.state.comments
                        .update(indexOfParentComment, cm =>
                            cm.updateIn(['replied_comment'], () => fromJS(comment))
                                .updateIn(['replied_comment_count'], () => cm.get('replied_comment_count', 0) + 1))
                });
            }
        }
    }

    _onCommentDeleted = (comment, parent, lastReplyComment) => {
        if (!this.state.comments) return;
        if (!!parent) {
            const indexOfParentComment = this.state.comments.findIndex((cm, i) => cm.get('id') === parent.id);
            if (indexOfParentComment >= 0) {
                if (!!lastReplyComment) {
                    this.setState({
                        ...this.state,
                        comments: this.state.comments
                            .update(indexOfParentComment, cm =>
                                cm.updateIn(['replied_comment'], () => fromJS(lastReplyComment))
                                    .updateIn(['replied_comment_count'], () => cm.get('replied_comment_count', 1) - 1))
                    });
                }
                else {
                    this.setState({
                        ...this.state,
                        comments: this.state.comments
                            .update(indexOfParentComment, cm =>
                                cm.updateIn(['replied_comment'], () => fromJS({}))
                                    .updateIn(['replied_comment_count'], () => 0))
                    }, () => {
                        if (!!this.props.navigation.state.params.onCommentDeleted) {
                            this.props.navigation.state.params.onCommentDeleted(comment, parent, lastReplyComment);
                        }
                    });
                }
            }
            return;
        }

        const indexOfComment = this.state.comments.findIndex((cm, i) => cm.get('id') === comment.id);
        if (indexOfComment >= 0) {
            this.setState({
                ...this.state,
                comments: this.state.comments.delete(indexOfComment)
            }, () => {
                if (!!this.props.navigation.state.params.onCommentDeleted) {
                    this.props.navigation.state.params.onCommentDeleted(
                        comment,
                        this.parentComment,
                        !!this.parentComment && !!this.state.comments.get(0) ? this.state.comments.get(0).toJS() : undefined
                    );
                }
            });
        }
    }

    _onCommentEdited = (comment) => {
        const indexOfComment = this.state.comments.findIndex((cm, i) => cm.get('id') === comment.id);
        if (indexOfComment < 0) return;
        this.setState({
            ...this.state,
            comments: this.state.comments.set(indexOfComment, fromJS(comment))
        });
        if (!!this.props.navigation.state.params.onCommentEdited) this.props.navigation.state.params.onCommentEdited(comment);
    }

    _prepareFromNotification = (nofData) => {
        this.did = nofData.did;
        this._fetchParentComment(nofData.pid);
    }

    _prepareFromDeal = (did, parentComment) => {
        this.did = did;
        this.parentComment = parentComment;
        if (!!this.parentComment) this.state.title = 'TRẢ LỜI BÌNH LUẬN';
        this.setState({
            ...this.state,
            isPreparing: false
        }, this._refreshData);
    }

    _onAction = (action, data) => {
        if (StringUtil.isEmpty(action) || StringUtil.isEmpty(data) || !this.mounted) return;

        if (action === 'open_comment') {
            if (data.did === this.did) {
                this._refreshData();
            }
            else {
                this.props.navigation.push('AllComments', {
                    did: this.did,
                    nofData: data,
                    onCommentEdited: this._onCommentEdited,
                    onCommentDeleted: this._onCommentDeleted,
                    onCommentAdded: this._onCommentAdded
                });
            }
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.state.params.onAction = this._onAction;
        const {did, parentComment, nofData} = this.props.navigation.state.params;
        if (!!nofData) {
            this._prepareFromNotification(nofData);
            return;
        }

        this._prepareFromDeal(did, parentComment);
        if (ObjectUtil.hasValueObject(parentComment)) {
            setTimeout(() => {
                if (!!this.refs && !!this.refs.textInputComment) {
                    this.refs.textInputComment.focus();
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        this._fetchCommentTaskCompleted();
        super.componentWillUnmount();
    }
}

AllComments.propTypes = {
    onCommentAdded: PropTypes.any,
    onCommentDeleted: PropTypes.any,
    onCommentEdited: PropTypes.any,
    onAction: PropTypes.any,
    did: PropTypes.any,
    parentComment: PropTypes.any,
    nofData: PropTypes.any
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,
    };
}

export default connect(mapStateToProps)(AllComments);

