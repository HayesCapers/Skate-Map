import {
	SEARCH_USER_UPDATE,
	SEARCH_USERS,
	SEARCH_USERS_SUCCESS,
	SEARCH_USERS_FAIL,
	SAVE_FRIEND_ID,
	GET_USER_DEETS_SUCCESS,
	LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
	input: '',
	searchResults: [],
	friends: [],
	selectedUser: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEARCH_USER_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value }
		case SEARCH_USERS_SUCCESS:
			return { ...state, input: '', searchResults: action.payload}
		case SAVE_FRIEND_ID:
			return { ...state, friends: action.payload }
		case GET_USER_DEETS_SUCCESS:
			return { ...state, selectedUser: action.payload }	
		case LOGOUT_USER:
			return { ...INITIAL_STATE }	
		default:
			return state
	}
}