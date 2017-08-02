import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, bgColor = '#111', opacity = 1 }) => {
	return (
		<View style={{ ...styles.containerStyle, ...{ backgroundColor: bgColor, opacity } }}>
			{children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderBottomWidth: 0,
		padding: 5,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		borderRadius: 2,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#FFF',
		position: 'relative',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2},
		shadowOpacity: .5,
		shadowRadius: 3,
	}
}

export { CardSection };