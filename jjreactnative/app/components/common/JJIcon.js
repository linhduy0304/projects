import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import SvgUri from '../common/svgUri/index'
import PropTypes from 'prop-types'

import icomoonConfig from '../../../assets/selection.json';
import {BasePureComponent} from "./BasePureComponent";
import {StringUtil} from '../../utils/string-util'
import {COLOR_TEXT_BLACK_1} from "../../resources/colors";

const Icon = createIconSetFromIcoMoon(icomoonConfig);

export default class JJIcon extends BasePureComponent {

    render() {
        if (StringUtil.isEmpty(this.props.uri) && StringUtil.isEmpty(this.props.name)) return null;

        const color = !!this.props.color ? this.props.color : COLOR_TEXT_BLACK_1;

        if (!StringUtil.isEmpty(this.props.uri)) {
            const size = !!this.props.size ?  this.props.size : 24;
            return (
                <SvgUri
                    width={size}
                    height={size}
                    source={{uri: this.props.uri}}
                    fill={color}
                />
            )
        }

        if (!StringUtil.isEmpty(this.props.name)) {
            return (
                <Icon
                    style={this.props.style !== undefined ? this.props.style : {}}
                    name={this.props.name}
                    color={color}
                    size={this.props.size} />
            )
        }

        return null;
    }
}

JJIcon.propTypes = {
    style: PropTypes.any,
    uri: PropTypes.any,
    size: PropTypes.any,
    color: PropTypes.any,
    name: PropTypes.any
}
