import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const BackButton = ({ top = -50, onPress = () => Actions.pop() }) => {

	return(
		<TouchableOpacity onPress={onPress}>
			<Image
				style={{ ...styles.button, ...{ top } }}
				source={require('../../assets/images/back-icon.png')}
			/>
		</TouchableOpacity>
	)	
}

const styles = {
	button: {
		position: 'absolute',
		left: 20,
		height: 25,
		width: 25,
		alignSelf: 'flex-start',
	}
}

export { BackButton };