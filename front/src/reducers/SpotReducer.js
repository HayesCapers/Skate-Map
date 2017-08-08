import {
	GET_SPOT,
	GET_SPOT_SUCCESS,
	GET_SPOT_FAIL,
	LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
	id: '',
	spotDetails: {
		locationName: ''
	},
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_SPOT:
			return { ...state, loading: true, id: action.payload }
		case GET_SPOT_SUCCESS:
			return { ...state, loading: false, spotDetails: action.payload }
		case GET_SPOT_FAIL:
			return { ...state, ...INITIAL_STATE }	
		case LOGOUT_USER:
			return { ...INITIAL_STATE }	
		default:
			return state
	}
}