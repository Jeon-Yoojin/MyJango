import React, {useCallback, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import NavBar from "./NavBar";
const App = ()=>{
 
 return (
 <NavigationContainer>
 <MainNavigator/>
 <NavBar></NavBar>
 </NavigationContainer>
 );
}
export default App;


