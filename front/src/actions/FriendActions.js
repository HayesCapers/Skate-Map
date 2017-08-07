import {
	SEARCH_USER_UPDATE,
	SEARCH_USERS,
	SEARCH_USERS_SUCCESS,
	SEARCH_USERS_FAIL,
	SAVE_FRIEND_ID,
	GET_USER_DEETS_SUCCESS,
	ADD_FRIEND
} from './types';
import { Actions } from 'react-native-router-flux';

const { axiosReq } = require('../../my_mods');


export const userSearchInputUpdate = ({ prop, value }) => {
	return {
		type: SEARCH_USER_UPDATE,
		payload: { prop, value }
	}
}

export const searchUsers = (userName) => {
	return (dispatch) => {
		dispatch({ type: SEARCH_USERS })

		const url = 'http://localhost:3000/searchUser';

		axiosReq('post',url, { userName })
			.then((results) => {
				console.log(results)
				dispatch({
					type: SEARCH_USERS_SUCCESS,
					payload: results.data.results
				});
				Actions.searchResults()
			})
	}
}

export const saveFriendId = (array) => {
	return{
		type: SAVE_FRIEND_ID,
		payload: array
	}
}

export const getUserProfile = (userId) => {
	return (dispatch) => {
		const url = 'http://localhost:3000/userDeets';

		axiosReq('post',url,{ userId })
			.then((results) => {
				dispatch({
					type: GET_USER_DEETS_SUCCESS,
					payload: results.data.results[0]
				})
				Actions.userProfile()
			})
	}
}

