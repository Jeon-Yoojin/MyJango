import React from "react";
import type {FC, ComponentProps} from "react";
import {Text as RNText} from "react-native";
import {useTheme} from "@react-navigation/native";
export type TextProps = ComponentProps<typeof RNText>;
export const Text: FC<TextProps> = ({style, ...props}) => {
 const {colors} = useTheme();
 return <RNText style = {[{color: colors.text}, style]}
{...props}/>;
}
export const UnderlineText: FC<TextProps> = ({style, ...props}) => {
 const {colors} = useTheme();
 return (<RNText style = {[{
 textDecorationLine: "underline",
 color: colors.text,
 textDecorationColor: colors.text
 }, style]} {...props}/>);
}