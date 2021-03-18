import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import navigationStrings from '../constants/navigationStrings';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationStrings.SignUp}>
        {AuthStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
