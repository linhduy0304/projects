import React, { Component } from 'react';
import { View, Image } from 'react-native';
class SizeImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {

            }
        };
    }

    componentWillMount = () => {
		const {size, uri} = this.props
		Image.getSize(uri, (width1, height1) => {
			if(width1 < size && height1 < size) {
				this.setState({
					style: {
						height: height1,
						width: width1
					}
				})
				return
			}
			if(width1 < height1) {
				this.setState({
					style: {
						height: size,
						width: size*width1/height1
					}
				})
				return
			}
			if(width1 > height1) {
				this.setState({
					style: {
						width: size,
						height: size*height1/width1
					}
					
				})
				return
			}
			this.setState({
				style: {
					width: size,
					height: size
				}
			})
		})
	};

    render() {
        const {style} = this.state
        return (
           <Image style={style} source={{uri: this.props.uri}} />
        );
    }
}

export default SizeImage;
