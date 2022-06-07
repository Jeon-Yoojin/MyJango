import * as React from 'react';
import {SafeAreaView, View, Image, Text, TextInput} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';

const MainLogo = require('../../android/app/src/main/assets/images/MainLogo.png');

const ChatFillPath = require('../../android/app/src/main/assets/images/chat-fill.png');
const FridgeFillPath = require('../../android/app/src/main/assets/images/fridge-fill.png');
const HomeFillPath = require('../../android/app/src/main/assets/images/home-fill.png');
const LightbulbFillPath = require('../../android/app/src/main/assets/images/lightbulb-fill.png');

const style = StyleSheet.create({
 mainViewStyle: {backgroundColor: Colors.red400, alignContent:"center", flexDirection: "row", justifyContent:"center", borderBottomLeftRadius: 30, borderBottomRightRadius: 30},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp02 : {position: "relative", left: 20, top:-10, width : 350, height : 50, borderRadius: 10, backgroundColor: "white", alignContent:"center", padding:5, justifyContent:"center"},
 temp03 : {position: "relative", alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp04 : {position: "relative", flexDirection: "row", padding: 15, paddingBottom: 0},
 expireddate1 : {textAlign : "center", backgroundColor: Colors.blue50, width: 100, height: 65, margin:10, borderRadius:20},
 expireddate2 : {textAlign : "center", backgroundColor: Colors.yellow50, width: 100, height: 65, margin:10, borderRadius:20},
 expireddate3 : {textAlign : "center", backgroundColor: Colors.purple50, width: 100, height: 65, margin:10, borderRadius:20},
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
 triangle: {position:"relative", left:80, top:-40},
 menutext: {fontWeight:'bold', width: 120, flexDirection: "row", fontSize: 17, alignContent:"center", justifyContent:"center", textAlign : "center"},
 TitleText: {textAlign : "center", fontWeight : 'bold', margin : 30, color: "white", fontSize: 45},
 textInputStyle: {position: "relative", left: 35, top:-17.5, width : 300, height : 50, backgroundColor: "white", margin:2, fontSize: 15},
 TitleText2: {fontSize: 20, fontWeight : 'bold'},
 mainlogo:{height: 28, width: 170, margin: 20},
 Img1:{height: 35, width: 30, tintColor:'#3949AB'},
 Img2:{height: 35, width: 30, tintColor:'#FDD835'},
 Img3:{height: 35, width: 30, tintColor:'#9C27B0'}
}
)


const Main = ({ navigation }) => {
 return (

 <SafeAreaView>
    <View style={style.mainViewStyle}>
      <Text style = {style.TitleText}><Image style={style.mainlogo} source={MainLogo}/></Text>
    </View>
 
 <View style={style.temp02}>
 <Icon2 name="search" size={35} color={Colors.red100} style={{position:"relative", top:28}}/> 
 <TextInput style={style.textInputStyle}
      placeholder = "원하는 레시피를 검색해보세요."
      onChangeText = {(text) => {console.log(text);}}
      onFocus = {() => {console.log("On Focus");}}
      onBlur = {() => {console.log("On Blur");}}
      keyboardType = "default"/> 
  </View>

  <View style={style.temp03}> 
  <Pressable onPress={() => navigation.navigate('MANAGE')}><Text style={style.expireddate1}><Image style={style.Img1} source={FridgeFillPath}/></Text></Pressable>
  <Pressable onPress={() => navigation.navigate('RECIPE_LIST')}><Text style={style.expireddate2}> <Image style={style.Img2} source={LightbulbFillPath}/></Text></Pressable>
  <Pressable onPress={() => navigation.navigate('COMMUNITY')}><Text style={style.expireddate3}><Image style={style.Img3} source={ChatFillPath}/></Text></Pressable>
  </View>
  <View style={style.temp03}> 
    <Text style={style.menutext}>재료 관리</Text>
    <Text style={style.menutext}>레시피 추천</Text>
    <Text style={style.menutext}>커뮤니티</Text>  
  </View>


  <View style={style.temp04}> 
  <Pressable onPress={() => navigation.navigate('RECIPE_LIST')}><Text style={style.TitleText2}>유통기한 임박{'>'}</Text></Pressable>
  </View>

<View style={style.temp04}> 
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>돼지고기</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>두부</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>미나리</Text>
    <Text style={style.expireddate4_1}>미나리국</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>미나리</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
</View>


  <View style={style.temp04}> 
  <Pressable onPress={() => navigation.navigate('RECIPE_LIST')}><Text style={style.TitleText2}>즐겨찾는 재료{'>'}</Text></Pressable>
  </View>

<View style={style.temp04}> 
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>돼지고기</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>마파 두부</Text>
    <Text style={style.expireddate4_1}>두부조림</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>두부</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>미나리</Text>
    <Text style={style.expireddate4_1}>미나리국</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>미나리</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-2</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
</View>

  <View style = {{position:"absolute", right:20, top:650}}>
  <Pressable onPress={() => navigation.navigate('INGREDIENTS_ADD')}><Text style={style.expireddate5}>+</Text></Pressable>
  </View> 

 </SafeAreaView>
 );
};
export default Main;