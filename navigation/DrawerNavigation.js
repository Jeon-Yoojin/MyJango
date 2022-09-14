import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ModalFriends from '../community/ModalFriends';
import Main from '../main/Main';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigation(){
  return (
    <Drawer.Navigator
      drawerContent={props=><CustomDrawer {...props} />}
      drawerPosition='left'
      backBehavior='history'
      screenOptions={{
        drawerActiveBackgroundColor: '#fb8c00',
        drawerActiveTintColor: 'white',
        headerTransparent: true
      }}>
      <Drawer.Screen name="Main" component={Main} options={{title: 'Home', headerTitle: ''}}/>
      <Drawer.Screen name="ModalFriends" component={ModalFriends} options={{title: '친구관리', headerShown: false}}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
