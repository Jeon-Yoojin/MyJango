import React, { useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Button, View, Modal, StyleSheet, Text, ScrollView, TouchableOpacity,TextInput , TouchableHighlight } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Friends from './Friends';

var db = SQLite.openDatabase({ name: 'recipe.db' });

const ModalFriends = (props, ref) => {
    
    const childRef = useRef()

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
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

  const addFriends = () => {
    if(resultID!='' || searchNickname!=''){
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO test_member_friends (id, fr_id, fr_nickname, fr_status) VALUES (?,?,?,?)',
          [resultID, 'eee@abc.com', '이', 1],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });

    }
  }

  const [searchNickname,setSearchNickname] = useState('');
  const [resultID, setResultID] = useState('');

  const modifyResultID = useCallback((ID) => {
    setResultID(ID);
  }, []);

  const searchWithNickname = () => {
  
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT id FROM test_member WHERE nickname = ?',
        [searchNickname],
        (tx, results) => {
          const rows = results.rows;

          for (let i = 0; i < rows.length; i++) {

            console.log(rows.item(i));
            modifyResultID(rows.item(i).id);
            
        }
 
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
            <Button onPress={() => { childRef.current.getMutualFriends(); childRef.current.getRequestedFriends();}}
            title="친구 불러오기"/>
          </View>
          
          <ScrollView style={styles.ScrollView}>
              <Friends ref={childRef}></Friends>
          </ScrollView>
          
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
        left:30, top:110,width:330, maxHeight:150, position:'relative'
    },
    modalTitleView: {
      position:"relative", flexDirection:'row', left:14, top:90, justifyContent:'space-between', paddingRight:26
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
