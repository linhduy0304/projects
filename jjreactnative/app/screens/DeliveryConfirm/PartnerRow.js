import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard } from 'react-native';
import logo from '../../resources/images/logo-ahamove.png';
import { Toast } from '../../components/common/alert/Toast';
import { styles } from './style';
const capitalizeFirstLetter = str => {
    return str[0].toUpperCase() + str.slice(1);
};
export default class PartnerRow extends Component {
    chooseLocation = async () => {
        const { item } = this.props;
        try {
            this.props.onPress(item.address, item.lat, item.long);
        } catch (error) {}
    };

    onPress = () => {
        this.chooseLocation();
        Keyboard.dismiss();
    };

    renderFee = () => {
        const { item } = this.props;

        if (!!this.props.promotionPrice || this.props.promotionPrice === 0) {
            return (
                <React.Fragment>
                    <Text style={styles.textFee}>{item.estimate_fee / 1000}K</Text>
                    <Text style={{ color: '#16254E', fontWeight: 'bold' }}>{this.props.promotionPrice / 1000}K</Text>
                </React.Fragment>
            );
        } else {
            return <Text style={{ color: '#16254E', fontWeight: 'bold' }}>{item.estimate_fee / 1000}K</Text>;
        }
    };

    showDetail = () => {
        const { item } = this.props;

        Toast.showToast(`Đơn mua hộ được thực hiện bởi tài xế ${capitalizeFirstLetter(item.partner_name)}`);
    };

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.partnerContainer} activeOpacity={0.8} onPress={this.showDetail}>
                <View style={styles.ctAha}>
                    <Image style={styles.imageLogo} source={logo} />
                    <Text style={styles.txtAha}>AhaMove</Text>
                </View>

                <View style={styles.fee}>{this.renderFee()}</View>
            </TouchableOpacity>
        );
    }
}
