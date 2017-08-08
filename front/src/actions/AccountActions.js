import {
	ACCOUNT_INPUT_UPDATE,
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS,
	UPDATE_ACCOUNT,
	UPDATE_ACCOUNT_FAIL,
	UPDATE_ACCOUNT_SUCCESS
} from './types';

const { axiosReq } = require('../../my_mods');

export const accountInputUpdate = ({ prop, value }) => {
	return {
		type: ACCOUNT_INPUT_UPDATE,
		payload: { prop, value }
	}
}

export const getAccountDetails = (token) => {
	return (dispatch) => {
		dispatch({ type: GET_USER_DETAILS })

		const url = 'http://hayescapers.com:3000/account'
		const data = {
			token
		}

		axiosReq('post',url,data)
			.then(user => {
				if (user.data.bio === null) {
					user.data.bio = ''
				}
				if (user.data.firstName === null) {
					user.data.firstName = ''
				}
				if (user.data.lastName === null) {
					user.data.lastName = ''
				}
				const { userName, email, phone } = user.data

				dispatch({
					type: GET_USER_DETAILS_SUCCESS,
					payload: { 
						userName, 
						email, 
						phone, 
						firstName: user.data.firstName,
						lastName: user.data.lastName,
						bio: user.data.bio 
					}
				})
			}).catch(() => {
				dispatch({
					type: GET_USER_DETAILS_FAIL
				})
			})
	}
}

export const updateAccount = (user) => {
	return (dispatch) => {
		dispatch({ type: UPDATE_ACCOUNT })

		const url = 'http://hayescapers.com:3000/updateAccount';

		axiosReq('post',url,user)
			.then((res) => {
				if (res.data.msg !== 'Success') {
					dispatch({
						type: UPDATE_ACCOUNT_FAIL,
					})
				}
			}).catch(() => {
				dispatch({
					type: UPDATE_ACCOUNT_FAIL
				})
			})
	}
}