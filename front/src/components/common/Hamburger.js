import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const Hamburger = (props) => {
	return(
		<TouchableOpacity
			style={styles.container}
			onPress={props.onPress}
		>
			<Image 
			style={styles.image}
			source={require('../../assets/images/hamburger.png')}
			/>
		</TouchableOpacity>
	)
}

const styles = {
	container:{
		marginTop: 30,
		width: 50
	},
	image: {
		height: 50,
		width: 50,
	}
}

export { Hamburger };