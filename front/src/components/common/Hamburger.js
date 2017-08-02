import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const Hamburger = (props) => {
	return(
		<TouchableOpacity>
			<Image 
			style={styles.image}
			source={require('../../assets/images/hamburger.png')}
			/>
		</TouchableOpacity>
	)
}

const styles = {
	image: {
		height: 50,
		width: 50,
	}
}

export { Hamburger };