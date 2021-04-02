import store from '../store';
import actionTypes from '../actionTypes';
import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {PROFILES, SEARCHPROFILE} from '../../config/urls';

const {dispatch} = store;

export function getProfiles(data) {
  return new Promise((resolve, reject) => {
    apiPost(PROFILES, data)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_PROFILES,
          payload: {profiles: res.data},
        });
        resolve(res);
      })
      .catch(err => reject(err));
  });
}

export function searchProfile(queryParams) {
  return new Promise((resolve, reject) => {
    apiGet(SEARCHPROFILE + queryParams, {})
      .then(res => {
        console.log('ACTION RESPONSE: ', res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
        console.log('ACTION ERROR: ', err);
      });
  });
}
