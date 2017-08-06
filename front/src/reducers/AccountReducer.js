import {
	ACCOUNT_INPUT_UPDATE,
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	userName: '',
	email: '',
	phone: '',
	firstName: '',
	lastName: '',
	bio: '',
}

export default (state = INITIAL_STATE, action) => {
	console.log(action.type)
	switch (action.type) {
		case GET_USER_DETAILS_SUCCESS:
			const { userName, email, phone, firstName, lastName, bio } = action.payload

			return { ...state, userName, email, phone, firstName, lastName, bio }
		case ACCOUNT_INPUT_UPDATE:
			console.log('we init')
			return { ...state, [action.payload.prop]: action.payload.value }
		default:
			return state
	}
}