import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { BackButton, Button, CardSection, Input } from './common';
import FriendItem from './FriendsList';
import { connect } from 'react-redux';
import { userSearchInputUpdate, searchUsers, saveFriendId, getUserProfile } from '../actions/FriendActions';

const { axiosReq } = require('../../my_mods');

class Friends extends Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
			expanded: false
		}
		this.buttonPress = this.buttonPress.bind(this)
	}

	componentDidMount() {
		const url = 'http://hayescapers.com:3000/friends'
		const userId = this.props.userId
		console.log(userId)
		var friendIds = []

		axiosReq('post',url,{ userId })
			.then((data) => {
				console.log(data)
				this.setState({
					friends: data.data.friends
				});

				for (let i = 0; i < data.data.friends.length; i++) {
					friendIds.push(data.data.friends[i].id)
				}

				this.props.saveFriendId(friendIds)
			})
	}

	expandSearch() {
		this.setState({
			expanded: true
		})
	}

	searchUser() {
		var userName = this.props.searchInput

		this.props.searchUsers(userName)
		this.setState({
			expanded: false
		})
	}

	buttonPress(userID) {
		this.props.getUserProfile(userID)
	}


	render() {
		var friendsArray = [];

		this.state.friends.map((friend) => {
			friendsArray.push(
				<FriendItem onPress={() => this.buttonPress(friend.id)} icon={require('../assets/images/user-placeholder.png')} title={friend.name} key={friend.id} />
			)
		})

		if(this.state.expanded) {
			var searchStatus = <View>
									<Input 
										placeholder='user name'
										onChangeText={value => this.props.userSearchInputUpdate({ prop: 'input', value})}
										value={this.props.searchInput}
									/>
									<CardSection>
										<Button onPress={this.searchUser.bind(this)}>
											Search
										</Button>
									</CardSection>	
								</View>
		}else{
			var searchStatus = <View>
									<CardSection>
										<Button onPress={this.expandSearch.bind(this)}>
											Find Friends
										</Button>
									</CardSection>
								</View>
		}

		return(
			<View style={styles.container}>
				<BackButton />

				{searchStatus}

				<View style={{ marginTop: 20 }}>
					<Text style={styles.header}>Your Friends</Text>
					{friendsArray}
				</View>		
			</View>
		)
	}
}

const styles = {
	container: {
		marginTop: 100
	},
	header: {
		fontFamily: 'American Captain',
		fontSize: 40,
		alignSelf: 'center',
		color: '#E4B363'
	}
}

const mapStateToProps = ({ auth, friend }) => {
	return {
		userId: auth.user.userId,
		token: auth.user.token,
		searchInput: friend.input
	}
}

export default connect(mapStateToProps, { userSearchInputUpdate, searchUsers, saveFriendId, getUserProfile })(Friends);










