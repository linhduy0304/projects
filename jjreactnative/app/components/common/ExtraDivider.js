import React from 'react';
import { View } from 'react-native';
import {COLOR_GRAY_BG} from "../../resources/colors";
import {DIMENSION_PADDING_EXTRA} from "../../resources/dimens";

const ExtraDivider = (props) => (
    <View style={{ height: DIMENSION_PADDING_EXTRA, backgroundColor: COLOR_GRAY_BG }} />
)

export default ExtraDivider;