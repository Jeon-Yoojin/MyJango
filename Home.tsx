import React from "react";
import {StyleSheet, SafeAreaView} from "react-native";
import {TopBar, View, Text, UnderlineText} from "./theme";
import {useNavigation} from "@react-navigation/native";
import { useCallback } from "react";


export default function Home(){
    const navigation = useNavigation();
 const goLeft =
useCallback(()=>navigation.navigate("Ingredients_add"),[]);
 const goRight =
useCallback(()=>navigation.navigate("Recipe_list"), []);

 return (
 <SafeAreaView style = {styles.safe}>
    <View style = {styles.view}>
        <TopBar>
            <UnderlineText onPress={goLeft} style = {styles.text}>Go Left</UnderlineText>
            <UnderlineText onPress={goRight} style = {styles.text}>Go Right</UnderlineText>
        </TopBar>
 <View style = {styles.view}>
 <UnderlineText style = {styles.text}>Mobile
Software</UnderlineText>
 <Text style = {styles.text}>Fall, 2021</Text>
 </View>
 </View>



 </SafeAreaView>);
}
const styles = StyleSheet.create({
 safe: {flex: 1},
 view: {flex:1, alignItems: "center", justifyContents: "spacebetween"},
 text: {fontSize: 20}
});