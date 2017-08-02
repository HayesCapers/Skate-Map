import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { getAccountDetails } from '../actions/AccountActions';

const { height, width } = Dimensions.get('window')

class UserProfile extends Component {

	componentDidMount() {
		this.props.getAccountDetails(this.props.token)
	}

	render() {
		const { header, headerImg, avatarContainer, avatarImg } = styles

		return(
			<View>

				<View style={header}>
					<Image 
						style={headerImg}
						source={require('../assets/images/atlSkyline.png')} 
					/>
				</View>

				<View style={avatarContainer}>
					<Image 
						style={avatarImg}
						source={require('../assets/images/user-placeholder.png')} 
					/>
				</View>

			</View>
		)
	}
}

const styles = {
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
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.user.token,
	}
}

export default connect(mapStateToProps, { getAccountDetails })(UserProfile);