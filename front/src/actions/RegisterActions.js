var axios = require('axios')
import { Actions } from 'react-native-router-flux';
import {
	REGISTER_UPDATE,
	REGISTER_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS
} from './types';


export const registerUpdate = ({ prop, value }) => {
	return {
		type: REGISTER_UPDATE,
		payload: { prop, value }
	}
}

export const registerUser = (user) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER })

		const url = 'http://localhost:3000/register'
		axios({
				method: 'post',
				url: url,
				data: user
			}).then(user => {
				if (user.status === 200) {
					registerUserSuccess(dispatch,user.data)
				} else {
					registerUserFail(dispatch)
				}
			}).catch(() => registerUserFail(dispatch))
	}	
} 

const registerUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

const registerUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.main()
}

