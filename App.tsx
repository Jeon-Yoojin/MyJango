import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './Main';
import Ingredients_1 from './Ingredients_1';
import Ingredients_2 from './Ingredients_2';
import Recipe_1 from './Recipe_1';
import Recipe_2 from './Recipe_2';
import Community from './Community';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Ingredients_1" component={Ingredients_1} />
        <Stack.Screen name="Ingredients_2" component={Ingredients_2} />
        <Stack.Screen name="Recipe_1" component={Recipe_1} />
        <Stack.Screen name="Recipe_2" component={Recipe_2} />
        <Stack.Screen name="Community" component={Community} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
