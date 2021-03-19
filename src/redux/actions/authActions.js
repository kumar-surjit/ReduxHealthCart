import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {LOGIN, SIGNUP} from '../../config/urls';
import store from '../store';
import actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue)
  } catch (e) {
    console.log('failed to save data');
    // saving error
  }
}

export function signUp(data) {
  return new Promise((resolve, reject) => {
    apiPost(SIGNUP, data)
      .then(res => {
        console.log("INSIDE AUTHACTIONS RESPOMSE", res);
        storeData(data);
        store.dispatch({type: actionTypes.SAVE_USER_DATA, 
          payload: data});
        resolve(res);
      })
      .catch(err => {
        console.log("INSIDE AUTHACTIONS ERROR", err);
        reject(err);
      });
  });
}

export function login(data = {}) {
  apiPost(LOGIN, {email: ''});
}
