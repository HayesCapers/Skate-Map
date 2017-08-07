import {
	UPDATE_STARS,
	REVIEW_INPUT_UPDATE
} from './types';

const { axiosReq } = require('../../my_mods');

export const updateStars = (int) => {
	return {
		type: UPDATE_STARS,
		payload: int
	}
}

export const submitReview = (review) => {
	return (dispatch) => {
		const url = 'http://localhost:3000/addReview';

		axiosReq('post',url,review)
			.then((response) => {
				console.log(response)
			})
	}
}

export const reviewInputUpdate = ({ prop, value }) => {
	return {
		type: REVIEW_INPUT_UPDATE,
		payload: { prop, value }
	}
}