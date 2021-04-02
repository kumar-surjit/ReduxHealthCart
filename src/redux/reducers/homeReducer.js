import actionTypes from '../actionTypes';
import imagePath from '../../constants/imagePath';

const initialState = {
  carouselImage: [
    imagePath.slider_img1,
    imagePath.slider_img2,
    imagePath.slider_img3,
    imagePath.slider_img4,
    imagePath.slider_img5,
    imagePath.slider_img6,
  ],
  products: [
    {
      id: 1,
      name: 'MuscleBlaze Whey Protein,  8.8 lb  Rich Milk Chocolate ',
      price: '995',
      discountedPrice: '646',
      discount: '35%\nOFF',
      coverImg: imagePath.product_img1,
      rating: '3.9',
      sizes: [6, 7, 8, 9, 10, 11],
      imageCarousel: [
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
      ],
      description: 'Men Sneakers',
      stock: 20,
    },
    {
      id: 2,
      name: 'MuscleBlaze Whey Protein,  8.8 lb  Rich Milk Chocolate ',
      price: '995',
      discountedPrice: '646',
      discount: '35%\nOFF',
      coverImg: imagePath.product_img2,
      rating: '3.9',
      sizes: [6, 7, 8, 9, 10, 11],
      imageCarousel: [
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
      ],
      description: 'Men Sneakers',
      stock: 25,
    },
    {
      id: 3,
      name: 'MuscleBlaze Whey Protein,  8.8 lb  Rich Milk Chocolate ',
      price: '995',
      discountedPrice: '646',
      discount: '35%\nOFF',
      coverImg: imagePath.product_img3,
      rating: '3.9',
      sizes: [6, 7, 8, 9, 10, 11],
      imageCarousel: [
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
      ],
      description: 'Men Sneakers',
      stock: 30,
    },
    {
      id: 4,
      name: 'MuscleBlaze Whey Protein,  8.8 lb  Rich Milk Chocolate ',
      price: '995',
      discountedPrice: '646',
      discount: '35%\nOFF',
      coverImg: imagePath.product_img4,
      rating: '3.9',
      sizes: [6, 7, 8, 9, 10, 11],
      imageCarousel: [
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
      ],
      description: 'Men Sneakers',
      stock: 28,
    },
    {
      id: 5,
      name: 'MuscleBlaze Whey Protein,  8.8 lb  Rich Milk Chocolate ',
      price: '995',
      discountedPrice: '646',
      discount: '35%\nOFF',
      coverImg: imagePath.product_img5,
      rating: '3.9',
      sizes: [6, 7, 8, 9, 10, 11],
      imageCarousel: [
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
        'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
      ],
      description: 'Men Sneakers',
      stock: 32,
    },
  ],
  cartCount: 0,
  cartItems: [],
  profiles: [],
  themeColor: '#34B4AC',
  selectedIndex: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const {product} = action.payload;
      // console.log(id++);
      // console.log('inside homeReducer, ', product);
      return {
        ...state,
        cartCount: state.cartCount + 1,
        cartItems: [
          ...state.cartItems,
          {id: product.id, productDetail: {product: product, quantity: 1}},
        ],
      };
    }
    case actionTypes.ADD_QUANTITY: {
      const {id} = action.payload;
      // console.log(id);
      // console.log('OLD: ', state.cartItems[0].productDetail);
      const newCartItems = state.cartItems.map(item => {
        if (item.id == id) {
          item.productDetail.quantity = item.productDetail.quantity + 1;
        }
        return item;
      });
      // console.log('NEW: ', state.cartItems[0].productDetail);
      // console.log('NEWCARTITEMS: ', newCartItems);
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    case actionTypes.SUBTRACT_QUANTITY: {
      const {id} = action.payload;
      // console.log(id);
      // console.log('OLD: ', state.cartItems[0].productDetail);
      const newCartItems = state.cartItems.map(item => {
        if (item.id == id && item.productDetail.quantity > 1) {
          item.productDetail.quantity = item.productDetail.quantity - 1;
        }
        return item;
      });
      // console.log('NEW: ', state.cartItems[0].productDetail);
      // console.log('NEWCARTITEMS: ', newCartItems);
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    case actionTypes.REMOVE_ITEM_FROM_CART: {
      const {id} = action.payload;
      // console.log('inside remove reducer');
      const newCartItems = state.cartItems.filter(item => item.id != id);
      return {
        ...state,
        cartItems: newCartItems,
        cartCount: state.cartCount - 1,
      };
    }
    case actionTypes.PLACE_ORDER: {
      // console.log('INSIDE PLACE ORDER REDUCER');
      return {
        ...state,
        cartItems: [],
        cartCount: 0,
      };
    }
    case actionTypes.ADD_PROFILES: {
      const {profiles} = action.payload;
      // console.log(profiles);
      return {
        ...state,
        profiles: [...state.profiles, ...profiles],
      };
    }
    case actionTypes.CHANGE_TO_RED:
      return {
        ...state,
        themeColor: '#00C0BF',
        selectedIndex: action.payload,
      };
    case actionTypes.CHANGE_TO_BLUE:
      return {
        ...state,
        themeColor: '#347cb4',
        selectedIndex: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
