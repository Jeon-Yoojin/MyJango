import React from "react";
import type {FC} from "react";
import {StyleSheet, Switch} from "react-native";
import {useTheme} from "@react-navigation/native";
import {View} from "./View";
import type {ViewProps} from "./View";
import { useToggleThemeContext } from "../ToggleThemeProvider";

export type TopBarProps = ViewProps & {};
export const TopBar:FC<TopBarProps> = ({children, style, ...props}) => {
 const theme = useTheme();
 const toggleTheme = useToggleThemeContext();
 return (<View primary style = {[styles.topbar]} {...props}>
 {children}
 <Switch value={theme.dark} onValueChange={toggleTheme}/>
 </View>);
}
const styles = StyleSheet.create({
 topbar:{width: "100%", flexDirection: "row", padding: 5,
justifyContent: "flex-end"}
});