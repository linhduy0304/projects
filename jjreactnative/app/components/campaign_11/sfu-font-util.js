import {Platform} from "react-native";

const ios = Platform.OS === 'ios';

const regular = {
    fontFamily: ios ? 'SFU Eurostile' : 'SFUEurostileRegular',
    fontWeight: ios ? '300' : undefined,
    fontStyle: ios ? 'normal' : undefined
}

const demi = {
    fontFamily: ios ? 'SFU Eurostile' : 'SFUEurostileDemi',
    fontWeight: ios ? '400' : undefined,
    fontStyle: ios ? 'normal' : undefined
}

const bold = {
    fontFamily: ios ? 'SFU Eurostile' : 'SFUEurostile-Bold',
    fontWeight: ios ? 'bold' : undefined,
    fontStyle: ios ? 'normal' : undefined
}

const SFUFont = {
    regular,
    demi,
    bold
};

exports.SFUFont = SFUFont;