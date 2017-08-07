import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Input, CardSection, BackButton } from './common';
import Stars from './common/Stars';
import { connect } from 'react-redux';
import { reviewInputUpdate, submitReview } from '../actions/ReviewActions';

const { axiosReq } = require('../../my_mods');
const { height, width } = Dimensions.get('window')


class Reviews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			inputExpanded: false
		}
	}

	componentDidMount() {
		console.log(this.props.id)
		const url = 'http://localhost:3000/reviews'

		axiosReq('post',url,{ locationID: this.props.id })
			.then(data => {
				const reviewArray = [];

				data.data.reviews.map((review, index) => {
					var rating = Math.round(review.rating)
					console.log(rating)
					reviewArray.push(
						<CardSection key={index}>
							<View style={{ flex: 1 }}>
								<Image
									source={require('../assets/images/user-placeholder.png')}
									style={{ height: 50, width: 50 }}
								/>
								<Text style={styles.text}>
									{review.userName}
								</Text>
								<Stars initCount={rating} disabled={true} />
							</View>
							
							<View style={{ flex: 1 }}>
								<Text style={styles.text}>
									{review.review}
								</Text>
							</View>
						</CardSection>
					)
				})
				this.setState({
					reviews: reviewArray
				})
			})
	}

	toggleReviewInput() {
		this.setState({
			inputExpanded: true
		})
	}

	onSubmit() {
		const data = {
			locationID: this.props.id,
			rating: this.props.userRating,
			review: this.props.reviewText,
			token: this.props.token,
			userName: this.props.userName
		}
		console.log(data)

		this.props.submitReview(data);
	}

	render() {

		var isReview = <View>
							<CardSection>
								<Button onPress={this.toggleReviewInput.bind(this)}>
									Write Review
								</Button>
							</CardSection>	
						</View>	
		
		if (this.state.inputExpanded) {
			isReview = <View>
							<View style={styles.stars}>
								<Stars initCount={0} disabled={false} />
							</View>	
							<Input 
								multiline
								numberOfLines={5}
								placeholder='review'
								label='description'
								value={this.props.reviewText}
								onChangeText={value => this.props.reviewInputUpdate({ prop: 'reviewText', value })}
								boxHeight={200}
								containerHeight={215}
							/>
							<CardSection>
								<Button onPress={this.onSubmit.bind(this)}>
									Submit
								</Button>	
							</CardSection>	
						</View>	
		}						

		return(
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ marginTop: 75 }}>

					{isReview}

					<BackButton top={-100}/>

					{this.state.reviews}
				</View>
			</TouchableWithoutFeedback>	
		)
	}
}

const styles = {
	text: {
		color: '#fff',
		fontFamily: 'American Captain',
	},
	stars: {
		marginLeft: 50
	}
}

const mapStateToProps = ({ spot, review, auth }) => {
	return {
		id: spot.id,
		userRating: review.stars,
		reviewText: review.reviewText,
		token: auth.user.token,
		userName: auth.user.userName
	}
}

export default connect(mapStateToProps, { reviewInputUpdate, submitReview })(Reviews);








