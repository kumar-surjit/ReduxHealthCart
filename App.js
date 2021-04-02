import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Routes from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import actionTypes from './src/redux/actionTypes';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null)
        store.dispatch({
          type: actionTypes.LOGGED_IN,
          payload: {userData: jsonValue},
        });
      setTimeout(() => {
        SplashScreen.hide();
      });
    } catch (e) {
      console.log('could not get data ', e);
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
