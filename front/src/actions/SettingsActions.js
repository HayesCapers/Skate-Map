import {
	SET_MAP_STYLE
} from './types';

export const setMapStyle = (int) => {
	return {
		type: SET_MAP_STYLE,
		payload: int
	}
}