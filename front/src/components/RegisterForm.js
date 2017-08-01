import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, CardSection, Input, Spinner, BackButton } from './common'; 
import { registerUpdate, registerUser } from '../actions/RegisterActions';
import Logo from './Logo';


class RegisterForm extends Component {

	onButtonPress() {
		const { userName, email, password, phone } = this.props
		const user = { userName, email, password, phone }

		this.props.registerUser(user)
	}

	render() {
		return(

			<View>

				<BackButton />

				<Logo />

				<View style={styles.form}>

					<Input 
						placeholder='NickSux'
						label='Username'
						onChangeText={value => this.props.registerUpdate({ prop: 'userName', value })}
						value={this.props.userName}
					/>

					<Input 
						placeholder='email@gmail.com'
						label='Email'
						onChangeText={value => this.props.registerUpdate({ prop: 'email', value })}
						value={this.props.email}
					/>

					<Input 
						secureTextEntry
						placeholder='password'
						label="Password"
						onChangeText={value => this.props.registerUpdate({ prop: 'password', value })}
						value={this.props.password}
					/>

					<Input 
						placeholder='555-555-5555'
						label='Phone Number'
						onChangeText={value => this.props.registerUpdate({ prop: 'phone', value })}
						value={this.props.phone}
					/>

				</View>	

				<View style={styles.button}>

					<CardSection>
						<Button
							onPress={this.onButtonPress.bind(this)}
						>
							Register
						</Button>
					</CardSection>

				</View>	

			</View>	
		)
	}
}

const styles = {
	form: {
		marginTop: 10
	},
	button: {
		marginTop: 10
	}
}

const mapStateToProps = (state) => {
	const { userName, email, password, phone } = state.registerForm;
	const { user } = state.auth

	return { userName, email, password, phone, user }
}

export default connect(mapStateToProps,{ registerUpdate, registerUser })(RegisterForm);