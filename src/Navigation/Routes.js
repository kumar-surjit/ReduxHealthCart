import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import navigationStrings from '../constants/navigationStrings';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function Routes() {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  console.log('USE SELECTOR : ', isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationStrings.LandingPage}>
        {isLoggedIn ? MainStack() : AuthStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
