
import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT_USER
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

		const url = 'http://hayescapers.com:3000/login'
		const data = {
					userName: userName,
					password: password
				}
		console.log(url)

		axiosReq('post',url,data)
			.then(user => {
				console.log(user)
				if (user.data.msg === 'Success') {
					loginUserSuccess(dispatch,user)
				} else {
					loginUserFail(dispatch, user.data.msg)
				}
			}).catch((err) => loginUserFail(dispatch, err))
	}
}

export const logOutUser = () => {
	return {
		type: LOGOUT_USER
	}
}


