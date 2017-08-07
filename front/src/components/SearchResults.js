import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BackButton, Button } from './common';
import FriendItem from './FriendsList';
import { getUserProfile } from '../actions/FriendActions';
import { connect } from 'react-redux';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.buttonPress = this.buttonPress.bind(this)
	}

	buttonPress(userID) {
		this.props.getUserProfile(userID)
	}

	render() {
		var resultsArray = []

		if (this.props.searchResults.length > 0){
			this.props.searchResults.map((user) => {
				resultsArray.push(
					<FriendItem onPress={() => this.buttonPress(user.userID)} icon={require('../assets/images/user-placeholder.png')} title={user.userName} key={user.userID} />
				)
			})
		}else{
			resultsArray.push(
				<View key={0}>
					<Text style={{ color: 'red', fontFamily: 'American Captain', fontSize: 40}}>
						No Results
					</Text>	 
				</View>
			)	
		}	

		return(
			<View style={{ marginTop: 100 }}>
				<BackButton />
				{resultsArray}
			</View>
		)
	}
}

const mapStateToProps = ({ friend }) => {
	return{
		searchResults: friend.searchResults
	}
}

export default connect(mapStateToProps, { getUserProfile })(SearchResults);

