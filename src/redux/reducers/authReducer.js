import { act } from 'react-test-renderer';
import actionTypes from '../actionTypes';

const initialState = {
  userData: {},
  products: [],
//   carouselImage: [imagePath.slider_img1, imagePath.slider_img2, imagePath.slider_img3. imagePath.slider_img4, imagePath.slider_img5, imagePath.slider_img6],
  cartCount: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_USER_DATA: {
      const {data} = action.payload;
      // console.log('INSIDE REDUCER ,' , data);
      return {
        ...state,
        userData: data
      };
    }

    case actionTypes.addToCart: {
      //   const {data} = action.payload;
        console.log('INSIDE REDUCER ,' , data);
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
