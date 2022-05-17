import React from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import {BottomNavigation, Colors} from "react-native-paper";
import {StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import Main from ./Main
import Ingredients_1 from ./Ingredients_1
import Ingredients_2 from ./Ingredients_2
import Recipe_1 from ./Recipe_1
import Recipe_2 from ./Recipe_2
import Community from ./Community

const Navigator = () => {
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen
          name="Main"
          component={Main}
        />
        <Stack.Screen
          name="Ingredients_1"
          component={Ingredients_1}
        />
        <Stack.Screen
          name="Ingredients_2"
          component={Ingredients_2}
        />
        <Stack.Screen
          name="Recipe_1"
          component={Recipe_1}
        />
        <Stack.Screen
          name="Recipe_2"
          component={Recipe_2}
        />
        <Stack.Screen
          name="Community"
          component={Community}
        />
    </Stack.Navigator>
</NavigationContainer>
);
}


const style = StyleSheet.create({
 mainViewStyle: {backgroundColor: Colors.red400, alignContent:"center", flexDirection: "row", justifyContent:"center", borderBottomLeftRadius: 30, borderBottomRightRadius: 30},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp02 : {position: "relative", left: 20, top:-25, width : 350, height : 50, borderRadius: 10, backgroundColor: "white", alignContent:"center", padding:5, justifyContent:"center"},
 temp03 : {position: "relative", alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp04 : {position: "relative", flexDirection: "row", padding: 15, paddingBottom: 0},
 expireddate1 : {backgroundColor: Colors.blue50, width: 100, height: 65, margin:10, padding:10, borderRadius:20},
 expireddate2 : {backgroundColor: Colors.yellow50, width: 100, height: 65, margin:10, padding:10, borderRadius:20},
 expireddate3 : {backgroundColor: Colors.purple50, width: 100, height: 65, margin:10, padding:10, borderRadius:20},
 expireddate4 : {backgroundColor: Colors.yellow600, width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate4_1 : {color:"white", borderColor: "white",textAlign : "center", width: 65, borderRadius:15,borderWidth: 1, margin: 2, padding:3},
 expireddate4_2 : {backgroundColor: Colors.red400, width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate4_3 : {backgroundColor: Colors.green500, width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate5 : {color:"red", fontSize:45, textAlign : "center", backgroundColor: "white", shadowColor: Colors.black,
 shadowOffset: {
   width: 0,
   height: 2,
 },
 shadowOpacity: 1, elevation: 5, width: 65, height: 65, borderRadius:100, marginRight: 10},
 triangle: {position: "relative", left:90, top: -20, width: 25, height: 25, backgroundColor: "white"},
 menutext: {fontWeight:'bold', width: 120, flexDirection: "row", fontSize: 17, alignContent:"center", justifyContent:"center", textAlign : "center"},
 TitleText: {textAlign : "center", fontWeight : 'bold', margin : 30, fontSize: 30, color: "white"},
 textInputStyle: {position: "relative", left: 35, top:0, width : 300, height : 50, backgroundColor: "white", margin:2, fontSize: 15},
 TitleText2: {fontSize: 20, fontWeight : 'bold'}
})


const App = () => {
 return (
 <SafeAreaView>
    <View style={style.mainViewStyle}>
      <Text style = {style.TitleText} >My JangGo</Text>
    </View>
 
 <View style={style.temp02}>  
 <TextInput style={style.textInputStyle}
      placeholder = "원하는 레시피를 검색해보세요."
      onChangeText = {(text: string) => {console.log(text);}}
      onFocus = {() => {console.log("On Focus");}}
      onBlur = {() => {console.log("On Blur");}}
      onEndEditing = {() => {navigation.navigate('Recipe_1')}}
      keyboardType = "default"/> 
  </View>

  <View style={style.temp03}> 
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Text style={style.expireddate1}>그림</Text></Pressable>
    <Pressable onPress={() => navigation.navigate('Recipe_1')}><Text style={style.expireddate1}>그림</Text></Pressable>
    <Pressable onPress={() => navigation.navigate('Community')}><Text style={style.expireddate1}>그림</Text></Pressable>
  </View>
  <View style={style.temp03}> 
    <Text style={style.menutext}>재료 관리</Text>
    <Text style={style.menutext}>레시피 추천</Text>
    <Text style={style.menutext}>커뮤니티</Text>  
  </View>


  <View style={style.temp04}> 
  <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Text style={style.TitleText2}>유통기한 임박{'>'}</Text></Pressable> 
  </View>

<View style={style.temp04}> 
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>돼지고기</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
  
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>두부</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>미나리</Text>
    <Text style={style.expireddate4_1}>미나리국</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>미나리</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
</View>


  <View style={style.temp04}> 
    <Text style={style.TitleText2}>즐겨찾는 재료{'>'}</Text> 
  </View>

<View style={style.temp04}> 
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>돼지고기</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
  
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>두부</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>미나리</Text>
    <Text style={style.expireddate4_1}>미나리국</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>미나리</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Pressable onPress={() => navigation.navigate('Ingredients_1')}><Icon name={triangle_right} size={30} color={Colors.white} style={{margin:5}}/></Pressable>
  </View>
</View>

  <View style = {{position:"absolute", right:20, top:650}}>
  <Pressable onPress={() => navigation.navigate('Ingredients_2')}><Text style={style.expireddate5}>+</Text></Pressable>
  </View> 

 </SafeAreaView>
 );
};
export default App;
