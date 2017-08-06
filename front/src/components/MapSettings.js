import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, CardSection, BackButton } from './common';
import { connect } from 'react-redux';
import { setMapStyle } from '../actions/SettingsActions';
import { Actions } from 'react-native-router-flux'
const mapStyleInfo = require('../assets/mapStyles/mapInfo');

class MapSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedId: this.props.styleIndex
		}
	}

	onSelect(key) {
		this.setState({
			selectedId: key
		})
	} 

	onSubmit() {
		console.log('firing redux action')
		this.props.setMapStyle(this.state.selectedId);
		Actions.map()
	}

	render() {
		console.log(this.props.styleIndex)
		const { main, container, image, textStyle, selected, selectedText } = styles
		const items = []
		mapStyleInfo.map((style, index) => {
			if (this.state.selectedId === style.key) {
				items.push(
					<TouchableOpacity key={index} onPress={() => this.onSelect(style.key)}>
						<View style={selected}>
							<Image 
								style={image}
								source={style.image} 
							/>
							<Text style={selectedText}>
								{style.title}
							</Text>
						</View>
					</TouchableOpacity>
				)	
			}else{
				items.push(
					<TouchableOpacity key={index} onPress={() => this.onSelect(style.key)}>
						<View style={container}>
							<Image 
								style={image}
								source={style.image} 
							/>
							<Text style={textStyle}>
								{style.title}
							</Text>
						</View>
					</TouchableOpacity>
				)	
			}	
		})

		return(
			<View>

				<BackButton top={50}/>

				<ScrollView style={main}>

					{ items }

					<CardSection>
						<Button 
							onPress={this.onSubmit.bind(this)}
						>
							Save
						</Button>
					</CardSection>	

				</ScrollView>

			</View>
		)
	}
}

const styles = {
	main:{
		marginTop: 100,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 5,
	},
	image: {
		height: 75,
		width: 75
	},
	textStyle: {
		fontFamily: 'American Captain',
		fontSize: 25,
		color: '#111',
		marginLeft: 75
	},
	selected: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: '#111',
	},
	selectedText: {
		fontFamily: 'American Captain',
		fontSize: 25,
		color: '#FFF',
		marginLeft: 75
	}
}

const mapStateToProps = ({ settings }) => {
	return{
		styleIndex: settings.styleIndex
	}
}

export default connect(mapStateToProps, { setMapStyle })(MapSettings);

