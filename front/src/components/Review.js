import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Input, CardSection, BackButton } from './common';
import { connect } from 'react-redux';

const { axiosReq } = require('../../my_mods');


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
								<Text style={styles.text}>
									{review.rating}
								</Text>
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
							<Input 
								multiline
								numberOfLines={5}
								placeholder='review'
								label='description'
								onChangeText={value => console.log(value)}
								boxHeight={200}
								containerHeight={215}
							/>
							<CardSection>
								<Button>
									Submit
								</Button>	
							</CardSection>	
						</View>	
		}						

		return(
			<View style={{ marginTop: 50 }}>

				{isReview}

				<BackButton />

				{this.state.reviews}
			</View>
		)
	}
}

const styles = {
	text: {
		color: '#fff',
		fontFamily: 'American Captain',
	}
}

const mapStateToProps = ({ spot }) => {
	return {
		id: spot.id
	}
}

export default connect(mapStateToProps)(Reviews);