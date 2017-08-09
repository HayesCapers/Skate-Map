import {
	UPDATE_STARS,
	REVIEW_INPUT_UPDATE,
	REVIEW_SUCCESS
} from './types';
import { Actions } from 'react-native-router-flux'

const { axiosReq } = require('../../my_mods');

export const updateStars = (int) => {
	return {
		type: UPDATE_STARS,
		payload: int
	}
}

export const submitReview = (review) => {
	return (dispatch) => {
		const url = 'http://hayescapers.com:3000/addReview';

		axiosReq('post',url,review)
			.then((response) => {
				dispatch({
					type: REVIEW_SUCCESS,
				})
				Actions.pop()
			})
	}
}

export const reviewInputUpdate = ({ prop, value }) => {
	return {
		type: REVIEW_INPUT_UPDATE,
		payload: { prop, value }
	}
}