import actionTypes from '../actionTypes';

const initialState = {
  profiles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_PROFILES: {
      const {profiles} = action.payload;
      // console.log(profiles);
      return {
        ...state,
        profiles: [...state.profiles, ...profiles],
      };
    }
    default:
      return {
        ...state,
      };
  }
}
