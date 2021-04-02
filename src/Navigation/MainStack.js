import React from 'react';
import {Cart, SearchProfiles} from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import {createStackNavigator} from '@react-navigation/stack';
import TabRoutes from './TabRoutes';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.TabRoutes}
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.Cart}
        component={Cart}
        options={{
          headerShown: true,
          title: 'SHOPPING BAG',
          headerTitleStyle: {left: -18, fontSize: 17},
        }}
      />
      <Stack.Screen
        name={navigationStrings.SearchProfiles}
        component={SearchProfiles}
        options={{
          headerShown: false,
        }}
      />
    </>
  );
}
