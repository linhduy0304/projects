

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';

const window = Dimensions.get('window');

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import DatePicker from 'react-native-datepicker';
import Autocomplete from 'react-native-autocomplete-input';
import css from '../../Css';
import { Actions } from 'react-native-router-flux'
import Spinner from "react-native-spinkit";
var Modal = require('react-native-modalbox');
import PageTypeEvent from '../../components/calendar/PageTypeEvent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as individual from '../../actions/individual';
import * as profile from '../../actions/profile';
const actions = [
    individual,
    profile
];

function mapStateToProps(state) {
    return {
        individual: state.individual,
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

class AddIndividual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            birthday: '',
            sex: 1,
            relationship_2_role_code: '',
            user_id: '',
            value: '',
            hideResults: true,
            modalTypeEvent: false,
        }
    }

    componentWillMount() {
        var { id, code } = this.props;
        if (id) {
            this.props.actions.editIndividual(id);
        } else {
            this.setState({
                relationship_2_role_code: code,
                sex: this.setSex(code),
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.individual.itemEditing && nextProps.individual.itemEditing !== this.props.individual.itemEditing) {
            this.setState({
                full_name: nextProps.individual.itemEditing.full_name,
                birthday: nextProps.individual.itemEditing.birthday,
            })
        }

    }

    setSex(code) {
        switch (code) {
            case 1:
            case 3:
            case 5:
            case 6:
            case 9:
            case 10:
            case 13:
            case 15:
                sex = 0;
                break;
            case 2:
            case 4:
            case 7:
            case 8:
            case 11:
            case 12:
            case 14:
            case 16:
                sex = 1;
                break;
            default:
                sex = -1;
                break;
        }
        return sex;
    }

    onChange(field, value) {
        this.setState({
            [field]: value,
        });
    }

    dateNow() {
        var date = new Date();
        var now = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        return now;
    }

    convertDate(date) {
        if (date != '') {
            var d = new Date(date);
            // update date state
            this.setState({
                birthday: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
            })
            return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        } else {
            return null;
        }
    }

    submit() {
        var { id } = this.props;
        var { full_name, birthday, sex, relationship_2_role_code, value, user_id } = this.state;
        this.setState({ error: '' });
        var body = {
            full_name,
            birthday,
            sex,
            relationship_2_role_code,
            value,
            user_id
        };
        if(id) {
            this.props.actions.updateIndividual(id, body);
        } else {
            this.props.actions.addIndividual(body);
        }
    }

    autoSuggessUsers(value) {
        var { sex } = this.state;
        this.setState({
            value: value,
            hideResults: value === '' ? true : false
        });
        this.props.actions.autoSuggessUsers(value, sex);
    }

    onSelectUser(data) {
        this.setState({
            user_id: data.id,
            value: data.full_name ? data.full_name : data.username,
            full_name: data.full_name ? data.full_name : data.username,
            // sex: data.sex ? data.sex : '',
            birthday: data.birthday ? data.birthday : '',
            hideResults: true,
        });
    }

    render() {
        var { id } = this.props;
        var { dataSearch } = this.props.profile;
        var { value, hideResults } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D' }}></View>
                <NavBar style={{ navBar: css.navBar, statusBar: css.statusBar }} statusBar={{ barStyle: 'light-content', backgroundColor: '#C6247D' }} >
                    <NavButton />
                    <NavTitle style={css.navTitle}>
                        <Text style={css.txtTitle}>{ id ? 'Sửa thành viên' : 'Thêm thành viên' }</Text>
                    </NavTitle>
                    <NavButton />
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ position: 'absolute', left: 0, padding: 15 }}>
                        <Image source={require('../../images/icons/ic_back.png')} />
                    </TouchableOpacity>
                </NavBar>
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0} style={{ flex: 1 }} >
                    <ScrollView style={styles.content}
                        keyboardShouldPersistTaps='always'>
                        <ImageBackground style={styles.imgAvatar} source={require('../../images/avatar.png')}>
                            <Image style={styles.icCamera} source={require('../../images/icons/ic_camera_avatar.png')} />
                        </ImageBackground>
                        <View style={styles.boxInfo}>
                            <Text style={styles.txtInfo}>{id ? 'Cập nhật thành viên'.toUpperCase() : 'Thông tin thành viên mới'.toUpperCase()}</Text>
                            { !id &&
                            <View style={[styles.containerEdt, {zIndex: 999}]}>
                                <Image style={styles.iconName} source={require('../../images/icons/ic_name.png')} />
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    hideResults={hideResults}
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    listContainerStyle={this.listContainerStyle}
                                    listStyle={this.listStyle}
                                    data={dataSearch}
                                    value={value}
                                    onChangeText={value => this.autoSuggessUsers(value)}
                                    placeholder="Nhập tài khoản cẩn tìm."
                                    renderItem={data => (
                                        <TouchableOpacity onPress={() => this.onSelectUser(data)} style={styles.btnSelect}>
                                            <Image style={styles.avatar} source={{uri: data.avatar+'_100x100.png'}} />
                                            <Text style={styles.itemText}>
                                                {data.full_name ? data.full_name : data.username}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            }
                            <View style={styles.containerEdt}>
                                <Image style={styles.iconName} source={require('../../images/icons/ic_name.png')} />
                                <TextInput
                                    style={styles.txtInput}
                                    placeholder="Họ tên"
                                    placeholderTextColor='#919191'
                                    underlineColorAndroid="transparent"
                                    value={this.state.full_name}
                                    onChangeText={(full_name) => this.onChange('full_name', full_name)}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.containerEdt}>
                                <Image style={styles.iconName} source={require('../../images/icons/ic_name.png')} />
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.birthday}
                                    mode="date"
                                    placeholder="Chọn ngày sinh"
                                    format="DD-MM-YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    minDate="01-01-1900"
                                    maxDate={this.dateNow()}
                                    onDateChange={(birthday) => this.onChange('birthday', birthday)}
                                    showIcon={false}
                                    customStyles={{ dateInput: { borderWidth: 0, alignItems: 'flex-start' } }}
                                />
                            </View>
                            {
                                id &&
                                <Text onPress={() => this.setState({modalTypeEvent: true})} style={styles.txtForgot}>Thêm dấu mốc</Text>
                            }
                            <View style={styles.buttonSubmit}>
                                <TouchableOpacity style={styles.btnSubmit} onPress={() => !this.props.individual.loading ? this.submit() : null} >
                                    {
                                        !this.props.individual.loading ?
                                            <Text style={styles.txtBtnSubmit}>Cập nhật</Text>
                                            :
                                            <ActivityIndicator animating={true} color='#FFFFFF' />
                                    }

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    {
                        this.props.individual.loadingItemEditing ? 
                        <View style={css.mainSpin}>
                        <Spinner isFullScreen={true} isVisible={true} size={50} type={'Circle'} color={'#FFFFFF'}/>
                        </View> : null
                    }
                </KeyboardAvoidingView>
                <Modal 
                    isOpen={this.state.modalTypeEvent}
                    swipeToClose={false}
                    position="bottom"
                    entry="bottom"
                    animationDuration={300}
                    // backdropColor="red"
                    onClosed={()=> this.setState({modalTypeEvent: false}) }
                    >
                        <PageTypeEvent date = {this.state.date} lunar= {this.state.lunar} lunarValue= {this.state.lunarValue} close={() => this.setState({modalTypeEvent: false})} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgAvatar: {
        width: window.width,
        height: 200,
        justifyContent: 'flex-end'
    },
    icCamera: {
        marginLeft: 15,
        marginBottom: 15,
    },
    content: {
        flex: 1
    },
    txtInfo: {
        paddingTop: 30
    },
    boxInfo: {
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    containerEdt: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 3,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    iconName: {
        marginLeft: 15,
        marginRight: 15
    },
    txtInput: {
        color: '#000',
        width: window.width * 3 / 4,
    },
    viewCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonSubmit: {
        paddingBottom: 50
    },
    btnSubmit: {
        backgroundColor: 'rgb(38, 114, 203)',
        marginTop: 40,
        height: 45,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    txtBtnSubmit: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },
    containerStyle: {
        width: window.width -75,
        height: 50,
        borderWidth: 0,
        borderRadius: 0,
    },
    inputContainerStyle: {
        borderWidth: 0,
        marginTop: 5,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    btnSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15
    },
    txtForgot: {
        color: 'rgb(48, 88, 154)',
        fontSize: 16,
        marginTop: 16,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddIndividual);