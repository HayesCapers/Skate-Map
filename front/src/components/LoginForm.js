import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions/AuthActions';
import { Card, Button, CardSection, Input, Spinner } from './common';
import Logo from './Logo';

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
			<View style={{ marginTop: 70 }}>

				<Logo />

				<View style={{ marginTop: 10 }}>

					<Input 
						placeholder='user'
						label='Username'
						onChangeText={this.onUserNameChange.bind(this)}
						value={this.props.userName}
					/>

					<Input 
						secureTextEntry
						placeholder='password'
						label="Password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>

				</View>	

				<Text style={styles.errorTextStyle}>

				</Text>

				<View style={{ marginTop: 10 }}>

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

				</View>

			</View>
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














