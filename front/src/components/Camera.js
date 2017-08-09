import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { takePic } from '../actions/CreateSpotActions';
import { Button, CardSection } from './common';
import { Actions } from 'react-native-router-flux';


class Cam extends Component {

	takePicture() {
		this.camera.capture()
			.then((data) => {
				console.log(data)
				this.props.takePic(data.path)
			})
			.catch(err => console.error(err));

		Actions.spotForm()
	}
		

	render() {
		return(
			<View style={styles.container}>
				<Camera
					ref={(cam) => {
					 this.camera = cam;
					}}
					style={styles.preview}
					aspect={Camera.constants.Aspect.fill}
					captureMode={Camera.constants.CaptureMode.still}
					captureTarget={Camera.constants.CaptureTarget.disk}
				>

					<View style={styles.button}>
						<CardSection>
							<Button
								onPress={this.takePicture.bind(this)}
							>
								Capture
							</Button>
						</CardSection>
					</View>

				</Camera>
			</View>
		)
	}
}

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
	preview: {
	   	position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	button: {
		position: 'absolute',
		bottom: 10,
		left: 15,
		width: 350
	}
}	 


export default connect(null,{ takePic })(Cam);

