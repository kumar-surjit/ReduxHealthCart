import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import navigationStrings from '../constants/navigationStrings';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationStrings.LandingPage}>
        {AuthStack()}
        {MainStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
