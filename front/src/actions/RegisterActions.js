
import { Actions } from 'react-native-router-flux';
import {
	REGISTER_UPDATE,
	REGISTER_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS
} from './types';
import { registerUserSuccess, registerUserFail } from './common';
const { axiosReq } = require('../../my_mods');


export const registerUpdate = ({ prop, value }) => {
	return {
		type: REGISTER_UPDATE,
		payload: { prop, value }
	}
}

export const registerUser = (user) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER })

		const url = 'http://hayescapers.com:3000/register'
		axiosReq('post',url,user)
			.then(user => {
				if (user.data.msg === 'Success') {
					registerUserSuccess(dispatch,user.data)
				} else {
					registerUserFail(dispatch, user.data.msg)
				}
			}).catch((err) => registerUserFail(dispatch, err))
	}	
} 



