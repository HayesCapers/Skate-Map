var axios = require('axios');
import { Actions } from 'react-native-router-flux'
import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL
 } from './types';

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

			axios({
				method: 'post',
				url: url,
				data: {
					userName: userName,
					password: password
				}
			}).then(user => {
				if (user.status === 200) {
					loginUserSuccess(dispatch,user)
				} else {
					loginUserFail(dispatch)
			}
		}).catch(() => loginUserFail(dispatch))
	}
	return {
		type: LOGIN_USER_SUCCESS,
		payload: thePromise
	}
}


const loginUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user.data
	});

	Actions.main()
}

