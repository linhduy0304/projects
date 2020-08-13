import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Container, Header, Body, Left, Right} from 'native-base';
import FastImage from 'react-native-fast-image'

import ButtonBack from '../common/ButtonBack';
import HeaderTittle from '../common/HeaderTittle';
import { version } from '../../../package.json';
import { COLOR_PRIMARY } from '../../resources/colors';

export default class AppVersion extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container>
                {/* Toolbar */}
                <Header>
                    <Left style={{ flex: 1 }}>
                        <ButtonBack navigation={this.props.navigation} />
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <HeaderTittle>Về ứng dụng</HeaderTittle>
                    </Body>
                    <Right style={{ flex: 1 }}>
                    </Right>
                </Header>

                {/* Content */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    {/* Description */}
                    <View style={{
                        position: 'absolute',
                        top: 16,
                        padding: 8,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{ width: 100, height: 100 }}
                            source={require("../../resources/images/logo/jamja_splash_logo.png")} />

                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 16,
                            marginBottom: 16
                        }}>KHÔNG BAO GIỜ BỎ LỠ ƯU ĐÃI</Text>

                        <Text style={{ textAlign: 'center' }}>YAY!!! JAMJA đang kết nối các tín đồ mua sắm và các thương hiệu chặt chẽ hơn bao giờ hết. Bằng cách cập nhật hàng trăm ưu đãi mỗi ngày theo địa điểm, thương hiệu quan tâm, gu thời trang và sở thích ăn uống của bạn cùng khả năng nhắc nhở theo ngữ cảnh, JAMJA giúp bạn không bao giờ bỏ lỡ ưu đãi từ các thương hiệu mà mình yêu thích.</Text>

                    </View>

                    {/* Footer */}
                    <View style={{
                        backgroundColor: COLOR_PRIMARY,
                        height: 50,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: 'white' }}>Phiên bản {version}</Text>
                    </View>
                </View>

            </Container >
        )
    }

}

