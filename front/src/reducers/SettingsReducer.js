import {
	SET_MAP_STYLE,
	LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
	styleIndex: 0
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case SET_MAP_STYLE:
			return { ...state, styleIndex: action.payload }
		case LOGOUT_USER:
			return { ...INITIAL_STATE }	
		default:
			return state
	}
}