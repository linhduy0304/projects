import { StyleSheet } from 'react-native';
import { Container, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';

import JJHeader from '../../../common/JJHeader';
import RateBrandDetail from './ratebranddetail/RateBrandDetail';
import RateDealDetail from './ratedealdetail/RateDealDetail';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../../resources/dimens";
import {COLOR_GRAY_BG_2, COLOR_LINE, COLOR_TEXT_BLACK_1} from "../../../../resources/colors";

export default class RateDetail extends React.PureComponent {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container style={{backgroundColor: 'white'}}>
                <JJHeader
                    navigation={this.props.navigation}
                    title={'ĐÁNH GIÁ KHUYẾN MÃI'}
                />
                <Tabs initialPage={0}
                      locked={true}
                      style={{backgroundColor: 'white', marginTop: DIMENSION_PADDING_MEDIUM}}
                      tabBarUnderlineStyle={{height: 0, backgroundColor: 'white'}}
                      tabContainerStyle={{elevation: 0, borderColor: 'white'}}>
                    <Tab
                        heading={'Khuyến mãi này'}
                        textStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                        activeTextStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                        tabStyle={[styles.tabBarLeft, {backgroundColor: 'white'}]}
                        activeTabStyle={[styles.tabBarLeft, {backgroundColor: COLOR_GRAY_BG_2}]}
                    >
                        <RateDealDetail
                            deal={this.props.navigation.state.params.deal}
                            navigation={this.props.navigation} />
                    </Tab>
                    <Tab
                        heading={'Đánh giá chung'}
                        textStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                        activeTextStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                        tabStyle={[styles.tabBarRight, {backgroundColor: 'white'}]}
                        activeTabStyle={[styles.tabBarRight, {backgroundColor: COLOR_GRAY_BG_2}]}
                    >
                        <RateBrandDetail
                            deal={this.props.navigation.state.params.deal}
                            navigation={this.props.navigation}
                            />
                    </Tab>
                </Tabs>
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    tabBarLeft: {
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderRightWidth: 0.5,
        height: 38,
        borderTopLeftRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
    },
    tabBarRight: {
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderLeftWidth: 0.5,
        height: 38,
        borderTopRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
    }
})