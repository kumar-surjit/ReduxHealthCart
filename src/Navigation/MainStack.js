import React from 'react';
import {
  Cart,
  SearchProfiles,
  ViewImage,
  QrScanner,
  Messages,
  ChatRoom,
} from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import {createStackNavigator} from '@react-navigation/stack';
import TabRoutes from './TabRoutes';
import NavDrawer from './NavDrawer';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.NavDrawer}
        component={NavDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ViewImage}
        component={ViewImage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.Messages}
        component={Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ChatRoom}
        component={(Messages, ChatRoom)}
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
      <Stack.Screen
        name={navigationStrings.QrScanner}
        component={QrScanner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
