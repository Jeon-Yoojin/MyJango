import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../main/Main';
import ManagePage from '../ingredients_mg/ManagePage';
import Ingredients_add from '../ingredients_add/ingredient_add';
import Recipe_list from '../recipe_list/recipe_list';
import RecipeDetail from '../recipe_detail/recipe_detail';
import Community from '../community/Community';
import Tesseract from '../ingredients_add/Tesseract';
import Ingredients_modify from '../ingredients_add/ingredient_modify';
import SearchDate from '../recipe_list/user/SearchDate';
import SearchLike from '../recipe_list/user/SearchLike';
import ModalFriends from '../community/ModalFriends';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return(
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
            title: '재료 추가'
        }}/>
        <Stack.Screen name="INGREDIENTS_MODIFY" component={Ingredients_modify} 
          options={{
            title: '재료 수정'
        }}/>
        <Stack.Screen name="MODAL_FRIENDS" component={ModalFriends} 
          options={{
            title: '친구 추가'
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

  );
};

export default StackNavigator;
