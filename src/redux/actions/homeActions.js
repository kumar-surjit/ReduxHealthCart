import {dispatch} from '../store';
import actionTypes from '../actionTypes';

export function addToCart(product) {
  console.log(product);
  console.log('inside add to cart');
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {product},
  };
}

export function addQuantity(id) {
  return {
    type: actionTypes.ADD_QUANTITY,
    payload: {id},
  };
}

export function subtractQuantity(id) {
  return {
    type: actionTypes.SUBTRACT_QUANTITY,
    payload: {id},
  };
}

export function removeItemFromCart(id) {
  // console.log('inside actions remove item');
  return {
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    payload: {id},
  };
}

export function placeOrder() {
  // console.log('inside actions remove item');
  return {
    type: actionTypes.PLACE_ORDER,
  };
}
