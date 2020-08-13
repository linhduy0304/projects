import { connect } from 'react-redux';
import { Text, Container } from 'native-base';
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import React from 'react';

import {
    COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE, COLOR_GRAY_BG_2
} from '../../../resources/colors';
import JJHeader from '../../common/JJHeader';
import JJIcon from '../../common/JJIcon';

import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER, DIMENSION_TEXT_HEADER_X
} from "../../../resources/dimens";
import LoadingViewPopup from "../../../common/view/loading/LoadingViewPopup";
import {HOTLINE} from "../../../const";
import {commonApi} from '../../../api/common-api'
import {BasePureComponent} from "../../common/BasePureComponent";

class ReportDeal extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSuccess: false,
            isFail: false,
            data: [],
            errorSelected: undefined,
            text: '',
            isSending: false
        }
    }

    render() {
        console.log('ReportDeal__render Send button', this.state)
        return (
            <Container>
                {/* Toolbar */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'BÁO SAI THÔNG TIN'}
                    leftItem={this.renderLeftButton}
                />
                {/* Content View */}

                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    style={{ flex: 1, backgroundColor: 'white' }}>
                    {this._renderMainContent()}
                </KeyboardAvoidingView>

                {
                    !!this.state.errorSelected &&
                    <View style={styles.useCodeBackground}>
                        <TouchableOpacity style={styles.useCodeButton} onPress={this._sendReport}>
                            <Text style={{color: '#ffffff', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}
                                  uppercase={true}>
                                GỬI
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                <LoadingViewPopup visible={this.state.isSending}/>
            </Container >
        )
    }
    
    renderLeftButton = () => {
        return (
            <TouchableOpacity
                onPress={this._onCancelReport}
                style={{
                    flex: 1,
                    width: 80,
                    justifyContent: 'center',
                    paddingLeft: 16,
                }}>
                <JJIcon name={'x_o'} size={DIMENSION_TEXT_HEADER_X} color={COLOR_TEXT_INACTIVE} />
            </TouchableOpacity>
        )
    }

    _onCancelReport = () => {
        this.props.navigation.goBack();
    }

    _renderMainContent = () => {

        if (this.state.isLoading) {
            return this._renderProgress();
        } else {
            if (this.state.isSuccess) {
                if (this.state.data.length > 0) {
                    return (
                        <View style={{flex: 1}}>
                            <Text style={{ padding: DIMENSION_PADDING_MEDIUM, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT }}>
                                Bạn nhận thấy thông tin nào của chương trình khuyến mãi này chưa chính xác?
                            </Text>
                            {this._renderData()}
                        </View>
                    )
                } else {
                    return this._renderNoData();
                }
            } else {
                return null;
            }
        }
    }

    _renderData = () => {
        if (this.state.errorSelected === undefined) {
            return (
                <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                    {
                        this.state.data.map((error, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            errorSelected: error
                                        })
                                    }}
                                    key={`error_item_${error.id}`}
                                    style={{
                                        paddingTop: DIMENSION_PADDING_MEDIUM,
                                        paddingBottom: DIMENSION_PADDING_MEDIUM,
                                        marginLeft: DIMENSION_PADDING_MEDIUM,
                                        marginRight: DIMENSION_PADDING_MEDIUM,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomWidth: i < this.state.data.length - 1 ? 1 : 0,
                                        borderBottomColor: COLOR_LINE
                                    }}>
                                    <JJIcon style={{ marginRight: DIMENSION_PADDING_SMALL}}
                                            name={'circle_o'}
                                            size={14}
                                            color={COLOR_TEXT_INACTIVE} />
                                    <Text style={{
                                        color: COLOR_TEXT_INACTIVE,
                                        fontSize: DIMENSION_TEXT_CONTENT
                                    }}>
                                        {error.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            )
        } else {
            return (
                <ScrollView style={{flex: 1}}>
                    <View style={{
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        paddingTop: DIMENSION_PADDING_MEDIUM,
                        paddingBottom: DIMENSION_PADDING_SMALL,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLOR_LINE}}>

                        <JJIcon style={{ marginRight: DIMENSION_PADDING_SMALL}}
                                name={'circle_radio_o'}
                                size={14}
                                color={COLOR_TEXT_BLACK_1} />

                        <Text style={{
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT
                        }}>
                            {this.state.errorSelected.title}
                        </Text>
                    </View>

                    <Text style={{
                        fontWeight: 'bold',
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginTop: DIMENSION_PADDING_MEDIUM,
                        color: COLOR_TEXT_BLACK_1,
                        fontSize: DIMENSION_TEXT_HEADER
                    }}>
                        THÔNG TIN THÊM
                    </Text>

                    <TextInput
                        style={{
                            backgroundColor: COLOR_GRAY_BG_2,
                            textAlignVertical: "top",
                            minHeight: 70,
                            maxHeight: 160,
                            borderColor: 'white',
                            borderWidth: 1,
                            padding:DIMENSION_PADDING_MEDIUM,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            margin: DIMENSION_PADDING_MEDIUM,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            color: COLOR_TEXT_BLACK_1
                        }}
                        onChangeText={this._onTextChange}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        placeholderTextColor={'#dadada'}
                        placeholder='Mô tả kỹ hơn lỗi/thông tin sai mà bạn gặp phải'
                        value={this.state.text}
                    />

                </ScrollView>
            )
        }

    }

    _renderProgress = () => {
        return (
            <View style={styles.containerProgress}>
                <ActivityIndicator
                    style={styles.progress}
                    color={COLOR_PRIMARY}
                    animating={true}
                    size={'small'} />
            </View>
        )
    }

    _renderNoData = () => {
        return (
            <View style={styles.containerProgress}>
                <Text style={styles.nodata}>
                    Không có dữ liệu. Vui lòng thử lại sau!
                </Text>
            </View >
        )
    }

    _onTextChange = (text) => {
        this.setState({
            ...this.state,
            text: text,
        })
    }

    _showAlertSuccess = () => {
        let message = 'Cám ơn ';
        if (this.props.user && this.props.user.full_name) {
            message += this.props.user.full_name;
        } else {
            message += 'Bạn';
        }
        message += ', JAMJA đã ghi nhận đóng góp của bạn và sẽ cập nhật thông tin phù hợp trong thời gian sớm nhất!\n\nHotline liên hệ: ' + HOTLINE;

        Alert.alert(
            'THÀNH CÔNG',
            message,
            [
                { text: "ĐÓNG", onPress: () => { this.props.navigation.goBack(); } }
            ],
            {cancelable: false}
            )
    }

    _sendReport = () => {
        if (this.state.errorSelected !== undefined && !this.state.isSending) {
            if(this.state.errorSelected.id === '999'){
                if(this.state.text.trim() === ''){
                    Alert.alert(
                        'Lưu ý',
                        'Nhằm giúp hoàn thiện hơn chất lượng phục vụ, vui lòng mô tả kỹ hơn lỗi/thông tin sai mà bạn gặp phải'
                    );
                    return;
                }    
            }
            Keyboard.dismiss();
            this.setState({
                isSending: true
            }, () => {
                commonApi.reportDeal(
                    this.props.navigation.state.params.deal.slug,
                    this.state.errorSelected.id,
                    this.state.text)
                    .then(response => {
                        console.log('_sendReport:response', response);
                        this.setState({
                            isSending: false
                        }, () => {
                            this._showAlertSuccess();
                        });
                    })
                    .catch(error => {
                        console.log('_sendReport:error', error)
                        this.setState({
                            isSending: false
                        }, () => {
                            this._showAlertSuccess();
                        });
                    })
            });
        }
    }

    _fetchErrorsReport = () => {
        commonApi.getErrorReportList()
            .then(result => {
                console.log('_fetchErrorsReport:success', result)
                this.setState({
                    isFail: false,
                    isLoading: false,
                    isSuccess: true,
                    data: result,
                })
            })
            .catch(error => {
                console.log('_fetchErrorsReport:error', error)
                this.setState({
                    isFail: true,
                    isLoading: false,
                    isSuccess: false,
                    data: [],
                })
            })
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchErrorsReport();
    }
}

const styles = StyleSheet.create({
    containerProgress: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progress: {
        alignSelf: 'center',
        position: 'absolute',
    },
    nodata: {
        padding: DIMENSION_PADDING_MEDIUM,
        alignSelf: 'center',
        position: 'absolute',
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_INACTIVE
    },
    useCodeBackground: {
        paddingTop: DIMENSION_PADDING_TINY,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ededed'
    },
    useCodeButton: {
        width: '100%',
        backgroundColor: COLOR_PRIMARY,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,
    }
};

export default connect(mapStateToProps)(ReportDeal);

