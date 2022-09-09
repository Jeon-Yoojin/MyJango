import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {View, Text, Button} from 'react-native';

import ModalFriends from '../community/ModalFriends';
import Main from '../main/Main';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

function ShoppingList(){
  return(
    <View>
      <Text>장보기 리스트</Text>
      <Button title="뒤로가기" onPress={()=>navigation.goBack()}></Button>
    </View>
  )
}

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
      }}
    >
      <Drawer.Screen name="Main" component={Main} options={{title: 'Home', headerTitle: ''}}/>
      <Drawer.Screen name="ModalFriends" component={ModalFriends} options={{title: '친구관리', headerShown: false}}/>
      <Drawer.Screen name="ShoppingList" component={ShoppingList} options={{title: '장보기 리스트', headerShown: false}}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;