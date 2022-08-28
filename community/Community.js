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
  
  const [friendsIng, setFriendsIng]= useState([]);
  const modifyFriendsIng = useCallback((t) => { setFriendsIng(t); }, []);

  const member = firestore().collection('member');
  
  useEffect( () => {
    async function getMine() {
      const myToMeTemp={};
      const myFromMeTemp={};

      let getMyFromMes = await member.doc(myId).collection('communityIngredients').get();
      
      for(const doc of getMyFromMes.docs){
        if (doc.data().toMe)  myToMeTemp[doc.id] = { id:doc.id, text: doc.data().item }
        else  myFromMeTemp[doc.id] = { id:doc.id, text: doc.data().item }
      }
      modifyMyFromMe(myFromMeTemp);
      modifyMyToMe(myToMeTemp);
   } 
   getMine();
  },[]);


  useEffect (() => {
    async function getFriends() {
      const temp = [];
      let getFriends = await member.doc(myId).collection('friends').where('friendsMutual', '==', true).get();
      
      for(const doc of getFriends.docs) {
        const toMeTemp = [];
        const fromMeTemp = [];
        let getFriendsIng = await member.doc(doc.id).collection('communityIngredients').get();

        for(const doc2 of getFriendsIng.docs) {
          if(doc2.data().toMe)  toMeTemp.push(doc2.data().item);
          else  fromMeTemp.push(doc2.data().item);
        }
        temp.push([doc.data().friendsNickname, toMeTemp, fromMeTemp]);
      }
    modifyFriendsIng(temp);
    } 
    getFriends();
  },[]);




  const styles = StyleSheet.create({
    titleView : {
      alignContent:"center", flexDirection: "row"
    },
    myPresentCondition : {
      backgroundColor:Colors.grey300, alignContent:"center", margin: 20, borderRadius: 10
    },
    myText : {
      backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    ing : {
      flexDirection:'row', alignContent:'space-between'
    },  
    ingHalf : {
      borderRadius: 10, flexWrap:'wrap', flexDirection:'row', flex:1
    },
    modifyMine : {
      alignItems:"flex-end", padding:10
    },
    friendsPresentCondition : {
      backgroundColor:Colors.grey200, alignContent:"center", margin: 20, borderRadius: 10
    },
    friendsText : {
      backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    friendsZone : {
      backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    expiredDate : {
      fontSize: 18, color: 'white'
    },
    titleText: {
      textAlign : "left", fontWeight : 'bold', margin : 20, marginRight:40, fontSize: 25
    },
    shareText: {
      position: "relative", left:130, margin: 10
    },
    deleteText: {
      position:"relative", left:150, margin: 10
    },
    scrollView: {
      maxHeight:350
    }
   });

  
  return (

  <SafeAreaView>

    <View style={styles.titleView}> 
    <Text style={styles.titleText}>커뮤니티</Text>

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

      <View style={styles.ing}>

      <View style={styles.ingHalf}> 
        {Object.values(myToMe).map((item)=>{
          return (
            <TouchableHighlight key={item.id} style={{backgroundColor: 'rgb(' +
              Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ')', borderRadius: 10, margin: 10, padding:3, height:30}}>
            <Text style={styles.expiredDate}>{item.text}</Text></TouchableHighlight>
  
          )
        })}
      </View>

      <View style={styles.ingHalf}>
        {Object.values(myFromMe).map((item)=>{
          return (
            <TouchableHighlight key={item.id} style={{backgroundColor: 'rgb(' +
              Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ',' + Math.floor(Math.random() * 256) +
              ')', borderRadius: 10, margin: 10, padding:3}}>
            <Text style={styles.expiredDate}>{item.text}</Text></TouchableHighlight>
  
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


    <View style={styles.titleView}>
      <Text style={styles.titleText}>친구</Text>
    </View> 

    <ScrollView style={styles.scrollView}>
      {friendsIng.map((item, index)=>{
        return (
          <View style={styles.friendsPresentCondition} key={index}>
            <View style={styles.friendsText}>  
              <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>부족                           </Text>
              <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>넉넉</Text>
            </View>

            <View style={styles.ing}>

            <View style={styles.ingHalf}>
              {item[1].map((item,index)=>{
                return (
                  <InButton key={index} text={item} style={{backgroundColor: color}}/>
                )
              })}
            </View>

            <View style={styles.ingHalf}>
              {item[2].map((item, index)=>{
                return (
                  <InButton key={index} text={item} style={{backgroundColor: color}}/>
                )
              })}
            </View>

            </View>

            <View style={styles.friendsZone}> 
              <Icon name="account" size={30} color={Colors.black} style={{margin: 5}}/>
              <Text style = {{fontSize: 18, margin: 10}}>{item[0]}</Text>
              <TouchableOpacity onPress = {share1}> 
                <Icon name="share" size={30} color={Colors.black} style={styles.shareText}/>
              </TouchableOpacity> 
              <TouchableOpacity onPress = {delete1}> 
                <Icon2 name="refresh" size={30} color={Colors.black} style={styles.deleteText}/>
              </TouchableOpacity> 
            </View>
          </View>
        )})}
    </ScrollView> 

</SafeAreaView>  


 );
};

export default Community;
