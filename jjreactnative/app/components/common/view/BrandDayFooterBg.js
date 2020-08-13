import React from 'react'
import {Svg, Path} from "react-native-svg";
import PropTypes from 'prop-types'
import {BasePureComponent} from "../BasePureComponent";

export default class BrandDayFooterBg extends BasePureComponent {

    render() {
        const height = (this.props.width / 375)*16;
        return (
            <Svg
                height={height}
                width={this.props.width}
                style={{
                    width: '100%'
                }}>
                <Path d="M0,0c0,8.8 83.9,16 187.5,16S375,8.8 375,0H0z" fill="red"/>
            </Svg>
        )
    }
}

BrandDayFooterBg.propTypes = {
    color: PropTypes.any,
    width: PropTypes.any
}