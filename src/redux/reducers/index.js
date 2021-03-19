import authReducer from './authReducer';
import {combineReducers} from 'redux';
import homeReducer from './homeReducer';

export default combineReducers({authReducer});
