import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Modal, Pressable, TouchableOpacity, Alert , SafeAreaView, View, Text, TextInput, ScrollView, Button, TouchableHighlight } from 'react-native';
import { Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Mailer from 'react-native-mail';
import Color from 'color';
import InButton from './InButton';
import ModalFriends from './ModalFriends';

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

const Community = () => {

  const styles = StyleSheet.create({
    temp : {
      flexDirection: "row"
    },
    temp01 : {
      alignContent:"center", flexDirection: "row"
    },
    temp2 : {
      backgroundColor:Colors.grey300, alignContent:"center", margin: 20, borderRadius: 10
    },
    temp02 : {
      backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    temp02_1 : {
      position:"relative", left: 5,alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    temp02_2 : {
      position:"relative", left: 185, top: -50, alignContent:"center", flexDirection: "row", borderRadius: 10, marginBottom: -50
    },
    temp3 : {
      backgroundColor:Colors.grey200, alignContent:"center", margin: 20, borderRadius: 10
    },
    temp03 : {
      backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    temp03_1 : {
      position:"relative", left: 5, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    temp03_2 : {
      position:"relative", left: 185, top: -50, alignContent:"center", flexDirection: "row", borderRadius: 10, marginBottom: -50
    },
    expireddate0 : {
      fontSize: 18, color: 'white'
    },
    expireddate01 : {
      fontSize: 18
    },
    TitleText: {
      textAlign : "left", fontWeight : 'bold', margin : 20, marginRight:40, fontSize: 25
    },
    TitleTextip: {
      textAlign : "center", marginLeft : 40, marginRight: 5, marginEnd: 10, marginTop:20, fontSize: 20, fontWeight:'bold'
    },
    button1: {
      paddingTop:10, marginTop: 10, textAlign: "center", backgroundColor: Colors.red400, color: 'white', fontSize: 15, borderRadius:5, height: 40, width: 60, position: 'relative', left: 230
    },
    button2: {
      paddingTop:10, marginTop: 10, textAlign: "center", backgroundColor: Colors.grey300, fontSize: 15, borderRadius:5, height: 40, width: 60, position: 'relative', left: 310, top: -50
    },
    sharetext: {
      position: "relative", left:130, margin: 10
    },
    deletetext: {
      position:"relative", left:150, margin: 10
    },
    edittext: {
      position:"absolute", left:0, margin: 8
    },
    textInputStyle: {
      width : 250, height : 45, borderRadius: 10, backgroundColor: Colors.grey200, margin:14, marginLeft: 5
    },
    View: {
      height:'100%', backgroundColor:'white'
    },
    ScrollView: {
      left:30, top:110, width:320, maxHeight:150, position:'relative'
    },
    modalTitle: {
      fontSize:22, position:"relative", fontWeight:'bold', color:'#121214'
    },
    grey: {
      marginVertical:6, width:319, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row", justifyContent:"space-between" 
    },
    grey02: {
     paddingLeft:5, marginVertical:6, width:319, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row"
    },
    fr_mg: {
      fontSize:13, fontWeight:'600', color:'#121214', margin:7
    },
    delete: {
      width:38, height:38,borderRadius:10, backgroundColor: '#FFCCAF', paddingTop:1
    },
    red: {
      width:71, height:38, borderRadius:5, position:'relative', backgroundColor: '#FF5454', padding:8
    },
    white: {
      color:'white', fontSize:14, textAlign:"center"
    },
    idname: {
      fontSize:17, color:'#545454'
    },
    idnameView: {
      flexDirection:'row', margin:6
    },
    seventeen: {
      fontSize:17, color:'#121214'
    },
    fourteen: {
      fontSize:14, color:'#121214', textAlign:"center"
    },
    cancelO: {
      width:50, height:38,borderRadius:5, backgroundColor: '#EFEFEF', paddingTop:8, marginLeft:20
    },
    ResultView: {
      position:'relative', left:30, top:195, width:320
    },
    addcan: {
      flexDirection:'row',marginLeft:178, marginTop:20
    }
   });

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setShowResult(false);
  };
 
  const[showResult,setShowResult] = useState(false);
 
  const toggleShowResult = () => {
    setShowResult(!showResult);
  };
 
  const [searchId,setSearchId] = useState();

  const [modalVisible2, setModalVisible2] = useState(false);

  const [color, setColor] = useState("");



  const share1 = () => {
    Alert.alert("공유","친구에게 재료를 공유했습니다.",
    [{text: "확인", onPress: ()=>{console.log("share")}}]);
    setColor("lightgray");
  }

const delete1 = () => {
  setColor("lightgray");``
}


inde = {
  data: ["감자","당근","김"]
};
ind = {
  data: ["돼지고기","파"]
};
fri = {
  data: ["냉장고", "털이범","ㄱㄴㄷ"]
};



  return (
 <SafeAreaView>
    <View style={styles.temp01}>
      <Text style = {styles.TitleText} onPress={()=>{console.log("current searchId  ",searchId)}} >커뮤니티</Text>
      <ModalFriends ref={childRef}></ModalFriends>
      <Pressable onPress={()=>{childRef.current.toggleModal();}}>
        <Text style={{fontSize : 17, color:Colors.grey400, position:"absolute", left:150, top:25}}>친구 추가</Text>
      </Pressable>

    </View>
<View style={styles.temp2}>
 <View style={styles.temp02}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>부족                           </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>넉넉</Text>
  </View>

  <View style={styles.temp02_1}> 
  
  {this.inde.data.map((item,index)=>{
    return(
      <TouchableHighlight key={index} style={{backgroundColor: 'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' + Math.floor(Math.random() * 256) +
      ',' + Math.floor(Math.random() * 256) +
      ')', borderRadius: 10, margin: 10, padding:3}}>
    <Text style={styles.expireddate0}>{item}</Text></TouchableHighlight>
  
    )
  })}
  </View>
 <View style={styles.temp02_2}> 
  {this.ind.data.map((item,index)=>{
    return(
      <TouchableHighlight key={index} style={{backgroundColor: 'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' + Math.floor(Math.random() * 256) +
      ',' + Math.floor(Math.random() * 256) +
      ')', borderRadius: 10, margin: 10, padding:3}}>
    <Text style={styles.expireddate0}>{item}</Text></TouchableHighlight>
  
    )
  })}   
<Modal
  animationType="slide"
  transparent={false}
  visible={modalVisible2}  
  onShow={()=>console.log("onShow")}>
  </Modal>
  <Pressable
  onPress={() => setModalVisible2(true)}>  
  <Icon name="pencil" size={30} color={Colors.black} style={styles.edittext}/>
  </Pressable>
</View>
</View>


  <View style={styles.temp01}> 
    <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
  </View>
<ScrollView>

{this.fri.data.map((item, index)=>{
  return(


<View style={styles.temp3} key={index}>
  <View style={styles.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={styles.temp03_1}>
  {this.inde.data.map((item,index)=>{
    return(
      <InButton key={index} text={item} style={{backgroundColor: color}}/>
    )
  })}
  </View>
  <View style={styles.temp03_2}>
  {this.ind.data.map((item, index)=>{
    return(
      <InButton key={index} text={item} style={{backgroundColor: color}}/>
    )
  })}
</View>
   <View style={styles.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin: 5}}/>
  <Text style = {{fontSize: 18, margin: 10}}>{item}</Text>
  <TouchableOpacity onPress = {share1}> 
    <Icon name="share" size={30} color={Colors.black} style={styles.sharetext}/>
  </TouchableOpacity> 
  <TouchableOpacity onPress = {delete1}> 
    <Icon2 name="refresh" size={30} color={Colors.black} style={styles.deletetext}/>
  </TouchableOpacity> 
  </View>
</View>
)})}



</ScrollView>
</SafeAreaView>
 );
};

export default Community;
