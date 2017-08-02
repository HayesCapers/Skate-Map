import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline = false, numberOfLines = 1, width = 250, boxHeight = 35, containerHeight = 50 }) => {

	inputWidth = width
	const { inputStyle, labelStyle, containerStyle } = styles;

	return(
		<View style={{ ...containerStyle, ...{ height: containerHeight } }}>
			<TextInput 
				multiline={multiline}
				numberOfLines={numberOfLines}
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				style={{ ...inputStyle, ...{ width, height: boxHeight }}}
				value={ value }
				onChangeText={ onChangeText }
				autoCapitalize={'none'}
			/>
		</View>
	)
};

const styles = {
	inputStyle: {
		color: '#111',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		// alignSelf: 'center',
		borderWidth: 1,
		borderColor: '#111',
		shadowColor: '#111',
		shadowOffset: { width: 0, height: 2},
		shadowOpacity: 0.2,
	},
	// labelStyle: {
	// 	color: '#FFF',
	// 	fontSize: 18,
	// 	paddingLeft: 20,
	// 	flex: 1
	// },
	containerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	}
}

export { Input }