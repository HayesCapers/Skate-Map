import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendItem = ({ icon, title, onPress }) => {
	const { item, text, ham, container, iconStyle } = styles

	return(
		<TouchableOpacity onPress={onPress}>
			<View style={container}>
				<View style={item}>
					<Image source={icon} style={iconStyle} />
					<Text style={text}> {title} </Text>
				</View>	
				<View style={ham}>
					<Icon name='chevron-right' size={20} color="#CACACA" />
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = {
	container: {
		display: 'flex',
		borderTopWidth: 1,
		borderColor: '#111',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	iconStyle: {
		marginLeft: 60,
		width: 30,
		height: 30
	},
	ham: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	text: {
		fontFamily: 'American Captain',
		fontSize: 39,
		paddingTop: 8
	}
}

export default FriendItem 