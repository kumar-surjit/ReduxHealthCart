import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {LOGIN, SIGNUP} from '../../config/urls';
import store from '../store';
import actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {dispatch} = store;

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userData', jsonValue);
    console.log('success saved data');
  } catch (e) {
    console.log('failed to save data', e);
    // saving error
  }
};

export function signUp(data) {
  const tempData = {name: 'surjit'};
  return new Promise((resolve, reject) => {
    console.log(data);
    storeData(tempData);
    dispatch({type: actionTypes.LOGGED_IN, payload: {isLoggedIn: true}});
    resolve(data);
    // apiPost(SIGNUP, data)
    //   .then(res => {
    //     console.log('INSIDE AUTHACTIONS RESPOMSE', res);

    //
    //     resolve(res);
    //   })
    //   .catch(err => {
    //     console.log('INSIDE AUTHACTIONS ERROR', err);
    //     reject(err);
    //   });
  });
}

export function logout() {
  dispatch({
    type: actionTypes.LOG_OUT,
    payload: {isLoggedIn: false},
  });
}
