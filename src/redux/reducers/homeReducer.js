
import actionTypes from '../actionTypes';
import imagePath from '../../constants/imagePath';

const initialState = {
  products: [],
//   carouselImage: [imagePath.slider_img1, imagePath.slider_img2, imagePath.slider_img3. imagePath.slider_img4, imagePath.slider_img5, imagePath.slider_img6],
  cartCount: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
   

    default:
      return {
        ...state,
      };
  }
}
