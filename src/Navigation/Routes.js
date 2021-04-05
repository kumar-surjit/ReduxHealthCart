import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import navigationStrings from '../constants/navigationStrings';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.authReducer.userData);
  console.log('USE SELECTOR : ', userData);
  return (
    <NavigationContainer>
      {userData !== null ? MainStack() : AuthStack()}
    </NavigationContainer>
  );
}
