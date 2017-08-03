import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CardSection, Hamburger } from './components/common';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { getSpotDetails } from './actions/SpotActions';
import { saveLatLon } from './actions/CreateSpotActions';
import { mapStyle, BATMAN, night, pastel, retro, silverFox } from './assets/mapStyles'
const { axiosReq } = require('../my_mods');





class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initLocation: {
				latitude: 33.8499041,
				longitude: -84.3730464,
				latitudeDelta: 0.02,
				longitudeDelta: 0.02,
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

		axiosReq('post',url,data)
			.then(res => {
				console.log(res.data.spots)
				res.data.spots.map(spot => {
					spotArr.push(spot)
				})
				this.setState({
					spots: spotArr
				})
			})
	}

	showDetails(e) {
		const spotID = e.nativeEvent.id

		this.props.getSpotDetails(spotID)
	}

	saveCurrentLocation() {
		const { latitude, longitude } = this.state.initLocation

		this.props.saveLatLon(latitude, longitude);
		Actions.spotForm();
	}

	render() {
		console.log(this.props.styleIndex)
		const mapstyles = [
			mapStyle,
			BATMAN,
			night,
			pastel,
			retro,
			silverFox
		]
		var spotBox = [];
		this.state.spots.map((spot,index)=>{
			var id = spot.locationID.toString()
			spotBox.push(
				<MapView.Marker
					coordinate={{
						latitude: spot.latitude,
						longitude: spot.longitude
					}}
					image={require('./assets/images/marker-3.png')}
					title={spot.locationName}
					identifier={id}
					key={index}
					onPress={this.showDetails.bind(this)}
					/>
			)
		})

		return(
			<View style={styles.container}>

				<MapView 
					provider={PROVIDER_GOOGLE}
					customMapStyle={mapstyles[this.props.styleIndex]}
					showsUserLocation={true}
					initialRegion={this.state.initLocation}
					region={this.state.initLocation}
					style={styles.map}
					rotateEnabled={false}
				>
					{spotBox}
				</MapView>

				<View style={styles.button}>
					<CardSection 
						bgColor={'#fff'}
						opacity={.8}
					>
						<Button
							onPress={this.saveCurrentLocation.bind(this)}
							backgroundColor={'#fff'}
							borderColor={'#111'}
							fontSize={40}
							opacity={.8}
						>
							+
						</Button>
					</CardSection>
				</View>

			</View>
		)
	}
}

Map.propTypes = {
	provider: MapView.ProviderPropType,
};


const styles = {
	container: {
		position: 'absolute',
		top: 20,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		},
	button: {
		position: 'absolute',
		bottom: 20,
		right: 10,
		alignItems: 'flex-end',
		width: 100,
		height: 75,
	},
	ham: {
		position: 'absolute',
		top: 0,
		left: 0
	} 
}

const mapStateToProps = ({ settings }) => {
	return{
		styleIndex: settings.styleIndex
	}
}

export default connect(mapStateToProps,{ getSpotDetails, saveLatLon })(Map);





