import React, { Component } from 'react';
import { Image, Text, View, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { Button, Card, CardSection, BackButton } from './common';
import Stars from './common/Stars';

class Spot extends Component {

	constructor(props) {
		super(props);
		this.state = {
			starCount: 0
		}
	}

	render() {
		console.log(`https://s3.amazonaws.com/s3-skatespot/images/${this.props.id}.jpg`)

		const { height, width } = Dimensions.get('window')
		const { averageRating, totalRatings, city, state, description, locationName } = this.props.spot
		const avgRating = Math.round(averageRating)

		return(

			<ScrollView>

				<View style={{ ...styles.header, ...{ width } }}>
					<Text style={styles.headerText}>{locationName}</Text>
				</View>

				<BackButton />

				<CardSection>
					<View style={styles.imageContainer}>
						<Image 
							style={{ height: 300, width: 355 }}
							source={{ uri : `https://s3.amazonaws.com/s3-skatespot/images/${this.props.id}.jpg` }} 
						/>
					</View>	
				</CardSection>

				<CardSection>
					<Button onPress={() => Actions.reviews()}>
						Reviews
					</Button>
				</CardSection>

				<CardSection>
						<Text style={{ color: '#fff' }}>Location: {city}, {state}{"\n"}</Text>	
				</CardSection>

				<CardSection>
					<Stars initCount={avgRating} disabled />
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
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	}
}

const mapStateToProps = ({ spot }) => {
	return {
		id: spot.id,
		spot: spot.spotDetails
	}
}

export default connect(mapStateToProps)(Spot);