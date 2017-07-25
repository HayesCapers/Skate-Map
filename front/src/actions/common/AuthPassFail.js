
import { Actions } from 'react-native-router-flux';
import {
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
} from '../types';

export const loginUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

export const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user.data
	});

	Actions.main()
}

export const registerUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

export const registerUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.main()
}