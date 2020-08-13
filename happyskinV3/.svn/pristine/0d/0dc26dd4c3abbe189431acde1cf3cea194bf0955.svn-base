import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxHotDebate from '../components/BoxHotDebate';
import BoxNews from '../components/BoxNews';
import BoxNewsThumb from '../components/BoxNewsThumb';
import BoxProduct from '../components/BoxProduct';
import BoxNewsThumbLeft from '../components/BoxNewsThumbLeft';
import BoxNewsAnnounce from '../components/BoxNewsAnnounce';
import BoxProductReview from '../components/BoxProductReview';
import BoxVideo from '../components/BoxVideo';
import BoxSponsorPost from '../components/BoxSponsorPost';
import BoxLookOfTheDay from '../components/BoxLookOfTheDay';
import BoxFeedComment from '../components/BoxFeedComment';

class BookFeedCommunity extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  renderFeed() {
    if(!this.props.feed){
      return null;
    }
    switch(this.props.feed.type){
      case 'hotdebate': 
        return <BoxHotDebate post={this.props.feed}/>
      case 'post':
        return <BoxNewsThumb post={this.props.feed} listView={this.props.listView} />;
      case 'sponsor': 
        return <BoxSponsorPost post={this.props.feed} listView={this.props.listView} />;
      case 'product':
        return <BoxProduct product={this.props.feed} listView={this.props.listView} />;
      case 'video':
        return <BoxVideo video={this.props.feed} listView={this.props.listView} />;
      case 'comment':
        return <BoxFeedComment post={this.props.feed} listView={this.props.listView} />;
      case 'groupfeed':
        switch(this.props.feed.feedtype){
          case 'g_review':
            return <BoxProductReview product={this.props.feed} currentUser={this.props.currentUser} listView={this.props.listView} />;
          case 'g_question':
            return <BoxNews feed={this.props.feed} currentUser={this.props.currentUser} listView={this.props.listView} />;
          case 'g_tips':
            return <BoxNewsThumbLeft feed={this.props.feed} currentUser={this.props.currentUser} listView={this.props.listView} />;
          case 'g_announce':
            return <BoxNewsAnnounce feed={this.props.feed} currentUser={this.props.currentUser} listView={this.props.listView} />;
          case 'g_image':
            return <BoxLookOfTheDay feed={this.props.feed} currentUser={this.props.currentUser} listView={this.props.listView} />;
        }
    }
  }

  render(){
    return (
      <View style={styles.boxNews}>
        <ScrollView>
         { this.renderFeed() }
         </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNews: {
    backgroundColor: '#FFFFFF'
  }
});
module.exports = BookFeedCommunity;
