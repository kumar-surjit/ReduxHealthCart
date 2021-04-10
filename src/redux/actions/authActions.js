import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {LOGIN, SIGNUP, PHONELOGIN, VERIFYOTP} from '../../config/urls';
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
    dispatch({type: actionTypes.SAVE_USER_DATA, payload: {userData: res.data}});
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

export function logInOTP(data) {
  // console.log(data);
  return new Promise((resolve, reject) => {
    apiPost(PHONELOGIN, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
        console.log(err);
      });
  });
}

export function verififyOtp(data) {
  return new Promise((resolve, reject) => {
    apiPost(VERIFYOTP, data)
      .then(res => {
        console.log('Response: VerifyOTP ', res);
        storeData(res.data);
        dispatch({
          type: actionTypes.SAVE_USER_DATA,
          payload: {userData: res.data},
        });
        resolve(res);
      })
      .catch(err => {
        reject(err);
        console.log('Error: VerifyOTP ', err);
      });
  });
}

export function logout() {
  dispatch({
    type: actionTypes.LOG_OUT,
  });
}
