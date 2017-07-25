import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import SpotReducer from './SpotReducer';

export default combineReducers({
	auth: AuthReducer,
	registerForm: RegisterReducer,
	spot: SpotReducer
})