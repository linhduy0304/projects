'use strict';

import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import React, {
  Component,

} from 'react';
import PropTypes from 'prop-types'
import Button from 'react-native-button';

class StarRating extends Component {
  constructor(props) {
    super(props);

    // Round rating down to nearest .5 star
    const roundedRating = this.round(this.props.rating);
    this.state = {
      maxStars: this.props.maxStars,
      rating: this.round(this.props.rating)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: this.round(nextProps.rating)
    });
  }

  round(number) {
    return (Math.round(number * 2) / 2);
  }

  pressStarButton(rating) {
    this.props.selectedStar(rating);
    this.setState({
      rating: rating
    });
  }

  render() {
    var starsLeft = this.state.rating;
    const starButtons = [];
    for (var i = 0; i < this.state.maxStars; i++) {
      var starIconName = this.props.emptyStar;
      if (starsLeft >= 1) {
        starIconName = this.props.fullStar;
      } else if (starsLeft === 0.5) {
        starIconName = this.props.halfStar;
      }
      starButtons.push(
        <Button
          activeOpacity={0.20}
          disabled={this.props.disabled}
          key={i + 1}
          onPress={this.pressStarButton.bind(this, i + 1)}
          style={{
            height: this.props.starSize,
            width: this.props.starSize
          }}
          >
          <Image source={starIconName} style={{width: this.props.starSize, height: this.props.starSize, margin: this.props.margin }}/>
        </Button>
      );
      starsLeft--;
    }
    return (
      <View style={styles.starRatingContainer}>
        {starButtons}
      </View>
    );
  }
}

StarRating.propTypes = {
  disabled: PropTypes.bool,
  emptyStar: PropTypes.number.isRequired,
  fullStar: PropTypes.number.isRequired,
  halfStar: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  selectedStar: PropTypes.func.isRequired,
  starSize: PropTypes.number,
  margin: PropTypes.number,
};

StarRating.defaultProps = {
  disabled: false,
  emptyStar: 'star-o',
  fullStar: 'star',
  halfStar: 'star-half-o',
  maxStars: 5,
  rating: 0,
  starSize: 40,
  margin: 0
};

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default StarRating;
