import {
	SET_MAP_STYLE
} from '../actions/types';

const INITIAL_STATE = {
	styleIndex: 0
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case SET_MAP_STYLE:
			return { ...state, styleIndex: action.payload }
		default:
			return state
	}
}