import {
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	userName: '',
	email: '',
	phone: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USER_DETAILS_SUCCESS:
			const { userName, email, phone } = action.payload

			return { ...state, userName, email, phone }
		default:
			return state
	}
}