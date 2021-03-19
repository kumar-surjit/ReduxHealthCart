import React from 'react';
import {Home} from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.Home}
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={navigationStrings.ProductDetails}
        component={ProductDetails}
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
        name={navigationStrings.OrderConfirm}
        component={OrderConfirm}
        options={{
          headerShown: false,
          title: 'Order Placed',
          headerTitleStyle: {left: -18, fontSize: 17},
        }}
      /> */}
    </>
  );
}
