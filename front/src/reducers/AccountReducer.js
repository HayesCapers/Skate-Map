import {
	ACCOUNT_INPUT_UPDATE,
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS,
	UPDATE_ACCOUNT_FAIL,
	LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
	userName: '',
	email: '',
	phone: '',
	firstName: '',
	lastName: '',
	bio: '',
	error: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USER_DETAILS_SUCCESS:
			const { userName, email, phone, firstName, lastName, bio } = action.payload

			return { ...state, userName, email, phone, firstName, lastName, bio, error: false }
		case ACCOUNT_INPUT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value, error: false }
		case UPDATE_ACCOUNT_FAIL:
			return { ...state, error: true}
		case LOGOUT_USER:
			return { ...INITIAL_STATE }
		default:
			return state
	}
}