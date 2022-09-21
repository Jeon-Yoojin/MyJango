import * as React from 'react';
import {SafeAreaView, View, Image, Text, TextInput, ScrollView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {Colors} from "react-native-paper";
import {StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FindRecipe from '../recipe_list/FindRecipe';
import LinearGradient from 'react-native-linear-gradient';
//npm install react-native-linear-gradient --save

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
 expireddate4 : {position:'relative',right:140, width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate4_1 : {textAlign : "center", width: 65, margin: 2, padding:3},
 expireddate4_2 : {position:'relative',right:270,width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate4_3 : {position:'relative',right:400,width: 140, height: 150, borderRadius:20, padding: 10, marginRight: 10},
 expireddate5 : {color:"red", fontSize:45, textAlign : "center", backgroundColor: "white", shadowColor: Colors.black, alignContent:'center', alignItems:'center', justifyContent:'center',
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
 Img3:{height: 35, width: 30, tintColor:'#9C27B0'},
  Icon: {
    backgroundColor: "white", shadowColor: Colors.black, alignContent: 'center', alignItems: 'center', justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, elevation: 5, width: 65, height: 65, borderRadius: 100, marginRight: 10
  }
}
)



const Main = ({ navigation }) => {
  const isFocused = useIsFocused()

  const [NearItemList, setNearItemList] = useState([]);
  const [BMItemList, setBMItemList] = useState([]);

  const [RecipeList, setRecipeList] = useState([]);

  let db = SQLite.openDatabase({ name: 'recipe.db'});
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ingredients ORDER BY expiration;`,
            //유통기한 임박순으로 정렬함
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i){
                        temp.push(results.rows.item(i));
                    }
                    setNearItemList(temp);
                }
            );
        });
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM ingredients WHERE bookmark=1;`,
              [],
              (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i){
                      temp.push(results.rows.item(i));
                  }
                  setBMItemList(temp);
              }
          );
      });
    }, [isFocused]);

    /*
    let db2 = SQLite.openDatabase({ name: 'recipe.db' });
    useEffect(() => {
        db2.transaction((tx) => {
            tx.executeSql('SELECT name FROM recipe where ingredient = "두부";',
            //유통기한 임박순으로 정렬함
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < 3; ++i)
                        temp.push(results.rows.item(i));
                    setRecipeList(temp);
                }
            );
        });
    }, []);
    */
    var recipe_db = SQLite.openDatabase({ name: 'db.sqlite'});

    /*
  const searchWith = (IngList) => {
    let query = 'SELECT B.name, C.recipe_count FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
      query = query + " trim(A.ingredient_name) = "+"\'"+ String(IngList)+"\'";
    query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";

    recipe_db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < 2; ++i) {
             temp.push(results.rows.item(i).name);
          }
          setRecipeList(temp)
        }       
      );
    });
    
  }
  useState(()=>{searchWith('미나리')},[])
  console.log(RecipeList)
  */

    function getDday(expiration) {
      if(expiration==0) return 0;
      var today = new Date();
      today = new Date(today.getFullYear(), (today.getMonth()+1), today.getDate())
      //console.log('month: ', today.getMonth(), 'day: ', today.getDate())
      var dday = new Date(expiration.split('-')[0], expiration.split('-')[1], expiration.split('-')[2]);
      var gap = dday.getTime()-today.getTime();
      var day = Math.ceil(gap/(1000*60*60*24));

      return day;
  }
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
<ScrollView horizontal={true} showsHorizontalScrollIndicator = {false}>
<Image source={{uri: "https://i.ibb.co/JKvqXQw/2022-09-21-173622.png"}} style={{width:140, height:150, borderRadius:20}}/> 
<LinearGradient style={style.expireddate4} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
    <Text style={style.expireddate4_1}></Text>
    <Text style={style.expireddate4_1}></Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{NearItemList[0]? NearItemList[0].name:''}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{getDday(NearItemList[0]?NearItemList[0].expiration:0)}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </LinearGradient>
  
  <Image source={{uri:"https://i.ibb.co/zxBCvKZ/2022-09-21-172717.png"}} style={{position:'relative',right:130, width:140, height:150, borderRadius:20}}/> 
    <LinearGradient style={style.expireddate4_2} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
    <Text style={style.expireddate4_1}></Text>
    <Text style={style.expireddate4_1}></Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{NearItemList[1]? NearItemList[1].name:''}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{getDday(NearItemList[1]?NearItemList[1].expiration:0)}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </LinearGradient>
  
  <Image source={{uri:"https://i.ibb.co/mRYVqhh/2022-09-21-173123.png"}} style={{position:'relative',right:260, width:140, height:150, borderRadius:20}}/> 
  <LinearGradient style={style.expireddate4_3} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
    <Text style={style.expireddate4_1}></Text>
    <Text style={style.expireddate4_1}></Text>
    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10}}>{NearItemList[2]? NearItemList[2].name:''}</Text>
    <Text style={{fontSize: 18, color:"white"}}>D-{getDday(NearItemList[2]?NearItemList[2].expiration:0)}</Text>
    <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle}/>
  </LinearGradient>
</ScrollView>
</View>


  <View style={style.temp04}> 
  <Pressable onPress={() => navigation.navigate('RECIPE_LIST')}><Text style={style.TitleText2}>즐겨찾는 재료{'>'}</Text></Pressable>
  </View>
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
       <View style={style.temp04}>
       <Image source={{uri:"https://i.ibb.co/G9RWGrF/2022-09-21-173802.png"}} style={{width:140, height:150, borderRadius:20}}/>
        <LinearGradient style={style.expireddate4} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
           <Text style={style.expireddate4_1}></Text>
           <Text style={style.expireddate4_1}></Text>
           <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10 }}>{BMItemList[0]? BMItemList[0].name:''}</Text>
           <Text style={{ fontSize: 18, color: "white" }}>D-{getDday(BMItemList[0]?BMItemList[0].expiration:0)}</Text>
           <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle} />
         </LinearGradient>

        <Image source={{uri:"https://i.ibb.co/NjvszC1/2022-09-21-174042.png"}} style={{position:'relative',right:130, width:140, height:150, borderRadius:20}}/> 
        <LinearGradient style={style.expireddate4_2} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
          <Text style={style.expireddate4_1}></Text>
           <Text style={style.expireddate4_1}></Text>
           <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10 }}>{BMItemList[1]? BMItemList[1].name:''}</Text>
           <Text style={{ fontSize: 18, color: "white" }}>D-{getDday(BMItemList[1]?BMItemList[1].expiration:0)}</Text>
           <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle} />
         </LinearGradient>
         
        <Image source={{uri:"https://i.ibb.co/x5BbyXy/2022-09-21-174148.png"}} style={{position:'relative',right:260, width:140, height:150, borderRadius:20}}/> 
        <LinearGradient style={style.expireddate4_3} colors={[ 'rgba(255,251,237,0.3)','rgba(255,224,130,0.8)','#EFBC22']}>
           <Text style={style.expireddate4_1}></Text>
           <Text style={style.expireddate4_1}></Text>
           <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginTop: 10 }}>{BMItemList[2]? BMItemList[2].name:''}</Text>
           <Text style={{ fontSize: 18, color: "white" }}>D-{getDday(BMItemList[2]?BMItemList[2].expiration:0)}</Text>
           <Icon name="triangle-right" size={50} color={Colors.white} style={style.triangle} />
         </LinearGradient>
       </View>
     </ScrollView>

  <View style = {{position:"absolute", right:20, top:650}}>
  <Pressable onPress={() => navigation.navigate('INGREDIENTS_ADD')}><Text style={style.expireddate5}>+</Text></Pressable>
  </View> 
  <View style = {{position:"absolute", right:20, top:580}}>
  <Pressable style={[{justifyContent:'center', alignItems:'center', alignContent:'center'}, style.expireddate5]} onPress={() => navigation.navigate('TESSERACT')}><MaterialCommunityIcons size={35} name="camera" style={[{justifyContent:'center', alignItems:'center', color:"red",}]}/></Pressable>
  </View> 

 </SafeAreaView>
 );
};
export default Main;
