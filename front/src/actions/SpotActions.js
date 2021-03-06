
import {
	GET_SPOT,
	GET_SPOT_SUCCESS,
	GET_SPOT_FAIL
} from './types';
import { Actions } from 'react-native-router-flux'

const { axiosReq } = require('../../my_mods');

export const getSpotDetails = (locationID) => {
	return (dispatch) => {
		dispatch({ 
			type: GET_SPOT,
			payload: locationID 
		})

		const url = 'http://hayescapers.com:3000/deets';
		const data = { locationID }

		axiosReq('post',url,data)
			.then(ham => {
				getDetailSuccess(dispatch,ham)
			})
			.catch(() => {
				getDetailFail(dispatch)
			})
	}
}

const getDetailSuccess = (dispatch,spot) => {
	dispatch({
		type: GET_SPOT_SUCCESS,
		payload: spot.data.deets[0]
	})

	Actions.spot()
}

const getDetailFail = (dispatch) => {
	dispatch({
		type: GET_SPOT_FAIL
	})

	Actions.main()
}
