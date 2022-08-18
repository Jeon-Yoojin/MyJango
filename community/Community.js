import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Alert , SafeAreaView, View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Mailer from 'react-native-mail';
import ModalFriends from './ModalFriends';
import ModalPresentCondition from './present_condition/ModalPresentCondition'
import InButton from './InButton';
import firestore from '@react-native-firebase/firestore';

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

  var myId = 'aaa@abc.com'
  var myNickname = 'a'

  const child1Ref = useRef();
  const child2Ref = useRef();

  const [color, setColor] = useState("");

  const share1 = () => {
    Alert.alert("공유","친구에게 재료를 공유했습니다.",
    [{text: "확인", onPress: ()=>{console.log("share")}}]);
    setColor("lightgray");
  }

  const delete1 = () => {
    setColor("lightgray");``
  }

  const [myToMe, setMyToMe] = useState([]);
  const modifyMyToMe = useCallback((t) => { setMyToMe(t); }, []);

  const [myFromMe, setMyFromMe] = useState([]);
  const modifyMyFromMe = useCallback((t) => { setMyFromMe(t); }, []);

  const member = firestore().collection('member');
  
  useEffect (
    getMyToMes = () => {
      const temp={};
      member.doc(myId).collection('communityIngredients').where('toMe','==',true).get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp[documentSnapshot.id] = 
          { id:documentSnapshot.id, text: documentSnapshot.data().item }  
        }
        );
        modifyMyToMe(temp);
      });
  },[]);

  useEffect(
    getMyFromMes = () => {
      const temp={};
       member.doc(myId).collection('communityIngredients').where('toMe','==',false).get()
       .then(querySnapshot => {
         querySnapshot.forEach(documentSnapshot => {
          temp[documentSnapshot.id] = 
          { id:documentSnapshot.id, text: documentSnapshot.data().item }  
         }
         );
         modifyMyFromMe(temp);
       });
   },[]);

   


inde = {
  data: ["감자","당근","김"]
};
ind = {
  data: ["돼지고기","파"]
};
fri = {
  data: ["냉장고", "털이범","ㄱㄴㄷ","a","b","c","ds"]
};




  const styles = StyleSheet.create({
    temp01 : {
      alignContent:"center", flexDirection: "row"
    },
    myPresentCondition : {
      borderColor:'green', borderWidth:1, backgroundColor:Colors.grey300, alignContent:"center", margin: 20, borderRadius: 10
    },
    myText : {
      borderColor:'red', borderWidth:1, backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    myIng : {
      flexDirection:'row',borderWidth:1, borderColor:'red', alignContent:'space-between'
    },  
    myToMe : {
      borderWidth:1, borderRadius: 10, flex:1
    },
    myFromMe : {
      borderWidth:1, borderColor:'blue', borderRadius: 10, flex:1
    },
    modifyMine : {
      borderWidth:1, alignItems:"flex-end"
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
    TitleText: {
      textAlign : "left", fontWeight : 'bold', margin : 20, marginRight:40, fontSize: 25
    },
    sharetext: {
      position: "relative", left:130, margin: 10
    },
    deletetext: {
      position:"relative", left:150, margin: 10
    },
    scrollView: {
      maxHeight:400
    }
   });

  
  return (
  <SafeAreaView>
    <View style={styles.temp01}>
    <Text style = {styles.TitleText}>커뮤니티</Text>
 
      <ModalFriends ref={child1Ref}></ModalFriends>
      <TouchableOpacity onPress={()=>{child1Ref.current.toggleModal();}}>
        <Text style={{fontSize : 17, color:Colors.grey400, position:"absolute", left:150, top:25}}>친구 추가</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.myPresentCondition}>
      <View style={styles.myText}>  
        <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>부족                           </Text>
        <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>넉넉</Text>
      </View>

      <View style={styles.myIng}>

      <View style={styles.myToMe}> 
        {Object.values(myToMe).map((item)=>{
          return (
            <TouchableHighlight key={item.id} style={{backgroundColor: 'rgb(' +
              Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ')', borderRadius: 10, margin: 10, padding:3}}>
            <Text style={styles.expireddate0}>{item.text}</Text></TouchableHighlight>
  
          )
        })}
      </View>

      <View style={styles.myFromMe}>
        {Object.values(myFromMe).map((item)=>{
          return (
            <TouchableHighlight key={item.id} style={{backgroundColor: 'rgb(' +
              Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ')', borderRadius: 10, margin: 10, padding:3}}>
            <Text style={styles.expireddate0}>{item.text}</Text></TouchableHighlight>
  
          )
        })} 
      </View>

      </View>

      <View style={styles.modifyMine}>
      <ModalPresentCondition ref={child2Ref} myToMe={myToMe} modifyMyToMe={modifyMyToMe} 
      myFromMe={myFromMe} modifyMyFromMe={modifyMyFromMe}></ModalPresentCondition>
        <TouchableOpacity onPress={()=>{child2Ref.current.toggleModal();}}>  
          <Icon name="pencil" size={30} color={Colors.black} style={styles.edittext}/>
        </TouchableOpacity>
      </View>

    </View>

    <View style={styles.temp01}> 
      <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
    </View>

    <ScrollView style={styles.scrollView}>
      {fri.data.map((item, index)=>{
        return (
          <View style={styles.temp3} key={index}>
            <View style={styles.temp03}>  
              <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
              <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
            </View>

            <View style={styles.temp03_1}>
              {ind.data.map((item,index)=>{
                return (
                  <InButton key={index} text={item} style={{backgroundColor: color}}/>
                )
              })}
            </View>

            <View style={styles.temp03_2}>
              {inde.data.map((item, index)=>{
                return (
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
