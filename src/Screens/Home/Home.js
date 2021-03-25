import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../../constants/navigationStrings';
import {HomeTab, Profile, Profiles} from '../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import {Image} from 'react-native';
import imagePath from '../../constants/imagePath';

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
      <Tab.Screen
        name={navigationStrings.Profiles}
        component={Profiles}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={imagePath.ic_home}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              tintColor={color}
            />
          ),
          tabBarLabel: 'Profiles',
        }}
      />
    </Tab.Navigator>
  );
}
