import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationStrings from '../constants/navigationStrings';
import {Login, SignUp, LandingPage, AuthPage} from '../Screens';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SignUp}
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.LandingPage}
        component={LandingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.AuthPage}
        component={AuthPage}
        options={{headerShown: false}}
      />
    </>
  );
}
