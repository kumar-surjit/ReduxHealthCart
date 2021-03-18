import actionTypes from '../actionTypes';

const initialState = {
  userData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USER: {
      return {
        ...state,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
