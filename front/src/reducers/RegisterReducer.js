import { 
	REGISTER_UPDATE,
	REGISTER_USER,
	LOGOUT_USER
 } from '../actions/types';

 const INITIAL_STATE = {
	userName: '',
	password: '',
	email: '',
	phone: '',
	user: null,
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REGISTER_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value }
		case REGISTER_USER:
			return { ...state, loading: true }
		case LOGOUT_USER:
			return { ...INITIAL_STATE }	
		default:
			return state
	}
}