import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	INPUT_CHANGED,
	REGISTER_UPDATE,
	LOGOUT_USER
 } from '../actions/types';

const INITIAL_STATE = {
	userName: '',
	password: '',
	user: null,
	error: false,
	errorMsg: '',
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USERNAME_CHANGED:
			return { ...state, userName: action.payload, error: false }
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload, error: false }
		case LOGIN_USER:
			return { ...state, loading: true}	
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload }
		case LOGIN_USER_FAIL:
			return { ...state, error: true, errorMsg: action.payload , password: '', loading: false}	
		case REGISTER_UPDATE:
			return { ...state, error: false}
		case LOGOUT_USER:
			return { ...INITIAL_STATE }
		default:
			return state
	}
}


