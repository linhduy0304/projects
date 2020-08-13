import React, { Component, PureComponent } from 'react';
import { 
    View, 
    Text,
    Image,
    ScrollView,
    WebView
} from 'react-native';
import NavMore from '../../components/product/NavMore';
import HTMLView from 'react-native-render-html';

class ProductDetailMore extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }

	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<NavMore title={this.props.title} />
					<View style={{flex: 1, padding: 20}}>
						<HTMLView
							html={this.props.data}
							tagsStyles={{
								p : {
									marginBottom: 0,
									marginTop: 5
								}
							}}
						/>
						{/* <WebView
							evalReturn={((r) => {eval(r)}).bind(this)}
							automaticallyAdjustContentInsets={false}
							scalesPageToFit={true}
							source={{ html: this.props.data,baseUrl: ''}}
							dataDetectorTypes="none"
						/>			 */}
					</View>
			</View>
		);
	}
}

export default ProductDetailMore;
