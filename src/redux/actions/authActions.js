import {apiGet, apiPost, apiPut, apiDelete} from '../../utils/utils';
import {LOGIN, SIGNUP} from '../../config/urls';
import {dispatch, getState} from '../store';

export function signUp(
  data = {
    email: 'asbjia@fasdd.asd',
    languageCode: 'EN',
    signupType: 'APP',
    name: 'sadbidja',
    password: 'asddsddiasd',
  },
) {
  return new Promise((resolve, reject) => {
    apiPost(SIGNUP, data)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export function login(data = {}) {
  apiPost(LOGIN, {email: ''});
}
