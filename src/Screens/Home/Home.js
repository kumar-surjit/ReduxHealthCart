import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../../constants/navigationStrings';
import {HomeTab, Profile} from '../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: colors.themeGreen,
      }}>
      <Tab.Screen
        name={navigationStrings.HomeTab}
        component={HomeTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="shopping" color={color} size={28} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={navigationStrings.ProfileTab}
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={28}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
