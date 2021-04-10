import store from '../store';
import actionTypes from '../actionTypes';
import {apiPost, apiGet} from '../../utils/utils';
import {CHATMESSAGES, CHATCONVERSATIONS} from '../../config/urls';

export function getConversations(query) {
  return new Promise((resolve, reject) => {
    apiGet(CHATCONVERSATIONS + query, {})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getMessages(query) {
  return new Promise((resolve, reject) => {
    apiGet(CHATMESSAGES + query, {})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
