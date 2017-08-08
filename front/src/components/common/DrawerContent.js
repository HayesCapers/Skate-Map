import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { MenuItem } from './';
import { logOutUser } from '../../actions/AuthActions';

class DrawerComponent extends Component {

	logOut() {
		this.props.logOutUser()
		Actions.auth()
	}

	render() {
		const { container, imgContainer, logo } = styles

		return(
			<View style={container}>

				<View style={imgContainer}>
					<Image 
						source={require('../../assets/images/skate-map-logo-gold.png')} 
						style={logo}
					/>
				</View>

				<MenuItem
					icon={'face'}
					title='Profile'
					onPress={() => Actions.user()}
				/>

				<MenuItem
					icon={'group'}
					title='Friends'
					onPress={() => Actions.friends()}
				/>

				<MenuItem
					icon={'thumb-up'}
					title='Favorites'
					onPress={() => {console.log('pressed')}}
				/>

				<MenuItem
					icon={'stars'}
					title='Top Rated'
					onPress={() => {console.log('pressed')}}
				/>

				<MenuItem
					icon={'settings'}
					title='Settings'
					onPress={() => Actions.mapSettings()}
				/>

				<MenuItem
					icon={'more-horiz'}
					title='Log Out'
					onPress={() => this.logOut()}
				/>

			</View>
		)
	}	
}

const styles = {
	container: {
		marginTop: 35,
	},
	imgContainer: {
		marginBottom: 25
	},
	logo: {
		alignSelf: 'center',
		height: 150,
		width: 300
	}
}


const DrawerContents = connect(null, { logOutUser })(DrawerComponent) 
export { DrawerContents }




