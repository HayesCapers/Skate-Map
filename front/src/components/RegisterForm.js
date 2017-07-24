import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, CardSection, Input, Spinner } from './common'; 
import { registerUpdate, registerUser } from '../actions/RegisterActions';

class RegisterForm extends Component {

	onButtonPress() {
		const { userName, email, password, phone } = this.props
		const user = { userName, email, password, phone }

		this.props.registerUser(user)
	}

	render() {
		console.log(this.props.user)
		return(
			<Card>
				<CardSection>
					<Input 
						placeholder='NickSux'
						label='Username'
						onChangeText={value => this.props.registerUpdate({ prop: 'userName', value })}
						value={this.props.userName}
					/>
				</CardSection>

				<CardSection>
					<Input 
						placeholder='email@gmail.com'
						label='Email'
						onChangeText={value => this.props.registerUpdate({ prop: 'email', value })}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input 
						secureTextEntry
						placeholder='password'
						label="Password"
						onChangeText={value => this.props.registerUpdate({ prop: 'password', value })}
						value={this.props.password}
					/>
				</CardSection>

				<CardSection>
					<Input 
						placeholder='555-555-5555'
						label='Phone Number'
						onChangeText={value => this.props.registerUpdate({ prop: 'phone', value })}
						value={this.props.phone}
					/>
				</CardSection>

				<CardSection>
					<Button
						onPress={this.onButtonPress.bind(this)}
					>
						Register
					</Button>
				</CardSection>

			</Card>
		)
	}
}

const mapStateToProps = (state) => {
	const { userName, email, password, phone } = state.registerForm;
	const { user } = state.auth

	return { userName, email, password, phone, user }
}

export default connect(mapStateToProps,{ registerUpdate, registerUser })(RegisterForm);