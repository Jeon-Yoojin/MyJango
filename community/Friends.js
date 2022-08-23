import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import firestore from '@react-native-firebase/firestore';

const Friends = () => {

  var myId = 'aaa@abc.com'
  var myNickname = 'a'

  const member = firestore().collection('member');

  const [friendsListData, setFriendsListData] = useState();
  const modifyFriends = useCallback((t) => { setFriendsListData(t); }, []);

  useEffect(
    getFriends = () => {
      const temp=[];
      member.doc(myId).collection('friends').orderBy('friendsMutual').get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp.push({
            key: documentSnapshot.id , 
            friendsId: documentSnapshot.data().friendsId, 
            friendsNickname: documentSnapshot.data().friendsNickname, 
            friendsMutual: documentSnapshot.data().friendsMutual });
        }
        );
        modifyFriends(temp);
      });
  },[]); 

  
  const deleteMutualFriends = (item) => {
    member.doc(item.friendsId).collection('friends').doc(myId).delete().then(() => {
      console.log('deleted!');
    });

    member.doc(myId).collection('friends').doc(item.friendsId).delete().then(() => {
      console.log('deleted!');
    });
  } 

  const deleteRequestedFriends = (item) => {
    member.doc(myId).collection('friends').doc(item.friendsId).delete().then(() => {
      console.log('deleted!');
    });
  }

  const acceptRequest = (item) => {
    member.doc(myId).collection('friends').doc(item.friendsId).update({ friendsMutual: true }).then(() => {
      console.log('updated!');
    });

    member.doc(item.friendsId).collection('friends').doc(myId).set({
      friendsId: myId,
      friendsNickname: myNickname,
      friendsMutual: true
    }).then(() => { console.log('updated!'); });
  }

  const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...friendsListData];
    const prevIndex = friendsListData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setFriendsListData(newData);
};


  const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

  const renderItem = data => (
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={ data.item.friendsMutual ? styles.rowFront : styles.rowFrontRequested}
        underlayColor={'#AAA'}
    >
        <View style={styles.commonView}>
            <Text style={styles.fr_mg}>{data.item.friendsNickname}</Text>
            <Text style={[styles.fr_mg,{left:100, position:'absolute'}]}>{data.item.friendsId}</Text>
             { !(data.item.friendsMutual) && <Text style={styles.fr_mg_waiting}>대기중</Text> }
        </View>
    </TouchableHighlight>
);
  const renderHiddenItem = (data, rowMap) => (
    data.item.friendsMutual ?  (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {deleteRow(rowMap, data.item.key); deleteMutualFriends(data.item);}}>
          <Text style={styles.backTextWhite}>삭제</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() =>{ deleteRow(rowMap, data.item.key); acceptRequest(data.item); getFriends(); }}>
          <Text>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => { deleteRow(rowMap, data.item.key); deleteRequestedFriends(data.item); }}>
          <Text style={styles.backTextWhite}>거절</Text>
        </TouchableOpacity>
      </View>
    
  )
);
  return (
    <View style={styles.container}>
      <SwipeListView
        data={friendsListData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={1000}
        onRowDidOpen={onRowDidOpen}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1
  },
  backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      backgroundColor: '#FCFCFC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
      paddingHorizontal:30
  },
  rowFrontRequested: {
    backgroundColor: '#C7FFAD',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal:30
},
commonView: {
  flexDirection:'row',
  justifyContent:'space-between',
},
  fr_mg: {
    fontSize:13, fontWeight:'600', color:'#121214'
  },
  fr_mg_waiting: {
    fontSize:13, fontWeight:'600', color:'#979797'
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: '#C7FFAD',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: '#FF5454',
      right: 0,
  }
});

export default Friends;
