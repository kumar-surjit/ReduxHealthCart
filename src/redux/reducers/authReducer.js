import actionTypes from '../actionTypes';
import imagePath from '../../constants/imagePath';

const initialState = {
  userData: null,
  otpUserId: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_USER_DATA: {
      const {userData} = action.payload;
      console.log('INSIDE REDUCER ,', userData);
      return {
        ...state,
        userData,
      };
    }
    case actionTypes.LOGGED_IN: {
      const {userData} = action.payload;
      let parsedData = JSON.parse(userData);
      console.log('LOGGED IN REDUCER', action);
      return {
        ...state,
        userData: parsedData,
      };
    }
    case actionTypes.LOG_OUT: {
      console.log('LOGGED OUT REDUCER', action);
      return {
        ...state,
        userData: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
