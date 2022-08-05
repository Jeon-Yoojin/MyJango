import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Button, TouchableOpacity, Text, Alert } from 'react-native';
import Modal from "react-native-modal";
import SQLite from 'react-native-sqlite-storage';
import Input from './Input'
import Task from './Task'

var db = SQLite.openDatabase({ name: 'recipe.db' });

const ModalPresentCondition = (props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleModal: () => { toggleModal(); },
    initToMeData: () => { initToMeData() }
  }))

  const [newToMe, setNewToMe] = useState('');
  const [toMes, setToMes] = useState({});
    
  const _addToMe = () => {
    const ID = Date.now().toString();
      const newToMeObject = {
        [ID]: { id: ID, text: newToMe },
      };
      setNewToMe('');
      setToMes({ ...toMes, ...newToMeObject });
      db.transaction(function (tx) {
        tx.executeSql(
          'CREATE TABLE if not exists to_me (item TEXT)',
          [],(tx, results) => {
          }
        );
    
      })
    
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO to_me (item) VALUES (?)',
            [newToMe],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
            }
          );
        });
    
      };



  const _deleteToMe = (id) => {
        const currentToMes = Object.assign({}, toMes);
        var temp = currentToMes[id].text;

        db.transaction((tx) => {
          tx.executeSql(
              'DELETE FROM to_me where item=?',
              [temp],
              (tx, results) => {
                  console.log('Results', results.rowsAffected);
              }
          );
      });

        delete currentToMes[id];
        setToMes(currentToMes);
      };
      
  const _updateToMe = (item) => {
    const currentToMes = Object.assign({},toMes);
    
    var before = currentToMes[item.id].text;
    var after = item.text;

    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE to_me SET item=? where item=?',[after,before],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        }
      );
    });
  
    currentToMes[item.id]=item;
    setToMes(currentToMes);
  };

  const _handleToMeTextChange = (text) => {
    setNewToMe(text);
  };

  const initToMeData = () => {
    const temp={};
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM to_me;`, [], (tx, results) => {
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          const ID = Date.now().toString();
          const newToMeObject = {
            id: ID, text: rows.item(i).item };
          temp[ID] = newToMeObject;
          const final = Object.assign({},temp);
            setToMes(final);
          }
        })
      });
    };


    return (
    <Modal isVisible={isModalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={styles.modalTitle}>재료 수정</Text>
                <View style={styles.inAndTaskView}>
                  <Text style={styles.category}>부족한 재료</Text>
                    <Input value={newToMe} onChangeText={_handleToMeTextChange} onSubmitEditing={_addToMe}/>
                    <ScrollView style={styles.ScrollView}>
                      {Object.values(toMes).reverse().map((item) => (
                        <Task key={item.id} item={item} deleteToMe={_deleteToMe} updateToMe={_updateToMe}/>
                    ))}
                    </ScrollView>
                </View>

                <View style={styles.inAndTaskView}>
                  <Text style={styles.category}>넉넉한 재료</Text>
                    <Input value={newToMe} onChangeText={_handleToMeTextChange} onSubmitEditing={_addToMe}/>
                    <ScrollView style={styles.ScrollView}>
                      {Object.values(toMes).reverse().map((item) => (
                        <Task key={item.id} item={item} deleteToMe={_deleteToMe} updateToMe={_updateToMe}/>
                    ))}
                    </ScrollView>
                </View>

                <View style={styles.buttonView}>
                  <TouchableOpacity style={styles.cancelO} onPress={toggleModal}>
                    <Text style={styles.fourteen}>닫기</Text>
                  </TouchableOpacity>
                  
                </View>
                
            </View>
        </Modal>

      );

}

export default forwardRef(ModalPresentCondition);

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flex:1, 
      paddingTop:90,
      paddingHorizontal:14
    },
    ScrollView: {
      paddingVertical:5, width:320, maxHeight:110
     },
     inAndTaskView: {
      marginTop:30
     },
     category: {
      fontSize:18, color:'#545454', marginBottom:10, marginLeft:10
     },
    modalTitle: {
      fontSize:22, position:"relative", fontWeight:'bold', color:'#121214'
    },
    buttonView: {
      flexDirection:'row', marginTop:30, justifyContent:'flex-end', width:310
    },
    saveO: {
      width:50, height:38,borderRadius:5, backgroundColor: '#FF5454', paddingTop:8, margin:5
    },
    white: {
      color:'white', fontSize:14, textAlign:"center"
    },
    cancelO: {
      width:50, height:38,borderRadius:5, backgroundColor: '#EFEFEF', paddingTop:8, margin:5
    },
    fourteen: {
      fontSize:14, color:'#121214', textAlign:"center"
    },
  });
