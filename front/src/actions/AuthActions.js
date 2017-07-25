
import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL
 } from './types';
 import { loginUserFail, loginUserSuccess } from './common';
 
 const { axiosReq } = require('../../my_mods');

export const emailChanged = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	}
}

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload:text
	}
}

export const loginUser = (userName, password) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER })

		const url = 'http://localhost:3000/login'
		const data = {
					userName: userName,
					password: password
				}

		axiosReq('post',url,data)
			.then(user => {
				if (user.status === 200) {
					loginUserSuccess(dispatch,user)
				} else {
					loginUserFail(dispatch)
				}
			}).catch(() => loginUserFail(dispatch))
	}
}


