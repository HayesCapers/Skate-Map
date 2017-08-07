import React, { Component } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { getAccountDetails, accountInputUpdate, updateAccount } from '../actions/AccountActions';


const { height, width } = Dimensions.get('window')

class UserProfile extends Component {

	componentDidMount() {
		this.props.getAccountDetails(this.props.token)
	}

	submitUserInfo() {
		const user = {
			token: this.props.token,
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			bio: this.props.bio,
			email: this.props.email,
			userName: this.props.userName,
			phone: this.props.phoneNumber
		}
		this.props.updateAccount(user)
	}

	render() {
		const { main, header, headerImg, nameContainer, nameText, skillRatingText, avatarContainer, avatarImg, scroll, button } = styles

		return(
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={main}>

					<View style={header}>
						<Image 
							style={headerImg}
							source={require('../assets/images/atlSkyline.png')} 
						/>
					</View>

					<View style={nameContainer}>
						<Text style={nameText}>{this.props.userName}</Text>
						<Text style={skillRatingText}>Skill Rating: 0</Text>
					</View>

					<View style={avatarContainer}>
						<Image 
							style={avatarImg}
							source={require('../assets/images/user-placeholder.png')} 
						/>
					</View>

					<ScrollView stlye={scroll}>


						<Input 
							placeholder={'first name'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'firstName', value })}
							value={this.props.firstName}
						/>

						<Input 
							placeholder={'last name'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'lastName', value })}
							value={this.props.lastName}
						/>

						<Input 
							placeholder={'user name'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'userName', value })}
							value={this.props.userName}
						/>

						<Input 
							placeholder={'email'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'email', value })}
							value={this.props.email}
						/>

						<Input 
							placeholder={'phone number'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'phone', value })}
							value={this.props.phone}
						/>

						<Input 
							multiline
							numberOfLines={15}
							placeholder={'bio...'}
							onChangeText={value => this.props.accountInputUpdate({ prop: 'bio', value })}
							value={this.props.bio}
							boxHeight={200}
							containerHeight={225}
						/>

						<CardSection style={button}>
							<Button onPress={this.submitUserInfo.bind(this)}>
								Save
							</Button>
						</CardSection>
						
					</ScrollView>

				</View>
			</TouchableWithoutFeedback>	
		)
	}
}

const styles = {
	main: {
		position: 'relative',
		flex: 1
	},
	header: {
		height: 150,
		display: 'flex',
		overflow: 'hidden',
		borderBottomWidth: 200,
		borderColor: '#000'
	},
	headerImg: {
		width: width,
		position: 'relative',
		top: 0
	},
	nameContainer: {
		marginLeft: 135,
		position: 'relative',
		top: -22,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	nameText: {
		fontFamily: 'American Captain',
		fontSize: 25,
		color: '#FFF'
	},
	skillRatingText: {
		fontFamily: 'American Captain',
		fontSize: 20,
		color: '#111'
	},
	avatarContainer: {
		position: 'absolute',
		top: 160,
		left: 50,
		borderWidth: 2,
		borderColor: '#FFF'
	},
	avatarImg: {
		height: 75,
		width: 75
	},
	scroll: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	button: {
		marginBottom: 20
	},
	error: {
		fontFamily: 'American Captian',
		fontSize: 25,
		color: 'red'
	}
}

const mapStateToProps = ({ auth, account }) => {
	return {
		token: auth.user.token,
		userName: account.userName,
		email: account.email,
		phone: account.phone,
		bio: account.bio,
		firstName: account.firstName,
		lastName: account.lastName,
		city: account.city,
		state: account.state,
		accountError: account.error
	}
}

export default connect(mapStateToProps, { getAccountDetails, accountInputUpdate, updateAccount })(UserProfile);











