import {
	UPDATE_STARS,
	REVIEW_INPUT_UPDATE,
	LOGOUT_USER,
	REVIEW_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	stars: 0,
	reviewText: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case UPDATE_STARS:
			return { ...state, stars: action.payload }
		case REVIEW_INPUT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value }
		case LOGOUT_USER:
			return { ...INITIAL_STATE }	
		case REVIEW_SUCCESS:
			return { ...INITIAL_STATE }
		default:
			return state
	}
}