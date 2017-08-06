import {
	CURRENT_LOCATION,
	INPUT_UPDATE,
	TAKE_PICTURE,
	SUBMIT_NEW_SPOT,
	CREATE_NEW_SPOT,
	CREATE_SPOT_FAIL,
	CREATE_SPOT_SUCCESS
} from './types';
import { createSpotFail, createSpotSuccess } from './common';
const { axiosReq, s3Upload } = require('../../my_mods');



export const saveLatLon = (lat, lon) => {
	return{
		type: CURRENT_LOCATION,
		payload: { lat, lon }
	}
}

export const inputUpdate = ({ prop, value }) => {
	return {
		type: INPUT_UPDATE,
		payload: { prop, value }
	}
}

export const takePic = (imagePath) => {
	return{
		type: TAKE_PICTURE,
		payload: imagePath
	}
}

export const submitNewSpot = (spotObj) => {
	return (dispatch) => {
		dispatch({ type: CREATE_NEW_SPOT })

		const url = 'http://localhost:3000/addSpot'
		axiosReq('post', url, spotObj)
			.then(res => {
				if (res.status === 200){
					console.log(res)
					s3Upload(spotObj.image, res.data.spotID)
						.then(response => {
							console.log(response)
							if (response.status !== 201) {
								createSpotFail(dispatch)
							}
							createSpotSuccess(dispatch,response)
						})
						.catch(() => createSpotFail(dispatch))	
				}
			}).catch(() => createSpotFail(dispatch))
	}
}


// .then(response => {
// 	if (response.status !== 201)
// 		throw new Error("Failed to upload image to S3");
// 	console.log(response.body);
// 	// *
// 	// * {
// 	// *   postResponse: {
// 	// *     bucket: "your-bucket",
// 	// *     etag : "9f620878e06d28774406017480a59fd4",
// 	// *     key: "uploads/image.png",
// 	// *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
// 	// *   }
// 	// * }
	
// });