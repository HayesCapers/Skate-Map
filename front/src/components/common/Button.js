import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles

	return(
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const styles = {
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#111',
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#fff',
		marginLeft: 4,
		marginRight: 4
	},
	textStyle: {
		alignSelf: 'center',
		color: '#E4B363',
		fontSize: 20,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'American Captain'
	}
}

export { Button };