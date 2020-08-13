import React, { Component } from 'react';
import { strings } from '../../../locates/i18n';
import { StyleSheet } from 'react-native';
import { Text, Container, Header, Content, Tab, Tabs, Body, TabHeading } from 'native-base';
import CIcon from '../common/CIcon'
import MaUuDai from '../../screens/MyCoupon/MaUuDai';
import DanhDau from './dealSaved/DanhDau';
import TheoDoi from './brandFollowing/TheoDoi';
import { connect } from 'react-redux';
import HeaderTittle from '../common/HeaderTittle';
import { COLOR_PRIMARY } from '../../resources/colors';

class TabWallet extends Component {

    render() {
        let {onGotoMarketTab} = this.props;
        return (
            <Container>
                <Header style={styles.header} iosBarStyle="light-content">
                    <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <HeaderTittle style={{ color: 'white' }}>
                            {strings('wallet.title_wallet')}
                        </HeaderTittle>
                    </Body>
                </Header>
                <Tabs initialPage={0}
                      style={{ backgroundColor: 'white' }}
                      tabBarUnderlineStyle={{height: 2}}>
                    <Tab heading={<TabHeading><CIcon name={'scissors'} family={'FontAwesome'} style={styles.text}/><Text>{strings('wallet.tab_coupon_code')}</Text></TabHeading>}>
                        <MaUuDai
                            onGotoMarketTab={onGotoMarketTab}
                            navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={<TabHeading><CIcon name={'heart'} family={'FontAwesome'} style={styles.text}/><Text>{strings('wallet.tab_bookmark')}</Text></TabHeading>}>
                        <DanhDau
                            onGotoMarketTab={onGotoMarketTab}
                            navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={<TabHeading><CIcon name={'plus'} family={'FontAwesome'} style={styles.text}/><Text>{strings('wallet.tab_follow')}</Text></TabHeading>}>
                        <TheoDoi
                            navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR_PRIMARY,
    },
    text: {
        fontSize: 14
    }
});

export default connect()(TabWallet);