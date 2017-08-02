import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { takePic } from '../actions/CreateSpotActions';
import { Button, CardSection } from './common';
import { Actions } from 'react-native-router-flux';


class Cam extends Component {
	
	// sendPic() {

	// 	const file = {
	// 			uri: this.state.imagePath,
	// 			name: 'delaytest.jpg',
	// 			type: 'image/jpg'
	// 		}

	// 		const options = {
	// 			keyPrefix: "images/",
	// 			bucket: "s3-skatespot",
	// 			region: "us-east-1",
	// 			accessKey: "AKIAIKYBFCBIKMB4SLYA",
	// 			secretKey: "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",
	// 			successActionStatus: 201
	// 		}
	// 		RNS3.put(file, options).then(response => {
	// 			if (response.status !== 201)
	// 				throw new Error("Failed to upload image to S3");
	// 			console.log(response.body);
	// 			/**
	// 			* {
	// 			*   postResponse: {
	// 			*     bucket: "your-bucket",
	// 			*     etag : "9f620878e06d28774406017480a59fd4",
	// 			*     key: "uploads/image.png",
	// 			*     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
	// 			*   }
	// 			* }
	// 			*/
	// 		});

	// }

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

// { path: 'assets-library://asset/asset.JPG?id=6FBD4E72-C9C0-4DC9-9008-03FEDFC57FAB&ext=JPG',
//   mediaUri: 'assets-library://asset/asset.JPG?id=6FBD4E72-C9C0-4DC9-9008-03FEDFC57FAB&ext=JPG' } 

// flex: 1,
// justifyContent: 'flex-end',
// alignItems: 'center',
// height: 350,
// width: 350
// <Image source={{uri: this.state.image, scale: 1}} style={{ height: 100, width: 100 }} />

export default connect(null,{ takePic })(Cam);

