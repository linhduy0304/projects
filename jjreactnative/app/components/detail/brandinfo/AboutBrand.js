import React, { Component } from 'react';
import { View, WebView, Platform } from 'react-native';
import { Header, Body, Left, Right, Container} from 'native-base';
import ButtonBack from '../../common/ButtonBack';
import HeaderTittle from '../../common/HeaderTittle';
import JJStatusBar from "../../common/view/JJStatusBar";

export default class AboutBrand extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <JJStatusBar/>
                {/* Toolbar */}
                <Header>
                    <Left style={{ flex: 1 }}>
                        <ButtonBack navigation={this.props.navigation} />
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <HeaderTittle>Thương hiệu</HeaderTittle>
                    </Body>
                    <Right style={{ flex: 1 }}>
                    </Right>
                </Header>

                {/* Content */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <WebView
                        source={{ html: this.props.navigation.state.params.brand.brand_long_desc }}
                        scalesPageToFit={Platform.OS !== 'ios'}
                    />
                </View>

            </Container >
        )
    }

}

