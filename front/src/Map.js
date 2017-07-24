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

		this.getSpots = this.getSpots.bind(this)		
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

		this.getSpots()
	}

	getSpots() {
		const url = 'http://localhost:3000/initMarkers';
		const data = {
			lat: this.state.initLocation.latitude,
			lon: this.state.initLocation.longitude
		}
		var spotArr = [];

		mods.axiosReq('post',url,data)
			.then(data => {
				console.log(data)
				data.data.spots.map(spot => {
					spotArr.push(spot)
				})
				console.log(spotArr)
				this.setState({
					spots: spotArr
				})
			})
	}

	showDetails(e) {
		console.log(e.nativeEvent.id)
	}

	render() {
		var spotBox = [];
		this.state.spots.map((spot,index)=>{
			var id = spot.locationID.toString()
			spotBox.push(
				<MapView.Marker
					coordinate={{
						latitude: spot.latitude,
						longitude: spot.longitude
					}}
					title={spot.locationName}
					description={
						`rating: ${spot.rating} security level: ${spot.securityLevel}`
					}
					identifier={id}
					key={index}
					onPress={this.showDetails.bind(this)}
					/>
			)
		})
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
                    {spotBox}
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





