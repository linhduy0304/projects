import {StyleSheet} from 'react-native';
import {COLOR_LINE} from "../../../resources/colors";

export const styles = StyleSheet.create({
    bottomLineListItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 1
    },
    dash: {
        height: 0.8,
        backgroundColor: '#ebebeb'
    },
    solidLine: {
        backgroundColor: COLOR_LINE,
        height: 0.8
    }
})