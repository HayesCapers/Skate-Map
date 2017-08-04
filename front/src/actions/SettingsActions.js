import {
	SET_MAP_STYLE
} from './types';



export const setMapStyle = (int) => {
	console.log('made it inside redux action')
	return {
		type: SET_MAP_STYLE,
		payload: int
	}
}