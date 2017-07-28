import {
	CURRENT_LOCATION,
	INPUT_UPDATE,
	TAKE_PICTURE
} from '../actions/types';

const INITIAL_STATE = {
	title: '',
	city: '',
	state: '',
	description: '',
	image: '',
	latitude: '',
	longitude: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CURRENT_LOCATION:
			return { ...state, latitude: action.payload.lat, longitude: action.payload.lon }
		case INPUT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value }
		case TAKE_PICTURE:
			return { ...state, image: action.payload }
		default:
			return state
	}
}