import {
	INPUT_UPDATE,
	TAKE_PICTURE,
	SUBMIT_NEW_SPOT
} from './types';
const axiosReq = require('../../my_mods');



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

export default submitNewSpot = (spotObj) => {
	return (dispatch) => {
		dispatch({ type: CREATE_NEW_SPOT })

		
	}
}