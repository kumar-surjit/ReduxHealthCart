import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {LOGIN, SIGNUP} from '../../config/urls';
import store from '../store';
import actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  return new Promise((resolve, reject) => {
    storeData(data);
    resolve(data);
    // apiPost(SIGNUP, data)
    //   .then(res => {
    //     console.log('INSIDE AUTHACTIONS RESPOMSE', res);

    //     store.dispatch({type: actionTypes.SAVE_USER_DATA, payload: data});
    //     resolve(res);
    //   })
    //   .catch(err => {
    //     console.log('INSIDE AUTHACTIONS ERROR', err);
    //     reject(err);
    //   });
  });
}

export function login(data = {}) {
  apiPost(LOGIN, {email: ''});
}
