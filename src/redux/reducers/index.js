import authReducer from './authReducer';
import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import profileReducer from './profileReducer';

export default combineReducers({authReducer, homeReducer, profileReducer});
