import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import SpotReducer from './SpotReducer';
import CreateSpotReducer from './CreateSpotReducer';
import SettingsReducer from './SettingsReducer';
import AccountReducer from './AccountReducer';

export default combineReducers({
	auth: AuthReducer,
	registerForm: RegisterReducer,
	spot: SpotReducer,
	newSpot: CreateSpotReducer,
	account: AccountReducer,
	settings: SettingsReducer
})