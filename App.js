import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NavBar from './src/ingredients_mg/NavBar'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/main/Main';
import ManagePage from './src/ingredients_mg/ManagePage';
import Ingredients_add from './src/ingredients_add/ingredients_add';
import Recipe_list from './src/recipe_list/recipe_list';
import RecipeDetail from './src/recipe_detail/recipe_detail';
import Community from './src/community/Community';
import Tesseract from './src/ingredients_add/Tesseract';
import Ingredients_modify from './src/ingredients_add/ingredient_modify';
import SearchDate from './src/recipe_list/user/SearchDate';
import SearchLike from './src/recipe_list/user/SearchLike';

const Stack = createStackNavigator();

function App() {
  /*useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    console.log('실행중')

    return unsubscribe;

  }, []);
  */

  /*
  return(
    <View>
    <Text>{screenMode}</Text>
    <Button onPress={()=>{changeScreenMode('changemode')}}></Button>
    </View>
  )
  */
  
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MAIN" component={Main}
          options={{
            title: '메인화면'
        }}/>
        <Stack.Screen name="MANAGE" component={ManagePage} 
          options={{
            title: '재료 관리'
        }}/>
        <Stack.Screen name="RECIPE_LIST" component={Recipe_list} 
          options={{
            title: '레시피 목록'
        }}/>
        <Stack.Screen name="RECIPE_DETAIL" component={RecipeDetail} 
          options={{
            title: '레시피 상세'
        }}/>
        <Stack.Screen name="COMMUNITY" component={Community} 
          options={{
            title: '커뮤니티'
        }}/>
        <Stack.Screen name="INGREDIENTS_ADD" component={Ingredients_add} 
          options={{
            title: '재료추가'
        }}/>
        <Stack.Screen name="INGREDIENTS_MODIFY" component={Ingredients_modify} 
          options={{
            title: '재료수정'
        }}/>
        <Stack.Screen name="TESSERACT" component={Tesseract} 
          options={{
            title: 'OCR'
        }}/>
        <Stack.Screen name="SEARCH_DATE" component={SearchDate} 
          options={{
            title: 'date'
        }}/>
        <Stack.Screen name="SEARCH_LIKE" component={SearchLike} 
          options={{
            title: 'date'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;