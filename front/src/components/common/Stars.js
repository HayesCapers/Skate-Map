import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import { updateStars } from '../../actions/ReviewActions';
import { connect } from 'react-redux';
import { View } from 'react-native';

class Stars extends Component {

	constructor(props) {
		super(props);
		this.state = {
			starCount: this.props.initCount
		};
	}

	onStarRatingPress(rating) {
		this.setState({
			starCount: rating
		});
	}

	render() {

		if (this.props.disabled) {
			return (
				<View style={{ width: 50 }}>
				<StarRating
					disabled
					starColor={'white'}
					maxStars={5}
					rating={this.props.initCount}
					starSize={20}
					starStyle={{ padding: 5 }}
				/>
				</View>
			);
		}

		return (
			<View style={{ width: 100 }}>
			<StarRating
				disabled={this.props.disabled}
				maxStars={5}
				rating={this.props.stars}
				selectedStar={(rating) => this.props.updateStars(rating)}
				starSize={20}
				starStyle={{ padding: 10 }}
			/>
			</View>
		);
	}
}

const mapStateToProps = ({ review }) => {
	return {
		stars: review.stars
	}
}

export default connect(mapStateToProps, { updateStars })(Stars);