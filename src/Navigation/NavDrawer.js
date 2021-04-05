import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import {Profile, Profiles} from '../Screens';
import colors from '../styles/colors';

const Drawer = createDrawerNavigator();

export default function NavDrawer() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{activeTintColor: colors.themeGreen}}>
      <Drawer.Screen
        name={navigationStrings.TabRoutes}
        component={TabRoutes}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name={navigationStrings.ProfileTab}
        component={Profile}
        options={{drawerLabel: 'Profile'}}
      />
      <Drawer.Screen
        name={navigationStrings.Profiles}
        component={Profiles}
        options={{drawerLabel: 'Profiles'}}
      />
    </Drawer.Navigator>
  );
}
