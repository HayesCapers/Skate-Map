import {
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS
} from './types';

const { axiosReq } = require('../../my_mods');

export const getAccountDetails = (token) => {
	return (dispatch) => {
		dispatch({ type: GET_USER_DETAILS })

		const url = 'http://localhost:3000/account'
		const data = {
			token
		}

		axiosReq('post',url,data)
			.then(user => {
				console.log(user)
			})
	}
}