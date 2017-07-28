import { Actions } from 'react-native-router-flux';
import {
	CREATE_SPOT_FAIL,
	CREATE_SPOT_SUCCESS
} from '../types';

export const createSpotFail = (dispatch) => {
	dispatch({
		type: CREATE_SPOT_FAIL
	})
}

export const createSpotSuccess = (dispatch, s3Response) => {
	dispatch({
		type: CREATE_SPOT_SUCCESS,
		payload: s3Response
	})

	Actions.map()
}