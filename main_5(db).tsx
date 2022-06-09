import * as React from 'react';
import {SafeAreaView, View, Image, Text, TextInput, ScrollView} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import SQLite from 'react-native-sqlite-storage';
import { useEffect, useState} from 'react';

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

  
const [ItemList1, setItemList1] = useState([]);
const [ItemList2, setItemList2] = useState([]);
const [RecipeList1_1, setRecipeList1_1] = useState([]);
const [RecipeList1_2, setRecipeList1_2] = useState([]);
const [RecipeList1_3, setRecipeList1_3] = useState([]);
const [RecipeList1_4, setRecipeList1_4] = useState([]);
const [RecipeList2_1, setRecipeList2_1] = useState([]);
const [RecipeList2_2, setRecipeList2_2] = useState([]);
const [RecipeList2_3, setRecipeList2_3] = useState([]);
const [RecipeList2_4, setRecipeList2_4] = useState([]);

const [Item1_1_d, setItem1_1_d] = useState(Number);
const [Item1_2_d, setItem1_2_d] = useState(Number);
const [Item1_3_d, setItem1_3_d] = useState(Number);
const [Item1_4_d, setItem1_4_d] = useState(Number);
const [Item2_1_d, setItem2_1_d] = useState(Number);
const [Item2_2_d, setItem2_2_d] = useState(Number);
const [Item2_3_d, setItem2_3_d] = useState(Number);
const [Item2_4_d, setItem2_4_d] = useState(Number);
let a;

const date = new Date();
const day = date.getDate();

let db = SQLite.openDatabase({ name: 'recipe.db' });
//1
useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT name FROM ingredients ORDER BY expiration;',
    [], //유통기한 재료
    (tx, results) => {
      var temp = [];
      for (let i = 0; i < 4; ++i)
      temp.push(results.rows.item(i));
      setItemList1(temp);
    } ); }); }, []);
//1_1                
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList1[0]], //유통기한 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList1_1(temp);                
    } ); }); }, []);
//1_2               
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList1[1]], //유통기한 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList1_2(temp);                
    } ); }); }, []);
//1_3             
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList1[2]], //유통기한 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList1_3(temp);                
    } ); }); }, []);
//1_4               
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList1[3]], //유통기한 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList1_4(temp);                
    } ); }); }, []);
//2
useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT name FROM ingredients where bookmark = 1;',
    [], //즐찾 재료
    (tx, results) => {
      var temp = [];
      for (let i = 0; i < 4; ++i)
      temp.push(results.rows.item(i));
      setItemList2(temp);
    } ); }); }, []);
//2_1                
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList2[0]], //즐찾 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList2_1(temp);                
    } ); }); }, []);
//2_2               
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList2[1]], //즐찾 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList2_2(temp);                
    } ); }); }, []);
//2_3             
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList2[2]], //즐찾 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList2_3(temp);                
    } ); }); }, []);
//2_4               
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT name FROM recipe where ingredient = ?;`,                
    [ItemList2[3]], //즐찾 레시피                
    (tx, results) => {                    
      var temp = [];                    
      for (let i = 0; i < 2; ++i)                        
      temp.push(results.rows.item(i));                    
      setRecipeList2_4(temp);                
    } ); }); }, []);
//1_1_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList1[0]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem1_1_d(tem);                
    } ); }); }, []);
//1_2_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList1[1]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem1_2_d(tem);                
    } ); }); }, []);
//1_3_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList1[2]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem1_3_d(tem);                
    } ); }); }, []);
//1_4_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList1[3]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem1_4_d(tem);                
    } ); }); }, []);
//2_1_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList2[0]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem2_1_d(tem);                
    } ); }); }, []);
//2_2_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList2[1]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem2_2_d(tem);                
    } ); }); }, []);
//2_3_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList2[2]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem2_3_d(tem);                
    } ); }); }, []);
//2_4_d    
useEffect(() => {        
  db.transaction((tx) => {
    tx.executeSql(`SELECT expiration FROM ingredients where name = ?;`,                
    [ItemList2[3]], //유통기한                
    (tx, results) => {                    
      var temp = [];  
      for (let i = 0; i < 1; ++i)                    
      temp.push(results.rows.item(i));
      temp[0].slice(8,9);
      var tem = 0;
      tem = day - parseInt(temp[0]);
      setItem2_4_d(tem);                
    } ); }); }, []);

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

<ScrollView horizontal={true} showsHorizontalScrollIndicator = {false} style={style.temp04}>
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>{RecipeList1_1[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList1_1[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList1[0]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item1_1_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>{RecipeList1_2[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList1_2[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList1[1]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item1_2_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>{RecipeList1_3[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList1_3[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList1[2]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item1_3_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>{RecipeList1_4[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList1_4[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList1[3]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item1_4_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
</ScrollView>


  <View style={style.temp04}> 
  <Pressable onPress={() => navigation.navigate('RECIPE_LIST')}><Text style={style.TitleText2}>즐겨찾는 재료{'>'}</Text></Pressable>
  </View>

  <ScrollView horizontal={true} showsHorizontalScrollIndicator = {true} style={style.temp04}>
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>{RecipeList2_1[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList2_1[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList2[0]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item2_1_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_2}>
    <Text style={style.expireddate4_1}>{RecipeList2_2[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList2_2[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList2[1]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item2_2_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4_3}>
    <Text style={style.expireddate4_1}>{RecipeList2_3[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList2_3[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList2[2]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item2_3_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
  <View style={style.expireddate4}>
    <Text style={style.expireddate4_1}>{RecipeList2_4[0]}</Text>
    <Text style={style.expireddate4_1}>{RecipeList2_4[1]}</Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{ItemList2[3]}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{Item2_4_d}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </View>
</ScrollView>

  <View style = {{position:"absolute", right:20, top:650}}>
  <Pressable onPress={() => navigation.navigate('INGREDIENTS_ADD')}><Text style={style.expireddate5}>+</Text></Pressable>
  </View> 

 </SafeAreaView>
 );
};
export default Main;
