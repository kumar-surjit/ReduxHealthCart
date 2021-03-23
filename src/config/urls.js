const API_BASE_URL = 'http://192.168.99.194:8002';
const getUrl = endpoint => API_BASE_URL + endpoint;
export const LOGIN = getUrl('/user/loginUser');
export const SIGNUP = getUrl('/user/registerUser');
export const PHONELOGIN = 'https://api.talktier.com/user/v1/loginSignupOtp';
