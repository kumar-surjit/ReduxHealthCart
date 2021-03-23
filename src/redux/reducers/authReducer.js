import actionTypes from '../actionTypes';
import imagePath from '../../constants/imagePath';

const initialState = {
  userData: {},
  isLoggedIn: false,
  otpUserId: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_USER_DATA: {
      const {data} = action.payload;
      // console.log('INSIDE REDUCER ,' , data);
      return {
        ...state,
        userData: data,
      };
    }
    case actionTypes.LOGGED_IN: {
      const {isLoggedIn} = action.payload;
      console.log('LOGGED IN REDUCER', action);
      return {
        ...state,
        isLoggedIn: isLoggedIn,
      };
    }
    case actionTypes.LOG_OUT: {
      const {isLoggedIn} = action.payload;
      console.log('LOGGED OUT REDUCER', action);
      return {
        ...state,
        isLoggedIn: isLoggedIn,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
