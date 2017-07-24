import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
var mods = require('../my_mods');


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
		// navigator.geolocation.getCurrentPosition((position) => {
		// 	console.log(position)
		// 	var newLocation = {
		// 		latitude: position.coords.latitude,
		// 		longitude: position.coords.longitude,
		// 		latitudeDelta: 0.1,
		// 		longitudeDelta: 0.1
		// 	}
		// 	this.setState({
		// 		initLocation: newLocation
		// 	})
		// })
	}

	getSpots() {
		const url = 'http://localhost:3000/login';
		const data = {
			lat: this.state.initLocation.latitude,
			lon: this.state.initLocation.longitude
		}
		var spotArr = [];

		mods.axiosReq('get',url,data)
			.then(data => {
				data.spots.map(spot => {
					spotArr.push(spot)
				})
			}).catch()
	}

	render() {
		return(
			<View style={styles.container}>
				<MapView 
					showsUserLocation={true}
					initialRegion={this.state.initLocation}
					region={this.state.initLocation}
					style={styles.map}
					rotateEnabled={false}
				>
					<MapView.Marker
	                    coordinate={{
	                        latitude: 33.8499041,
	                        longitude: -84.3730464,
	                    }} 
	                    title={'Subway'}
                    	description={'$5.70'}
                    />
				</MapView>
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





