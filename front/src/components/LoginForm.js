import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions/AuthActions';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

	onUserNameChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { userName, password } = this.props

		this.props.loginUser(userName, password)
	}

	render(){
		return(
			<Card>
				<CardSection>
					<Input 
						placeholder='user'
						label='Username'
						onChangeText={this.onUserNameChange.bind(this)}
						value={this.props.userName}
					/>
				</CardSection>

				<CardSection>
					<Input 
						secureTextEntry
						placeholder='password'
						label="Password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>

				</Text>

				<CardSection>
					<Button
						onPress={this.onButtonPress.bind(this)}
					>
						Log in
					</Button>
				</CardSection>

				<CardSection>
					<Button
						onPress={Actions.register}
					>
						Sign Up
					</Button>
				</CardSection>

			</Card>
		)
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	}
}

const mapStateToProps = ({ auth }) => {
	return{
		userName: auth.userName,
		password: auth.password,
		error: auth.error,
		loading: auth.loading,
		user: auth.user
	}
}

export default connect(mapStateToProps,{
	emailChanged,
	passwordChanged,
	loginUser
})(LoginForm)














