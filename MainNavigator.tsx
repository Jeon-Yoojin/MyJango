import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./Home";
import Ingredients_add from "./ingredients_add";
import Recipe_list from "./recipe_list";
import { MonthlyCalendar } from "./MonthlyCalendar";

const Stack = createStackNavigator();
export default function MainNavigator(){
 return (<Stack.Navigator>
 <Stack.Screen name = "Home" component = {Home}/>
 <Stack.Screen name = "Ingredients_add" component ={Ingredients_add}/>
 <Stack.Screen name = "Recipe_list" component ={Recipe_list}/>
 <Stack.Screen name = "MonthlyCalendar" component ={MonthlyCalendar}/>
 </Stack.Navigator>);
}