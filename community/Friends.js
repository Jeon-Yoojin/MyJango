import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'recipe.db' });

const Friends = () => {

  const [friendsListData, setFriendsListData] = useState();
  
  useEffect(
    getFriends = () => {
      const temp=[];
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM test_member_friends where id = ? ORDER BY fr_status DESC`, ['bbb@abc.com'], (tx, results) => {
        const rows = results.rows;
          
        for (let i = 0; i < rows.length; i++) {
          if( rows.item(i).fr_status == 1 )
            temp.push({key: `${i}`, fr_id: rows.item(i).fr_id, fr_nickname: rows.item(i).fr_nickname, fr_requested: true});
          else
            temp.push({key: `${i}`, fr_id: rows.item(i).fr_id, fr_nickname: rows.item(i).fr_nickname, fr_requested: false});
        }
        setFriendsListData(temp);
      })
      })
          
  },[]); 

  const deleteMutualFriends = (item) => {

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, ["aaa@abc.com",item.fr_id], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, [item.fr_id,"aaa@abc.com"], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })

  };

  const deleteRequestedFriends = (item) => {

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, ["aaa@abc.com",item.fr_id], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })
  };

  const acceptRequest = (item) => {

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO test_member_friends (id, fr_id, fr_nickname, fr_status) VALUES (?,?,?,?)',
        [item.fr_id, "aaa@abc.com", "에이", 0],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        }
      );
    });
    
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE test_member_friends SET fr_status = 0 where id = ? AND fr_id = ?',
          ["aaa@abc.com", item.fr_id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
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
        style={ data.item.fr_requested ? styles.rowFrontRequested : styles.rowFront}
        underlayColor={'#AAA'}
    >
        <View style={styles.commonView}>
            <Text style={styles.fr_mg}>{data.item.fr_nickname}</Text>
            <Text style={[styles.fr_mg,{left:100, position:'absolute'}]}>{data.item.fr_id}</Text>
             { data.item.fr_requested && <Text style={styles.fr_mg_waiting}>대기중</Text> }
        </View>
    </TouchableHighlight>
);
  const renderHiddenItem = (data, rowMap) => (
    data.item.fr_requested ? (
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
    
  ) : (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {deleteRow(rowMap, data.item.key); deleteMutualFriends(data.item);}}>
        <Text style={styles.backTextWhite}>삭제</Text>
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
