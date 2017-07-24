import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	INPUT_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
	userName: '',
	password: '',
	user: null,
	error: '',
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USERNAME_CHANGED:
			return { ...state, userName: action.payload}
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload}
		case LOGIN_USER:
			return { ...state, loading: true}	
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload}
		case LOGIN_USER_FAIL:
			return { ...state, error: 'fail', password: '', loading: false}	
		default:
			return state
	}
}


