import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, backgroundColor = '#111', borderColor = '#fff', fontSize = 20, opacity = 1}) => {
	const { buttonStyle, textStyle } = styles

	return(
		<TouchableOpacity onPress={onPress} style={{ ...buttonStyle, ...{ backgroundColor, borderColor, opacity } }}>
			<Text style={{ ...textStyle, ...{ fontSize } }}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const styles = {
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		borderRadius: 2,
		borderWidth: 1,
		marginLeft: 2,
		marginRight: 2,
	},
	textStyle: {
		alignSelf: 'center',
		color: '#E4B363',
		fontWeight: '600',
		marginRight: 1,
		marginTop: 5,
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'American Captain'
	}
}

export { Button };