import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  InteractionManager,
  Linking,
  Animated,
  StatusBar
} from "react-native";
var windowSize = Dimensions.get('window');
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import GiftedSpinner from "../libs/react-native-gifted-spinner/GiftedSpinner";
import Toast from 'react-native-simple-toast';
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

class PostDetail extends React.Component {
  	constructor(props){
	    super(props);
	    this.state = {
	    	scrollY: new Animated.Value(0),
	    }
	}

	_handerOnScroll(e) {
	    if (e.nativeEvent.contentOffset.y > 0) {
	      	this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
	    }
	 }

    render(){
	    const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 54).interpolate({
	      	inputRange: [0, HEADER_SCROLL_DISTANCE],
	      	outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
	      	extrapolate: 'clamp',
	    });
	    const footerHeight = Animated.diffClamp(this.state.scrollY, 0, 50).interpolate({
		    inputRange: [0, FOOTER_SCROLL_DISTANCE],
		    outputRange: [FOOTER_MAX_HEIGHT, FOOTER_MIN_HEIGHT],
		    extrapolate: 'clamp',
	    });
	    return (
	    	<View style={styles.content}>
		      	<Animated.View style={[main.header, {height: headerHeight}]}>
		            <NavBar style={main} statusBar={{barStyle: 'light-content'}}>
		              	<NavButton onPress={() => this.back()}>
		              	  	<Image style={main.navBack} source={require('../images/icons/ic_back.png')} />
		              	</NavButton>
		              	<NavTitle style={main.navTitle}>
		              	  	{this.props.title}
		              	</NavTitle>
		              	<NavButton onPress={() => this.refs.modalSearch.openModal() } >
		              	  	<Image style={main.navIcon} source={require('../images/icons/ic_search_small.png')}/>
		              	</NavButton>
		            </NavBar>
		        </Animated.View>
		        <Animated.View style={[styles.container, {paddingTop: headerHeight}]}>
		        	<ScrollView style={styles.scrollView} scrollEventThrottle={30} onScroll={ (e) => this._handerOnScroll(e) } bounces={false}>
		        		<View style={styles.contentNews}>
	                        <TouchableOpacity style={styles.category}>
	                          	<Text style={[styles.colorWhite, styles.categoryName]}>Khỏe và đẹp</Text>
	                        </TouchableOpacity>
	                        <TouchableOpacity style={styles.category}>
	                          	<Text style={[styles.colorWhite, styles.categoryName]}>Chăm sóc da</Text>
	                        </TouchableOpacity>
	                    </View>

	                    <View style={styles.boxOptionNews}>
	                      <View style={styles.boxViewLike}>
	                        <Text>{'20 Thích - 33 bình luận'}</Text>
	                      </View>
	                      <View>
	                        <Text>
	                          999 Lượt xem
	                        </Text>
	                      </View>
	                    </View>
	                    <Image source={{ uri: 'https://statics.happyskin.vn/images/posts/82cf584b528cc1320285f19f3610ea86/14-san-pham-duong-da-moi-toanh-vua-len-ke-da-khien-chi-em-me-met-wqkuky_600x400.png'}}
                        style={styles.thumbNews}
                        />
                        <View>
                        	<Text>
                        		Cứ đến khoảng đầu tháng mới là tôi lại có thói quen dạo một vòng khắp các fanpage facebook, instagram, website của các hãng để nghe ngóng xem có sản phẩm nào mới toanh hoặc hay ho để mang ra giới thiệu với các bạn không. Vào dịp giao mùa này, trong khi thị trường ngành làm đẹp liên tục tung ra các bộ sưu tập trang điểm thu đông thì bên phía chăm sóc da lại khá chững lại vì không có quá nhiều gương mặt mới. Thế nhưng, điều tôi nhận ra được là các hãng bên cạnh phát triển những sản phẩm phù hợp với đa dạng nhu cầu thì cũng đã quay lại với những sản phẩm chăm sóc da tưởng chừng cơ bản nhưng lại chuyên sâu như cấp ẩm, phục hồi, tái tạo cho làn da khỏe mạnh. Tôi khá hứng thú với danh sách các hãng và sản phẩm lần này, các bạn cùng tôi lướt nhẹ một vòng để xem trái đất đang quay ra sao nhé (hehe).

Skinceuticals



Skinceuticals luôn nằm trong wishlist của tôi, từ chai serum B5 ngon lành hơn cả Timeless hay The Ordinary đến chai kem chống nắng xuất hiện trong các kiểu “top kem chống nắng” của hầu hết các loại da. Và khi biết hãng ra hai dòng sữa rửa mặt mới, tôi đã vô cùng hào hứng và muốn giới thiệu đến cho các bạn ngay.

Replenishing Cleanser

Skinceuticals Replenishing Cleanser là sản phẩm rửa mặt dành cho da nhạy cảm với công thức giàu amino acid cùng với 15% thành phần cô đặc như ceramides, vitamin B5, Glycerin và tinh dầu giúp làm sạch sâu và duy trì độ ẩm. Chất kem tạo nhiều bọt giúp làm sạch bụi bẩn và cả lớp trang điểm cứng đầu. Thành phần không chứa Paraben, Sulfate, hương liệu và cồn. Sản phẩm thích hợp cho mọi loại da.



Tôi cho rằng sản phẩm này phù hợp với cả da khô lẫn da dầu, bởi khả năng làm sạch tốt những vẫn dịu nhẹ. Bản thân tôi thích những dạng tạo bọt nhưng vẫn để lại làn da mịn màng sau đó lắm, vì da dầu ưu sạch mà. Bạn nào yêu thích chăm sóc da kĩ lưỡng từ ngay bước làm sạch đầu tiên thì hãy thử tìm đến dòng Replenishing Cleanser này nhé.

Giá tham khảo: $34/150ml

Soothing Cleanser Foam

Skinceuticals Soothing Cleanser Foam là sản phẩm làm sạch sâu với công thức tương tự dòng Replenishing Cleanser nhưng tuyệt vời hơn với 22% thành phần cô đặc như sorbitol, glycerin, chiết xuất hoa lan, chiết xuất dưa keo giúp làm sạch tạp chất một cách nhẹ nhàng, đem lại cảm giác êm dịu khi rửa mặt cho cả da nhạy cảm, da tổn thương hoặc sau trị liệu. Soothing Cleanser Foam là sữa rửa mặt không tạo bọt. Sản phẩm được nghiên cứu và cam kết không gây kích ứng (Non-comedogenic), không chứa paraben, sulfate, hương liệu và cồn trong thành phần, phù hợp với mọi loại da, kể cả làn da nhạy cảm nhất.



Nếu bạn chưa tìm được sản phẩm lý tưởng cho làn da cực nhạy cảm của mình thì tôi cho rằng đây là một lựa chọn không hề tệ, bởi không chỉ không chứa chất tạo bọt mà sản phẩm còn được bổ sung nhiều thành phần làm dịu da hoàn hảo.

Giá tham khảo: $34/150ml

Dr. Grand+



Nào phải hãng chăm sóc da thường tình, Dr. Grand+ hãng được nghiên cứu và phát triển bởi bệnh viện thẩm mỹ số 1 Hàn Quốc Grand Plastic Surgery. Sản phẩm cốt lõi của hãng là những sản phẩm mặt nạ chức năng siêu cao cấp nhưng lại vô cùng xứng đáng để đầu tư, mang lại cho bạn đúng cái cảm giác được trải nghiệm những sản phẩm chăm sóc da vô cùng chất lượng tại nhà với mức giá dễ chịu hơn khi đến spa, clinic.

Prestige Cell Mask Anti-Wrinkle

Tuy Prestige Cell Mask Anti-Wrinkle không phải là sản phẩm mới của hãng, nhưng gần đây mới có tiếng tăm ở trong nước, và đặc biệt nhận được nhiều sự khen ngợi ở đa phần các làn da sau tuổi 30.



Điểm nổi bật nhất ở Prestige Cell Mask là khả năng tái sinh làn da: làm mờ nếp nhăn, da đàn hồi, căng mịn, cấp ẩm và chống lại cơ chế gây lão hóa cho da. Nghe thật màu nhiệm, nhưng nếu tra qua thành phần thì có thể thấy điều này có thể tin tưởng được.

– 5% tế bào gốc dạng lỏng chiết xuất từ máu cuống rốn cho khả năng thay thế các tế bào chết, từ đó trẻ hóa các tế bào cũ – tái tạo và xây dựng các tế bào mới. Đồng thời sửa chữa các tế bào bị tổn thương.

– Tái sinh làn da với tổ hợp 37 thành phần giúp tái sinh làn da. Tổ hợp này sẽ mang tới khả năng tăng cường sự tự sinh sôi tế bào của da, từ đó tạo nên một làn da đẹp mịn màng. Dr.Grand chỉ tuyển chọn thật kỹ những thành phần nào có giá trị hữu ích cho làn da thông qua nghiên cứu chọn lọc các nhân tố tăng trưởng với nguồn dinh dưỡng vô tận từ nhau thai.

– Bên cạnh đó còn có rong sụn (carrageenan), rau má giúp cấp ẩm và phục hồi da.

– Không chứa các thành phần khiến bạn đắn đo lo lắng như hương liệu, màu nhân tạo, ethanol, paraben, mineral oil, formaldehyde, benzophenone, petrolatum, TEA, huỳnh quang (fluorescent material).

Sản phẩm này sẽ ưu ái phát huy tác dụng ngay lập tức cho những làn da đã và đang có những dấu hiệu lão hóa, cũng như những ai thích chăm sóc da tại spa và hiểu được những sản phẩm với bảng thành phần quý giá thế này đem đến tác dụng tốt đến thế nào. Tự thưởng cho mình, hoặc tặng cho mẹ, chị gái, cô bạn thân nhân một dịp nào đó xem sao, nhé.

Giá tham khảo: 200.000đ (skinstore.vn đang có chương trình mua 2 tặng 1 cho sản phẩm này)

V-Fixer Remodeling Mask Anti-Wrinkle Cosmetics

Không đón đầu xu hướng multimasking, thế nhưng Dr. Grand+ lại hòa nhập rất tốt với “thời cuộc” khi cho ra mắt dòng Remodeling, cùng một gói có liền hai bước rất tiện dụng và đánh đúng vào nhu cầu mà ai ai chăm sóc da cũng mong mỏi: thải độc se lỗ chân lông và nâng cơ.



Ở Step1: Pore care, lớp mặt nạ than tre ôm vừa khít vào mặt, tinh chất được dịp đi sâu vào da để cung cấp dưỡng chất, cấp ẩm tăng độ đàn hồi cho da, điều tiết bã nhờn, đồng thời thải độc se lỗ chân lông hiệu quả. Khoáng chất ở lớp mặt nạ cùng với tinh chất đẫm trên đó kết hợp ăn ý với nhau, đem lại làn da tươi mới và ổn định hơn.

Đến với Step2: V-Fixer, miếng patch làm từ hydrogel cô đặc bám chặt vào da, đeo được ở tai để tăng khả năng nâng cơ hiệu quả. Chính nhờ tác động cơ học này, cùng với các thành phần hóa học có trong lớp keo cô đặc giúp da tăng cường độ đàn hồi cho phần da mặt quanh vùng xương hàm, giúp cho đường cong khuôn mặt dc tự nhiên, mềm mại và mượt mà, mịn màng.

Mức giá 120.000 cũng không phải thấp trong thị trường mặt nạ, thế nhưng nhìn lại thì tôi cũng thấy hợp lý và tặc lưỡi cho qua: hai trong một cơ mà. Còn chưa kể đến hai tác dụng chính mà sản phẩm này hướng đến là se khít lỗ chân lông và V-line săn gọn cho vùng cằm đều là đích đến của nhiều cô gái trong công cuộc chăm sóc da, trong đó có tôi. Tôi đoán, sản phẩm này tuy không phải kiểu được săn lùng ồ ạt, nhưng về đường dài thì đây sẽ là món mặt nạ gắn bó với quy trình chăm sóc da của nhiều cô nàng.

Giá tham khảo: 120.000đ (skinstore.vn đang có chương trình khuyến mãi cho sản phẩm này)

Beuins



Beuins là hãng nội địa Hàn, vậy nên thật sự không có nhiều thông tin và không đem lại sự kì vọng quá nhiều cho người dùng vào lần đầu trải nghiệm. Thế nhưng sau chuyến đi Hàn, chị Emmi đã vô cùng bất ngờ và yêu thích một số sản phẩm của hãng, không tiếc lời khen về độ “thần thánh” của những sản phẩm này.
                        	</Text>
                        </View>
		        	</ScrollView>
		        </Animated.View>
	        </View>
	    );
	}
}

const HEADER_MAX_HEIGHT = 64;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FOOTER_MAX_HEIGHT = 0;
const FOOTER_MIN_HEIGHT = -50;
const FOOTER_SCROLL_DISTANCE = FOOTER_MAX_HEIGHT - FOOTER_MIN_HEIGHT;
const styles = StyleSheet.create({
  	content: {
    	flex: 1,
  	},
  	container: {
    	flex: 1,
    	justifyContent: "center",
    	alignItems: "center",
    	position: 'relative'
  	},
  	scrollView: {
	    width: windowSize.width,
	    flex: 1,
	    backgroundColor: '#FFFFFF',
	    paddingBottom: 50,
	},
	contentNews: {
	    flex: 1,
	    alignItems: 'flex-start'
	},
	category: {
	    borderRadius: 10,
	    backgroundColor: '#d6216b',
	    paddingLeft: 10,
	    paddingRight: 10,
	    paddingTop: 3,
	    paddingBottom: 3,
	    marginTop: 10,
	    marginBottom: 10,
	    marginLeft: 15,
	},
	categoryName: {
    	fontSize: 14,
  	},
  	colorWhite: {
    	color: 'white'
  	},
  		boxOptionNews: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	paddingTop: 10,
    	paddingBottom: 15,
    	paddingLeft: 15,
    	paddingRight: 15,
  	},
  	boxViewLike: {
    	flexDirection: 'row',
    	alignItems: 'center'
  	},
  	thumbNews: {
    	width: windowSize.width,
    	height: windowSize.width*2/3,
    	marginBottom: 10,
  	},
});
let main = require('../styles/Main');
let theme = require('../services/Theme');
export default PostDetail;