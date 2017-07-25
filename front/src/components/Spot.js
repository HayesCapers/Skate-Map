import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection } from './common';

class Spot extends Component {
	render() {
		console.log(this.props.spot.img)
		return(
			<Card>

				<CardSection>
					<Image source={require('../img/spot-placeholder.png')} />
				</CardSection>

				<CardSection>

				</CardSection>

				<CardSection>
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