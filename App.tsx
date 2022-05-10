import React, {useCallback, useState} from "react";
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {ToggleThemeProvider} from "./ToggleThemeProvider"
import { useColorScheme } from "react-native";
import MainNavigator from "./MainNavigator";
const App = ()=>{
 const scheme = useColorScheme();
 const [theme, setTheme] = useState(scheme == "dark" ? DarkTheme :
DefaultTheme);
 const toggleTheme = useCallback(()=>{
 setTheme(({dark}) => {
 return dark ? DefaultTheme : DarkTheme;
 });
 }, []);
 return (<ToggleThemeProvider toggle = {toggleTheme}>
 <NavigationContainer theme = {theme}>
 <MainNavigator/>
 </NavigationContainer>
 </ToggleThemeProvider>);
}
export default App;
