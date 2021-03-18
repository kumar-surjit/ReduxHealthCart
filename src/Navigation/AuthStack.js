import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationStrings from '../constants/navigationStrings';
import {Login, SignUp} from '../Screens';

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
    </>
  );
}
