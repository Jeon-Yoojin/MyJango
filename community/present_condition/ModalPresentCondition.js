import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Button, TouchableOpacity, Text, Alert } from 'react-native';
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
import Input from './Input';
import ToMe from './ToMe';
import FromMe from './FromMe';


const ModalPresentCondition = (props, ref) => {

  var myId = 'aaa@abc.com'
  var myNickname = 'a'

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleModal: () => { toggleModal(); },
  }))

  const [newToMe, setNewToMe] = useState('');
  const [newFromMe, setNewFromMe] = useState('');

  const member = firestore().collection('member');

  const _addToMe = () => {
   const ID = Date.now().toString();
      const newToMeObject = {
        [ID]: { id: ID, text: newToMe },
      };
      setNewToMe('');
      props.modifyMyToMe({ ...props.myToMe, ...newToMeObject });

      member.doc(myId).collection('communityIngredients')
      .doc(newToMe).set({
        item: newToMe,
        toMe: true
      })
      .then(() => {
        console.log('added!');
      });  
  };

  const _addFromMe = () => {
    const ID = Date.now().toString();
    const newFromMeObject = {
      [ID]: { id: ID, text: newFromMe },
    };
    setNewFromMe('');
    props.modifyMyFromMe({ ...props.myFromMe, ...newFromMeObject });

    member.doc(myId).collection('communityIngredients')
    .doc(newFromMe).set({
      item: newFromMe,
      toMe: false
    })
    .then(() => {
      console.log('added!');
    });
  };



  const _deleteToMe = (id) => {
        const currentToMes = Object.assign({}, props.myToMe);
        var temp = currentToMes[id].text;
        member.doc(myId).collection('communityIngredients').doc(temp).delete().then(() => {
          console.log('deleted!');
        });
        delete currentToMes[id];
        props.modifyMyToMe(currentToMes);
      };
    
  const _deleteFromMe = (id) => {
    const currentFromMes = Object.assign({}, props.myFromMe);
    var temp = currentFromMes[id].text;
    member.doc(myId).collection('communityIngredients').doc(temp).delete().then(() => {
      console.log('deleted!');
    });
    delete currentFromMes[id];
    props.modifyMyFromMe(currentFromMes);
  }

  const _updateToMe = (item) => {
    const currentToMes = Object.assign({},props.myToMe);
    
    var before = currentToMes[item.id].text;
    var after = item.text;

    member.doc(myId).collection('communityIngredients').doc(before).delete().then(() => {
      console.log('deleted!');
    });

    member.doc(myId).collection('communityIngredients').doc(after).set({ 
      item: after, toMe: true }).then(() => {
      console.log('added!');
    });

    currentToMes[item.id]=item;
    props.modifyMyToMe(currentToMes);
  };

  const _updateFromMe = (item) => {
    const currentFromMes = Object.assign({},props.myFromMe);
    
    var before = currentFromMes[item.id].text;
    var after = item.text;

    member.doc(myId).collection('communityIngredients').doc(before).delete().then(() => {
      console.log('deleted!');
    });

    member.doc(myId).collection('communityIngredients').doc(after).set({ 
      item: after, toMe: false }).then(() => {
      console.log('added!');
    });

    currentFromMes[item.id]=item;
    props.modifyMyFromMe(currentFromMes);
  };

  const _handleToMeTextChange = (text) => {
    setNewToMe(text);
  };

  const _handleFromMeTextChange = (text) => {
    setNewFromMe(text);
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
                      {Object.values(props.myToMe).reverse().map((item) => (
                        <ToMe key={item.id} item={item} deleteToMe={_deleteToMe} updateToMe={_updateToMe}/>
                    ))}
                    </ScrollView>
                </View>

                <View style={styles.inAndTaskView}>
                  <Text style={styles.category}>넉넉한 재료</Text>
                    <Input value={newFromMe} onChangeText={_handleFromMeTextChange} onSubmitEditing={_addFromMe}/>
                    <ScrollView style={styles.ScrollView}>
                      {Object.values(props.myFromMe).reverse().map((item) => (
                        <FromMe key={item.id} item={item} deleteFromMe={_deleteFromMe} updateFromMe={_updateFromMe}/>
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
