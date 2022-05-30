import React from "react";
import {StyleSheet, SafeAreaView, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { useCallback } from "react";


export default function Home(){
    const navigation = useNavigation();
    const goLeft =
useCallback(()=>navigation.navigate("DBtest"), []);

 const goRight =
useCallback(()=>navigation.navigate("Recipe_list"), []);
const goDBtest =
useCallback(()=>navigation.navigate("DBtest2"), []);

 return (
 <SafeAreaView style={styles.safe}>
    <View style={styles.view}>
    
            <Text style={styles.text} onPress={goLeft}>Go Left</Text>
            <Text onPress={goRight} style = {styles.text}>Go Right</Text>
            <Text onPress={goDBtest} style = {styles.text}>Go DBtest</Text>
     
 <View>

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
