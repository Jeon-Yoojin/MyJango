import React from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";
import { useState, useCallback, useMemo } from 'react';
import {useNavigation} from "@react-navigation/native";

const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "cyan", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp01 : {backgroundColor:Colors.indigo200, alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp02 : {backgroundColor:Colors.red200, alignItems: 'flex-end', flexDirection: "row-reverse", padding:5},
 temp03 : {backgroundColor:Colors.yellow400, alignContent:"center", flexDirection: "row"},
 expireddate : {flexDirection: 'row', justifyContent: 'space-between', padding:3, marginTop: 15, width:260},
 

cameraview : { width:300, height:300, backgroundColor:Colors.amber200},
  TitleText: {textAlign : "center", fontWeight : 'bold', margin : 20, fontSize: 20},
  textInputStyle: {color: "green", width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:10}
 })

const Ingredients_add = () => {

  const [quantity, setQuantity] = useState<number>(1);
  const quantityUp = useCallback(()=>setQuantity((quantity) => {return quantity+1}), []);
  const quantityDown = useCallback(()=>setQuantity((quantity) => { 
    if(quantity >= 2 ) quantity = quantity-1;
    return quantity}), []);

    const [text, setText] = useState<string>('');
    const finalize = useCallback((final)=> setText((text) => { text = final; return text;}),[]);
    const clearText = useCallback(()=> setText((text) => { text = ""; console.log("==========after clear "+text); return text;}),[]);

    const navigation = useNavigation();
 const openCalendar =
useCallback(()=>navigation.navigate("MonthlyCalendar"),[]);


 return (
 <SafeAreaView>
  
    <View style={style.temp01}>
      <Text style = {style.TitleText} >추가 및 수정 </Text>
      <TouchableOpacity style = {{position:"absolute", right:12, top:25}}>
        <Text style = {{fontSize : 17}}>저장</Text>
      </TouchableOpacity>
         
    </View>
 
 <View style={style.temp02}> 
    <TouchableOpacity>
      <Icon name="bell-badge" size={30} color={Colors.grey500} style={{margin:5}}/>
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="star" size={30} color={Colors.yellow400} style={{margin:5}}/> 
    </TouchableOpacity>
  </View>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>이름</Text> 
    <TextInput style={style.textInputStyle}
      placeholder = "            "
      onChangeText = {(Intext: string) => {console.log(Intext); finalize(Intext);}}
      onFocus = {() => {console.log("On Focus");}}
      onBlur = {() => {console.log("On Blur");}}
      onEndEditing = {() => {console.log("Edit End!");}}
      keyboardType = "default"
     >
      </TextInput>
    <TouchableOpacity style = {{position:"absolute", right:25, top:21}} onPress = {clearText}> 
      <Icon name="close-circle" size={30} color={Colors.grey500} />  
    </TouchableOpacity>
  
  </View>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>수량                 </Text> 
    <TouchableOpacity onPress={quantityDown}>
      <Text style={style.TitleText}>-</Text>
    </TouchableOpacity>
    
    <Text style={style.TitleText}>{quantity}</Text>
    
    <TouchableOpacity onPress={quantityUp}>
      <Text style={style.TitleText}>+</Text>
    </TouchableOpacity>
    
  </View>

 
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>유통기한</Text> 
    <View>
      <View style={style.expireddate}>
        <Text style = {{fontSize:20}}>2022.05.03</Text>
        <TouchableOpacity onPress={openCalendar}>
          <Icon name="calendar-range" size={30} color={Colors.grey500}/>
        </TouchableOpacity>
          
      </View>
      <View style={style.expireddate}>
        <Text style = {{fontSize:20}}>2022.05.04</Text>
        <TouchableOpacity onPress={openCalendar}>
          <Icon name="calendar-range" size={30} color={Colors.grey500}/>
        </TouchableOpacity>
          
      </View>

    </View>
    
    
    
  
  </View>


 <View style={style.temp03}> 
    <Text style={style.TitleText}>이미지</Text> 
    <View style={style.cameraview}> 
      <Icon name="camera" size={30} color={Colors.grey500}  style = {{position:"absolute", left:140, top:120}} />  
    </View>
 </View>

 


 </SafeAreaView>
 );
};
export default Ingredients_add;