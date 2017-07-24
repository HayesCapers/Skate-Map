// Import libraries for making component 
import React from 'react';
import { Text, View } from 'react-native';

// make a Component
const Header = (props) => {
	const { textStyle, viewStyle } = styles;


	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>	
	);	
};

const styles = {
	viewStyle: {
		backgroundColor: '#5bc0de',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2},
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFFFFF'
	}
};

// Make the component available to other parts of the app
export { Header };