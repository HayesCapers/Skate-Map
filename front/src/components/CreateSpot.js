import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { inputUpdate, submitNewSpot } from '../actions/CreateSpotActions';
import { Card, CardSection, Input, Button } from './common';


class CreateSpot extends Component {

	submitSpot() {
		const { title, city, state, description, image } = this.props
		const spot = { title, city, state, description, image }

		this.props.submitNewSpot(spot)
	}

	openCamera() {
		Actions.camera()
	}

	render() {
		const { title, city, state, description, inputUpdate } = this.props

		return(
			<Card>

				<CardSection>
					<Input
						placeholder='title'
						label='title'
						onChangeText={value => inputUpdate({ prop: 'title', value })}
						value={title}
					/>
				</CardSection>

				<CardSection>
					<Input
						placeholder='Atlanta'
						label='city'
						onChangeText={value => inputUpdate({ prop: 'city', value })}
						value={city}
					/>
				</CardSection>

				<CardSection>
					<Input
						placeholder='GA'
						label='state'
						onChangeText={value => inputUpdate({ prop: 'state', value })}
						value={state}
					/>
				</CardSection>

				<CardSection>
					<Input
						multiline
						numberOfLines={5}
						placeholder='description'
						label='description'
						onChangeText={value => inputUpdate({ prop: 'description', value })}
						value={description}
					/>
				</CardSection>

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

			</Card>
		)
	}
}

const mapStateToProps = ({ newSpot }) => {
	const { title, city, state, description, image } = newSpot

	return { title, city, state, description, image }
}

export default connect(mapStateToProps,{ inputUpdate, submitNewSpot })(CreateSpot);