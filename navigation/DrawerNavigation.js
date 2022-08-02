import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {View, Text, Button} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}){
  return(
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={()=>navigation.openDrawer()}></Button>
      <Button
        title="Setting 열기"
        onPress={()=>navigation.navigate('Setting')}
      />
    </View>
  )
}

function SettingScreen({navigation}){
  return(
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={()=>navigation.goBack()}></Button>
    </View>
  )
}

function App(){
  return (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName='Home'
      drawerPosition='left'
      backBehavior='history'
      screenOptions={{
        drawerActiveBackgroundColor: '#fb8c00',
        drawerActiveTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{title: '홈'}}/>
      <Drawer.Screen name="Setting" component={SettingScreen} options={{title: '설정'}}/>
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

export default DrawerNavigation;