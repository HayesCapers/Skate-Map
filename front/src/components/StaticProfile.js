import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { BackButton, Button, CardSection } from './common';
import { connect } from 'react-redux';
import { addFriend } from '../actions/FriendActions';

const { height, width } = Dimensions.get('window')
const { axiosReq } = require('../../my_mods')


class StaticProfile extends Component {

	addFriend() {
		const url = 'http://hayescapers.com:3000/addFriend'
		const data = {
			userId: this.props.userId,
			friendId: this.props.selectedUser.userID,
			friendName: this.props.selectedUser.userName
		}

		axiosReq('post',url,data)
			.then((res) => {
				Actions.friends()
			})
	}

	removeFriend() {
		const url = 'http://hayescapers.com:3000/removeFriends'
		const data = {
			userId: this.props.userId,
			friendId: this.props.selectedUser.userID,
		}

		axiosReq('post',url,data)
			.then((res) => {
				Actions.friends()
			})
	}

	render() {
		console.log(this.props.selectedUser)
		const { selectedUser, friendIds } = this.props
		const { main, header, headerImg, nameContainer, nameText, skillRatingText, avatarContainer, avatarImg, scroll, bioText } = styles

		if (friendIds.indexOf(selectedUser.userID) === -1) {
			var button =	<CardSection>
								<Button onPress={() => this.addFriend()}>
									Add Friend
								</Button>
							</CardSection>

		}else{
			var button = 	<CardSection>
								<Button onPress={this.removeFriend.bind(this)}>
									Remove Friend
								</Button>
							</CardSection>
		}

		return(
			<View style={{ marginTop: 75 }}>

				<View style={header}>
					<Image 
						style={headerImg}
						source={require('../assets/images/atlSkyline.png')} 
					/>
				</View>

				<View style={nameContainer}>
					<Text style={nameText}>{selectedUser.userName}</Text>
					<Text style={skillRatingText}>Skill Rating: 0</Text>
				</View>

				<View style={avatarContainer}>
					<Image 
						style={avatarImg}
						source={require('../assets/images/user-placeholder.png')} 
					/>
				</View>

				<BackButton top={-250}/>

				{button}

				<CardSection>
					<Text style={bioText}>
						{selectedUser.firstName} {selectedUser.lastName}
					</Text>
				</CardSection>

				<CardSection>
					<Text style={bioText}>
						{selectedUser.deets}
					</Text>
				</CardSection>

			</View>
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
	bioText: {
		fontFamily: 'American Captain',
		fontSize: 20,
		color: '#FFF'
	}
}

const mapStateToProps = ({ friend, auth }) => {
	return {
		friendIds: friend.friends,
		selectedUser: friend.selectedUser,
		token: auth.user.token,
		userId: auth.user.userId
	}
}

export default connect(mapStateToProps, { addFriend })(StaticProfile)






