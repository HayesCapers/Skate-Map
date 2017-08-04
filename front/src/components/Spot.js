import React, { Component } from 'react';
import { Image, Text, View, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection, BackButton } from './common';

class Spot extends Component {

	render() {

		const { height, width } = Dimensions.get('window')
		console.log(this.props.spot)
		const { averageRating, totalRatings, city, state, description, locationName } = this.props.spot

		return(
			<ScrollView>

				<View style={{ ...styles.header, ...{ width } }}>
					<Text style={styles.headerText}>{locationName}</Text>
				</View>

				<BackButton />

				<CardSection>
					<Image 
						style={{ height: 300, width: 300 }}
						source={{ uri : 'https://s3.amazonaws.com/s3-skatespot/images/phoneham.jpg' }} 
					/>
				</CardSection>

				<CardSection>
					<Text style={{ color: '#fff' }}>Location: {city}, {state}{"\n"}rating: {averageRating} ({totalRatings})</Text>
				</CardSection>

				<CardSection>
					<Text style={{ color: '#fff' }}> {description} </Text>
				</CardSection>

			</ScrollView>	
		)
	}
}

const styles = {
	header: {
		marginTop: 50,
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
	},
	headerText: {
		fontFamily: 'American Captain',
		fontSize: 60
	}
}

const mapStateToProps = ({ spot }) => {
	return {
		id: spot.id,
		spot: spot.spotDetails
	}
}

export default connect(mapStateToProps)(Spot);