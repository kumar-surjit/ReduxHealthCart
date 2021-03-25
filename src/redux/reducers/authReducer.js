import actionTypes from '../actionTypes';
import imagePath from '../../constants/imagePath';

const initialState = {
  userData: null,
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
      const {userData} = action.payload;
      console.log('LOGGED IN REDUCER', action);
      return {
        ...state,
        userData: userData,
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
