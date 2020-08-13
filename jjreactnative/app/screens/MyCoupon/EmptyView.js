
import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { COLOR_PRIMARY } from '../../resources/colors';
import ButtonNonFillNormal from '../../components/common/button/ButtonNonFillNormal';
import {styles} from './styles';
import PropTypes from 'prop-types';

export default class EmptyView extends React.PureComponent {
    render() {
        let { error, onRefresh, onOpenMarketTabSelected } = this.props;
        if (error === undefined || error === null) error = false;

        return (
            <View style={[styles.containerEmpty]}>
                <Text style={styles.text}>{'Nơi xem lại mã khuyến mãi đã lấy;\nCó rất nhiều khuyến mãi dành cho bạn,'}</Text>
                <Text style={styles.text}>
                    {'vui lòng chọn '}
                    <Text style={styles.txtGetCode}>Đặt chỗ</Text>
                    {' hoặc '}
                    <Text style={styles.txtGetCode}>Lấy mã</Text>
                    {' để nhận khuyến mãi.'}
                </Text>
                <ButtonNonFillNormal
                    onPress={error ? onRefresh : onOpenMarketTabSelected}
                    text={error ? 'TẢI LẠI' : 'QUAY LẠI'}
                    color={COLOR_PRIMARY}
                    style={{ width: '100%', marginTop: 16 }}
                />
            </View>
        );
    }
}

EmptyView.propTypes = {
    onRefresh: PropTypes.func,
    onOpenMarketTabSelected: PropTypes.func,
    error: PropTypes.boolean
};
