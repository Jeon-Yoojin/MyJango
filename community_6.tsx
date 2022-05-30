
import React, { Component } from 'react';
import {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, View, Text, Image, TextInput, ScrollView, Button, TouchableHighlight} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet, Modal, Pressable, TouchableOpacity, Alert} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Mailer from 'react-native-mail';


const ChatFillPath = require('./android/app/src/main/assets/images/chat-fill.png');
const FridgeFillPath = require('./android/app/src/main/assets/images/fridge-fill.png');
const HomeFillPath = require('./android/app/src/main/assets/images/home-fill.png');
const LightbulbFillPath = require('./android/app/src/main/assets/images/lightbulb-fill.png');


const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "red", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp : {flexDirection: "row"},
 temp01 : {alignContent:"center", flexDirection: "row"},
 temp2 : {backgroundColor:Colors.grey300, alignContent:"center", margin: 20, borderRadius: 10},
 temp02 : {backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row", borderRadius: 10},
 temp3 : {backgroundColor:Colors.grey200, alignContent:"center", margin: 20, borderRadius: 10},
 temp03 : {backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row", borderRadius: 10},
 expireddate0 : {fontSize: 18},
 expireddate1 : {backgroundColor:Colors.green200, borderRadius: 10, margin: 10, padding:3},
 expireddate01 : {backgroundColor:Colors.green200, borderRadius: 10, margin: 10, padding:3, alignContent:"flex-end"},
 expireddate2 : {backgroundColor:Colors.grey300, borderRadius: 10, margin: 10, fontSize: 18, padding:3},

  TitleText: {textAlign : "left", fontWeight : 'bold', margin : 20, fontSize: 25},
  TitleTextip: {textAlign : "center", margin : 2, fontSize: 23},
  sharetext: {position:"absolute", left:120, margin: 10},
  edittext: {position:"absolute", left:0, margin: 8},
  textInputStyle: {width : 210, height : 40, borderWidth: 1, backgroundColor: "white", margin:2},
  navbar:{
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft: 20,
    paddingRight: 33,
    paddingTop: 15,

    borderTopColor:'rgba(0,0,0,0.05)',
    borderTopWidth:1.5,
},
navbarElement:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
},
Img:{
    height: 30,
    width: 25,
    marginHorizontal: 15
},
text:{
    color: '#C6C6C6',
    fontWeight: '700',
    marginVertical: 10
}
 })

export const sendEmailWithMailer = (
  to = "",
) => {
  Mailer.mail(
    {
      subject: 'My JangGo 친구 추가',
      recipients: [to],
      body: 'My JangGo에서 친구 추가를 받았습니다.',
      isHTML: false,
    },
    (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
      },
  );
};

const App = () => {
const [modalVisible, setModalVisible] = useState(false);
const [modalVisible2, setModalVisible2] = useState(false);
const share = useCallback(()=> Alert.alert("공유","친구에게 재료를 공유했습니다.",
[
{text: "확인", onPress: ()=>{console.log("Yes")}}
]
),[]);
const action = () => {console.log("Pressed");};
const save = () => {
  setModalVisible2(!modalVisible2);
  setText1(in1);
  setText2(in2);
  setText3(in3);
  setText4(in4);
  setText5(in5);
};
const add_fr = () => {
  setModalVisible(!modalVisible);
  setText_e(to);
  sendEmailWithMailer(to);
};
const [to, setText_e] = useState("");
const [in1, setText01] = useState("감자");
const [in2, setText02] = useState("당근");
const [in3, setText03] = useState("김");
const [in4, setText04] = useState("돼지고기");
const [in5, setText05] = useState("파");
const [inde1, setText1] = useState("감자");
const [inde2, setText2] = useState("당근");
const [inde3, setText3] = useState("김");
const [inde4, setText4] = useState("돼지고기");
const [inde5, setText5] = useState("파");
useEffect(()=>{
  setInterval(()=>{
  setText1;
  });
  setInterval(()=>{
  setText2;
  });
  setInterval(()=>{
    setText3;
  });
  setInterval(()=>{
    setText4;
  });
  setInterval(()=>{
    setText5;
  });           
},);
  return (
 <SafeAreaView>
    <View style={style.temp01}>
      <Text style = {style.TitleText} >커뮤니티</Text>
     <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onShow={()=>console.log("onShow")}
>
  <View style={style.temp}>
  <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구 추가</Text>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>이름     </Text>
    <TextInput style = {style.textInputStyle}
    placeholder = "            "
    keyboardType = "default"></TextInput>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>이메일 </Text>
    <TextInput style = {style.textInputStyle}
    placeholder = "            "
    keyboardType = "default"
    onChangeText = {(text) => setText_e(text)}></TextInput>
  </View>
  <Button title="친구 추가" onPress={add_fr}></Button>
  <Button title="닫기" onPress={() => setModalVisible(!modalVisible)}></Button>
</Modal>
<Pressable
        onPress={() => setModalVisible(true)}>
      <Text style={{fontSize : 17, color:Colors.grey400, position:"absolute", left:150, top:25}}>친구 추가</Text>
      </Pressable>

    </View>

<View style={style.temp2}>
 <View style={style.temp02}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>부족                         </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>넉넉</Text>
  </View>

  <View style={style.temp02}> 
  <TouchableHighlight style={style.expireddate1} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>{inde1}</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate1} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>{inde2}</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate1} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>{inde3}</Text></TouchableHighlight>
  <Text>    </Text>
  <TouchableHighlight style={style.expireddate01} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>{inde4}</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate01} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>{inde5}</Text></TouchableHighlight>
        
<Modal
  animationType="slide"
  transparent={false}
  visible={modalVisible2}  
  onShow={()=>console.log("onShow")}>
  <View style={style.temp}>
  <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>재료 수정</Text>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>부족한 재료</Text>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>재료1 </Text>
    <TextInput style = {style.textInputStyle}
    defaultValue = {inde1}
    keyboardType = "default"
    onChangeText = {(text) => setText01(text)}
    ></TextInput>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>재료2 </Text>
    <TextInput style = {style.textInputStyle}
    defaultValue = {inde2}
    keyboardType = "default"
    onChangeText = {(text) => setText02(text)}></TextInput>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>재료3 </Text>
    <TextInput style = {style.textInputStyle}
    defaultValue = {inde3}
    keyboardType = "default"
    onChangeText = {(text) => setText03(text)}></TextInput>
  </View>

  <View style={style.temp}>
    <Text style={style.TitleTextip}>{'\n'}넉넉한 재료</Text>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>재료1 </Text>
    <TextInput style = {style.textInputStyle}
    defaultValue = {inde4}
    keyboardType = "default"
    onChangeText = {(text) => setText04(text)}></TextInput>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>재료2 </Text>
    <TextInput style = {style.textInputStyle}
    defaultValue = {inde5}
    keyboardType = "default"
    onChangeText = {(text) => setText05(text)}></TextInput>
  </View>
  <Button title="저장" onPress={save}></Button>
  <Button title="닫기" onPress={() => setModalVisible2(!modalVisible2)}></Button>
</Modal>
  <Pressable
  onPress={() => setModalVisible2(true)}>  
  <Icon name="pencil" size={30} color={Colors.black} style={style.edittext}/>
  </Pressable>
</View>
</View>


  <View style={style.temp01}> 
    <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
  </View>
<ScrollView>
<View style={style.temp3}>
  <View style={style.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={style.temp03}>  
  <Text>  </Text>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>감자</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>당근</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>김</Text></TouchableHighlight>
<Text>    </Text>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>돼지고기</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>파</Text></TouchableHighlight>
</View>

  <View style={style.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin: 5}}/>
  <Text style = {{fontSize: 18, margin: 10}}>냉장고 털이범님</Text>
  <TouchableOpacity onPress = {share}> 
    <Icon name="share" size={30} color={Colors.black} style={style.sharetext}/>
  </TouchableOpacity> 
  </View>
</View>

<View style={style.temp3}>
  <View style={style.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
  </View>

  <View style={style.temp03}>  
  <Text>  </Text>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>감자</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>당근</Text></TouchableHighlight>
  <TouchableHighlight style={style.expireddate2} onPress={action} underlayColor='skyblue'>
    <Text style={style.expireddate0}>김</Text></TouchableHighlight>
</View>

  <View style={style.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin:5}}/>
  <Text style = {{fontSize: 18, margin: 10}}>냉장고 털이범님</Text>
  <TouchableOpacity onPress = {share}> 
    <Icon name="share" size={30} color={Colors.black} style={style.sharetext}/>  
  </TouchableOpacity> 
  </View>
</View>
</ScrollView>
<View style={style.navbar}>
<TouchableOpacity>
            <View style={style.navbarElement}>
            <Image style={style.Img} source={HomeFillPath}/>
            <Text style={style.text}>홈</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={style.navbarElement}>
            <Image style={style.Img} source={FridgeFillPath}/>
            <Text style={style.text}>재료 관리</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={style.navbarElement}>
            <Image style={style.Img} source={LightbulbFillPath}/>
            <Text style={style.text}>레시피 추천</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={style.navbarElement}>
            <Image style={style.Img} source={ChatFillPath}/>
            <Text style={style.text}>커뮤니티</Text>
            </View>
            </TouchableOpacity>
</View>
</SafeAreaView>
 );
};
export default App;
