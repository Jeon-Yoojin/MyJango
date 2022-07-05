import React from 'react';
import {SafeAreaView, View, Text, Button, TextInput, ScrollView, Image, Dimensions} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";


const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "red", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp01 : {backgroundColor:Colors.red200, alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp02 : {backgroundColor:Colors.indigo200, alignContent:"center", flexDirection: "row", padding:5},
 temp03 : {backgroundColor:Colors.yellow400, alignContent:"center", flexDirection: "row"},
 expireddate : {borderWidth:1},

cameraview : { width:300, height:300},
  TitleText: {textAlign : "center", fontWeight : 'bold', margin : 20, fontSize: 20},
  textInputStyle: {color: "green", width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:2}
 })

const App = () => {
 return (
 <SafeAreaView>
    <View style={style.temp01}>
      <Text style = {style.TitleText} >My JangGo</Text>
    </View>
 
 <View style={style.temp02}>  
 <TextInput style={style.textInputStyle}
      placeholder = "원하는 레시피를 검색해보세요"
      onChangeText = {(text: string) => {console.log(text);}}
      onFocus = {() => {console.log("On Focus");}}
      onBlur = {() => {console.log("On Blur");}}
      onEndEditing = {() => {console.log("Edit End!");}}
      keyboardType = "default"/> 
  </View>

  <View style={style.temp03}> 
    <Text style={style.expireddate}>재료 관리</Text>
    <Text style={style.expireddate}>레시피 추천</Text>
    <Text style={style.expireddate}>커뮤니티</Text>  
  </View>
  
  <View style={style.temp03}> 
    <Text style={style.TitleText}>유통기한 임박</Text> 
  </View>

 
 
  <View style={style.temp03}> 
  <Text style={style.expireddate}>식재료1</Text>
  <Text style={style.expireddate}>식재료2</Text>
  <Text style={style.expireddate}>식재료3</Text>  
  </View>

  <View style={style.temp03}> 
    <Text style={style.TitleText}>즐겨찾는 재료</Text> 
  </View>

 
 
  <View style={style.temp03}> 
  <Text style={style.expireddate}>식재료1</Text>
  <Text style={style.expireddate}>식재료2</Text>
  <Text style={style.expireddate}>식재료3</Text>  
  </View>

  <View style = {{position:"absolute", right:25, top:527}}>
  <Text style={style.expireddate}>추가</Text>
  </View> 

 </SafeAreaView>
 );
};
export default App;
