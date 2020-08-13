import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT } from '../../resources/dimens';
import { BasePureComponent } from '../../common/base/BasePureComponent';
import JJIcon from '../../common/view/icon/JJIcon';
import { COLOR_TEXT_INACTIVE, COLOR_TEXT_HINT_2, COLOR_GREEN_1 } from '../../resources/colors';

export default class NoteMenuHeader extends BasePureComponent {
    render() {
        return (
            <View style={{ flexDirection: 'row', padding: DIMENSION_PADDING_MEDIUM }}>
                <JJIcon style={{ marginHorizontal: 8, marginTop: 5 }} name={'edit_o'} size={14} color={!!this.props.note ? COLOR_GREEN_1 : COLOR_TEXT_INACTIVE} />
                <TextInput
                    value={this.props.note}
                    placeholder="Thêm ghi chú..."
                    placeholderTextColor={COLOR_TEXT_HINT_2}
                    underlineColorAndroid="transparent"
                    fontSize={DIMENSION_TEXT_CONTENT}
                    multiline={true}
                    onChangeText={this.props.onChangeNote}
                    style={{
                        flex: 1,
                        padding: 0,
                        maxHeight: 100
                    }}
                />
            </View>
        );
    }

}

NoteMenuHeader.propTypes = {
    note: PropTypes.string,
    onChangeNote: PropTypes.func
};
