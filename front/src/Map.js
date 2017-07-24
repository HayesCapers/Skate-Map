import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initLocation: {
				latitude: 33.8499041,
				longitude: -84.3730464,
				latitudeDelta: 0.05,
				longitudeDelta: 0.05,
			},
			spots: []
		}
		
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			var initPosit = JSON.stringify(position);
			var newLocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			}
			this.setState({
				initLocation: newLocation
			})
		})
	}

	render() {
		return(
			<View style={styles.container}>
				<MapView 
					initialRegion={{				
						latitude: 33.8499041,
						longitude: -84.3730464,
						latitudeDelta: 0.05,
						longitudeDelta: 0.05
					}}
					style={styles.map}
				/>
			</View>
		)
	}
}


const styles = {
	container: {
		position: 'relative',
		height: 500
	  },
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	  },
}

export default Map





