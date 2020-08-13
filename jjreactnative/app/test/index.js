import React from 'react';
import {View, Button, Text} from 'react-native';
import {fromJS} from 'immutable';

import CardView from '../common/view/card/CardView';
import ButtonFilled from '../common/view/button/ButtonFilled';
import {COLOR_PRIMARY} from "../resources/colors";
import {DIMENSION_BUTTON_SM} from "../resources/dimens";
import FlashSaleCountDownHeader from '../components/detail/singledeal/section/flashSale/FlashSaleCountDownHeader';
import {AppContainer} from '../router/index';
import NavigationService from '../router/NavigationService';

import Alert from '../common/view/alert/Alert';

export default class TestComponent extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            alert: fromJS({})
        }
    }


    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fafafa',
                    marginTop: 100
                }}>

                <Button
                    title={'Test'}
                    onPress={this._onOpenModalPressed}/>

                {
                    !!this.state.alert.get('message') &&
                    <Alert
                        title={this.state.alert.get('title')}
                        message={this.state.alert.get('message')}
                        buttons={this.state.alert.get('buttons')}/>
                }

            </View>
        )
    }

    _onOpenModalPressed = () => {
        // console.debug('_onOpenModalPressed: ', AppContainer.router, Object.keys(AppContainer.router), NavigationService.getNavigator());

        this.setState({
            alert: this.state.alert.updateIn(['title'], () => 'Day la title')
                .updateIn(['message'], () => 'Day la message')
                .updateIn(['buttons'], () => fromJS([
                    {
                        title: 'OK',
                        onPress: () => {

                        }
                    },
                    {
                        title: 'Cancel'
                    }
                ]))
        })
    }

}