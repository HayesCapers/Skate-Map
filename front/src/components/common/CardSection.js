import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		borderRadius: 2,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		backgroundColor: '#111',
		borderColor: '#FFF',
		position: 'relative'
	}
}

export { CardSection };