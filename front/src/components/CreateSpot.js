import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import { inputUpdate, submitNewSpot } from '../actions/CreateSpotActions';
import { Card, CardSection, Input, Button, BackButton } from './common';



class CreateSpot extends Component {

	submitSpot() {
		const { title, city, state, description, image, latitude, longitude } = this.props
		const spot = { locationName: title, city, state, description, image, latitude, longitude }

		this.props.submitNewSpot(spot)
	}

	openCamera() {
		Actions.camera()
	}

	render() {
		const { title, city, state, description, inputUpdate } = this.props

		return(
			<View style={{ marginTop: 100 }}>

				<BackButton />

					<Input
						placeholder='title'
						label='title'
						onChangeText={value => inputUpdate({ prop: 'title', value })}
						value={title}
					/>

					<Input
						placeholder='Atlanta'
						label='city'
						onChangeText={value => inputUpdate({ prop: 'city', value })}
						value={city}
					/>

					<Input
						placeholder='GA'
						label='state'
						onChangeText={value => inputUpdate({ prop: 'state', value })}
						value={state}
					/>

					<Input
						multiline
						numberOfLines={5}
						placeholder='description'
						label='description'
						onChangeText={value => inputUpdate({ prop: 'description', value })}
						value={description}
						boxHeight={200}
						containerHeight={215}
					/>

				<CardSection>
					<Button
						onPress={this.openCamera.bind(this)}
					>
						Take Picture
					</Button>
				</CardSection>

				<CardSection>
					<Button
						onPress={this.submitSpot.bind(this)}
					>
						Submit
					</Button>
				</CardSection>

			</View>	
		)
	}
}

const mapStateToProps = ({ newSpot }) => {
	const { title, city, state, description, image, latitude, longitude } = newSpot

	return { title, city, state, description, image, latitude, longitude }
}

export default connect(mapStateToProps,{ inputUpdate, submitNewSpot })(CreateSpot);