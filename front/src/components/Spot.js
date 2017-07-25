import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection } from './common';

class Spot extends Component {

	render() {
		const { averageRating, totalRatings, city, state, description } = this.props.spot

		return(
			<Card>

				<CardSection>
					<Image source={require('../img/spot-placeholder.png')} />
				</CardSection>

				<CardSection>
					<Text>Location: {city}, {state}{"\n"}rating: {averageRating} ({totalRatings})</Text>
				</CardSection>

				<CardSection>
					<Text> {description} </Text>
				</CardSection>

			</Card>
		)
	}
}

const mapStateToProps = ({ spot }) => {
	return {
		id: spot.id,
		spot: spot.spotDetails
	}
}

export default connect(mapStateToProps)(Spot);