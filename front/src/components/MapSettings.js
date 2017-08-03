import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

class MapSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedId: 0
		}
	}

	render() {
		const { main, container, image, textStyle } = styles

		return(
			<View style={main}>

				<TouchableOpactiy>
					<View style={container}>
						<Image 
							style={image}
							source={require('../assets/images/map-main.png')} 
						/>
						<Text style={textStyle}>
							Default
						</Text>
					</View>
				</TouchableOpactiy>

			</View>
		)
	}
}

const styles = {
	main:{
		marginTop: 50
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	image: {
		height: 75,
		width: 75
	},
	textStyle: {
		fontFamily: 'American Captain',
		fontSize: 25,
		color: '#111'
	}
}

export { MapSettings };

