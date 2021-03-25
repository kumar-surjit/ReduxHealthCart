import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Routes from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import actionTypes from './src/redux/actionTypes';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      // console.log('inside getData', jsonValue);
      // console.log(jsonValue);
      // alert(jsonValue);
      if (jsonValue != null)
        store.dispatch({
          type: actionTypes.LOGGED_IN,
          payload: {userData: jsonValue},
        });
      // console.log('got this value from Async Storage: ', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('could not get data ', e);
      return null;
    }
  };
  render() {
    return (
      <Provider store={store}>
        <Routes />
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
