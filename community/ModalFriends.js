import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Friends from './Friends';
import firestore from '@react-native-firebase/firestore';

const ModalFriends = (props, ref) => {

  useImperativeHandle(ref, () => ({

    toggleModal: () => { toggleModal(); }

  }))

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setShowResult(false);
  };

  const[showResult,setShowResult] = useState(false);
 
  const toggleShowResult = () => {
    setShowResult(!showResult);
  };

  const [searchNickname,setSearchNickname] = useState('');
  const [resultID, setResultID] = useState('');
  const modifyResultID = useCallback((ID) => { setResultID(ID); }, []);

  const member = firestore().collection('member');
  const memberFriends = firestore().collection('memberFriends');
  
  const addFriends = () => {
    if(resultID!='' || searchNickname!=''){
      memberFriends.add({
        id: resultID,
        friendsId: 'aaa@abc.com',
        friendsNickname: '에이',
        friendsMutual: false
      })
      .then(() => {
        console.log('added!');
      });
    }
  }
  
  const searchWithNickname = () => {
    member.where('nickname', '==', searchNickname).get()
    .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      console.log('UserFriends: ', documentSnapshot.data().id);
      modifyResultID(documentSnapshot.data().id);
    }
    );
  });
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
        onShow={()=>console.log("onShow")}>
        <View style={styles.View}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitle}>친구 관리</Text>
            <Text style={styles.description}>{'<<'}밀어서 관리하기</Text>
          </View>
          
          <View style={styles.ScrollView}>
              <Friends></Friends>
          </View>
          
          <Text style={[styles.modalTitle, {left:14, top:155}]}>친구 추가</Text>
          <View style={[styles.grey, {left:30, top:175}]}>
            <TextInput style={[styles.idname, {width:250}]}
            placeholder='친구 닉네임을 입력하세요' 
            onFocus={()=>{setShowResult(false); modifyResultID('');}}
            onEndEditing={()=> {toggleShowResult(); searchWithNickname();}}
            onChangeText = {(text) => {console.log(text); setSearchNickname(text);}} ></TextInput>
            <TouchableOpacity style={styles.red} onPress= {()=> {toggleShowResult(); searchWithNickname();}}>
              <Text style={styles.white}>검색</Text>
            </TouchableOpacity>
          </View>
          {showResult && <View style={styles.ResultView}>
            <Text style={styles.seventeen}>검색 결과</Text>
            <Text style={styles.seventeen}>_________________________________________</Text>
            <View style={styles.idnameView}>
              <Text style={styles.fourteen}>닉네임</Text>
              <Text style={[styles.fourteen, {position:'relative', left:110}]}>아이디</Text>
            </View>
            <View style={styles.grey02}>
              <Text style={styles.idname}>{searchNickname}</Text>
              <Text style={[styles.idname, {position:'relative', left:104}]}>{resultID}</Text>
            </View>
            <View style={styles.addcan}>
              <TouchableOpacity style={styles.red} onPress={()=>{toggleModal(); addFriends();}}>
                <Text style={styles.white}>추가하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelO}  onPress={toggleModal}>
                <Text style={styles.fourteen}>취소</Text>
              </TouchableOpacity>
            </View>
          </View> }
        </View>
      </Modal>
    
  )
}

export default forwardRef(ModalFriends);

const styles = StyleSheet.create({
    View: {
      height:'100%', backgroundColor:'white'
    },
    ScrollView: {
      left:30, top:110, width:330, height:150, position:'relative'
    },
    modalTitleView: {
      position:"relative", flexDirection:'row', left:14, top:90, justifyContent:'space-between'
    },
    modalTitle: {
      fontSize:22, position:"relative", fontWeight:'bold', color:'#121214'
    },
    description: {
      fontSize:12, color:'#979797', textAlign:'right', right:47, top:30, position:'relative'
    },
    grey: {
      marginVertical:6, width:319, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row", justifyContent:"space-between" 
    },
    grey02: {
      paddingLeft:5, marginVertical:6, width:319, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row"
    },
    red: {
      width:71, height:38, borderRadius:5, position:'relative', backgroundColor: '#FF5454', padding:8, marginHorizontal:5
    },
    white: {
      color:'white', fontSize:14, textAlign:"center"
    },
    idname: {
      fontSize:16, color:'#545454'
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
      width:50, height:38,borderRadius:5, backgroundColor: '#EFEFEF', paddingTop:8, marginLeft:5
    },
    ResultView: {
      position:'relative', left:30, top:195, width:320
    },
    addcan: {
      flexDirection:'row',marginLeft:178, marginTop:20
    }
   });
