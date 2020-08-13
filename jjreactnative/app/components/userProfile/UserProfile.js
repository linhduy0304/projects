import React from 'react'
import {Container, Text, Content, Input, Footer, Button} from 'native-base';
import {Platform, StyleSheet, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {connect} from "react-redux";
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../resources/colors";
import JJHeader from '../common/JJHeader';
import CIcon from '../common/CIcon';

class UserProfile extends React.PureComponent {

    constructor() {
        super()
    }

    render() {
        console.log('UserProfile', this.props.user)

        let isMale = this.props.user.gender === undefined || this.props.user.gender === null || 'male' === this.props.user.gender;

        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    title={'THÔNG TIN NGƯỜI DÙNG'}
                />
                <Content style={{
                    backgroundColor: COLOR_GRAY_BG
                }}>
                    <Image style={{height: 70, resizeMode: 'contain', borderRadius: 30, marginTop: 16}}
                           source={{uri: this.props.user.avatar}}/>

                    <Text style={{flex: 1, color: '#454545', fontWeight: 'bold', fontSize: 16, padding: 16, marginTop: 16, textAlign: 'center'}}>
                        {this.props.user.full_name === undefined || this.props.user.full_name === null ? "BẠN" : this.props.user.full_name.toUpperCase()}
                    </Text>

                    <View style={[styles.inputBackground, {marginTop: 16, paddingBottom: 8}]}>
                        <Text style={{color: '#454545', fontSize: 14}}>
                            Giới tính:
                        </Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                            <CIcon family={'MaterialCommunityIcons'}
                                   name={isMale ? 'radiobox-marked':'radiobox-blank'}
                                   style={{fontSize: 30, color: isMale ? COLOR_PRIMARY:'#999999'}}/>
                            <Text style={{color: '#454545', fontSize: 14, padding: 2}}>
                                Nam
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                            <CIcon family={'MaterialCommunityIcons'}
                                   name={!isMale ? 'radiobox-marked':'radiobox-blank'}
                                   style={{fontSize: 30, color: !isMale ? COLOR_PRIMARY:'#999999'}}/>
                            <Text style={{color: '#454545', fontSize: 14, padding: 2}}>
                                Nữ
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputBackground}>
                        <Text style={{color: '#454545', fontSize: 14}}>
                            Email:
                        </Text>
                        <Input defaultValue={this.props.user.email}
                               keyboardType={'email-address'}
                               placeholder={'Nhập email'}
                               multiline={false}
                               numberOfLines={1}
                               placeholderTextColor={'#999999'}/>
                    </View>

                    <View style={styles.inputBackground}>
                        <Text style={{color: '#454545', fontSize: 14}}>
                            Số điện thoại:
                        </Text>
                        <Input defaultValue={this.props.user.phone_number}
                               keyboardType={'phone-pad'}
                               placeholder={'Nhập số điện thoại'}
                               multiline={false}
                               numberOfLines={1}
                               placeholderTextColor={'#999999'}/>
                    </View>

                    <View style={styles.inputBackground}>
                        <Text style={{color: '#454545', fontSize: 14}}>
                            Ngày sinh:
                        </Text>
                        <TouchableOpacity style={{width: '100%'}}>
                            <Input style={{width: '100%'}}
                                   placeholder={'Chọn ngày sinh'}
                                   multiline={false}
                                   numberOfLines={1}
                                   placeholderTextColor={'#999999'}
                                   editable={false}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{height: 32}}/>

                </Content>
                <Footer style={{backgroundColor: 'white'}}>
                    <TouchableOpacity style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16, color: COLOR_PRIMARY}}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    inputBackground: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ededed',
    }
})

const mapStateToProps = (state) => {
    return {
        //user
        user: state.loginReducer.user
    }
};

export default connect(mapStateToProps)(UserProfile);