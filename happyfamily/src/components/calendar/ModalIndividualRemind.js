
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
var Modal = require('react-native-modalbox');

const window1 = Dimensions.get('window');

const ModalIndividualRemind = ({
    data,
    dataSelected,
    isOpen,
    close,
    onPress = item
}) => (
        <Modal
            style={[css.ctModal]}
            isOpen={isOpen}
            position="bottom"
            swipeToClose={true}
            backdropColor="#292c34"
            onClosed={close}
        >
            <View style={[css.ctModal]}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => onPress({item})} style={css.ctItem} key={index}>
                                <Text>{item.full_name}</Text>
                                {
                                    dataSelected.indexOf(item) !== -1 ?
                                    <Image source={require('../../images/icons/ic_checked.png')} />
                                    : null
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </Modal>
    )

const css = StyleSheet.create({
    ctItem: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between'
    },
    ctModal: {
        height: window.height,
        backgroundColor: '#fff',
        width: window1.width,
    },
})

export default ModalIndividualRemind;
