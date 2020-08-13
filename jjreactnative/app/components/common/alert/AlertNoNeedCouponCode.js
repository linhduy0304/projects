import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, Text } from 'react-native';
import DividerLine from '../DividerLine';
import { COLOR_PRIMARY } from '../../../resources/colors';

const AlertNoNeedCouponCode = (props) => (
    <Modal
        onRequestClose={props.onDismiss}
        transparent={true}
        animationType={'fade'}
        visible={props.isShowing}>
        <View style={styles.modalBackground}>
            <View style={{ backgroundColor: 'white' }}>
                <Text style={{ color: 'gray', fontSize: 12, marginTop: 8, alignSelf: 'center' }}>Khuyến mãi tổng hợp</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 8, alignSelf: 'center' }}>KHÔNG CẦN MÃ</Text>
                <DividerLine />
                <Text style={{ margin: 8, textAlign: 'justify' }}>{`Chương trình khuyến mãi ${props.deal.highlight} này của ${props.deal.brand.brand_name !== undefined ? props.deal.brand.brand_name : props.deal.brand.name} được JAMJA tổng hợp thông tin về giúp bạn, không phải là chương trình hợp tác với JAMJA.\n\nXem chi tiết tại mục "Điều kiện áp dụng"`}</Text>
                <TouchableOpacity
                    onPress={props.onDismiss}
                    style={{ height: 50, backgroundColor: COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0)'
    }
});

export default AlertNoNeedCouponCode;