
import {
	GET_SPOT,
	GET_SPOT_SUCCESS,
	GET_SPOT_FAIL
} from './types';

const { axiosReq } = require('../../my_mods');

export const getSpotDetails = (locationID) => {
	return (dispatch) => {
		dispatch({ type: GET_SPOT })

		const url = 'http://localhost:3000/deets';
		const data = { locationID }

		axiosReq('post',url,data)
			.then(ham => {
				console.log(ham)
			})
			.catch(error => {
				console.log(error)
			})
	}
}