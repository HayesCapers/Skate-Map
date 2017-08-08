
import { Actions } from 'react-native-router-flux';
import {
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
} from '../types';

export const loginUserFail = (dispatch,msg) => {
	dispatch({
		type: LOGIN_USER_FAIL,
		payload: msg
	})
}

export const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user.data
	});

	Actions.main()
}

export const registerUserFail = (dispatch, msg) => {
	dispatch({
		type: LOGIN_USER_FAIL,
		payload: msg
	})
}

export const registerUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.main()
}