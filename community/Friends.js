import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'recipe.db' });

const Friends = (props, ref) => {

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    getMutualFriends: () => { getMutualFriends() },
    getRequestedFriends: () => { getRequestedFriends() },

  }))
  
  const getMutualFriends = () => {
    const temp=[];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM test_member_friends where id = ? AND fr_status = 0`, ['eee@abc.com'], (tx, results) => {
      const rows = results.rows;
    
      for (let i = 0; i < rows.length; i++) {
        console.log(rows.item(i));
        temp.push({key: `${i}`, fr_id: rows.item(i).fr_id, fr_nickname: rows.item(i).fr_nickname});
      }
      setMutualFriendsListData(temp);
    })
  })
    
};

  const getRequestedFriends = () => {
    const temp=[];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM test_member_friends where id = ? AND fr_status = 1`, ['eee@abc.com'], (tx, results) => {
      const rows = results.rows;
        
      for (let i = 0; i < rows.length; i++) {
        console.log(rows.item(i));
        temp.push({key: `${i}`, fr_id: rows.item(i).fr_id, fr_nickname: rows.item(i).fr_nickname});
      }
      setRequestedFriendsListData(temp);
    })
    })
        
}

  const deleteMutualFriends = (item) => {

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, ["eee@abc.com",item.fr_id], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, [item.fr_id,"eee@abc.com"], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })

  };

  const deleteRequestedFriends = (item) => {

    db.transaction((tx) => {
      tx.executeSql(`Delete FROM test_member_friends where id=? AND fr_id=?`, ["eee@abc.com",item.fr_id], (tx, results) => {
        console.log('Results', results.rowsAffected);

      })
    })
  };

  const acceptRequest = (item) => {

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO test_member_friends (id, fr_id, fr_nickname, fr_status) VALUES (?,?,?,?)',
        [item.fr_id, "eee@abc.com", "이", 0],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        }
      );
    });
    
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE test_member_friends SET fr_status = 0 where id = ? AND fr_id = ?',
          ["eee@abc.com", item.fr_id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
  }

  const viewData = () => {

    db.transaction(function (tx) {
      tx.executeSql(
        `SELECT * FROM test_member_friends`,
        [],
        (tx, results) => {
          const rows = results.rows;

          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
        }
        
      }
      );
    });

}

    const [mutualFriendsListData, setMutualFriendsListData] = useState();
    const [requestedFriendsListData, setRequestedFriendsListData] = useState();
  
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRequestedRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...requestedFriendsListData];
        const prevIndex = requestedFriendsListData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setRequestedFriendsListData(newData);
    };

    const deleteMutualRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...mutualFriendsListData];
      const prevIndex = mutualFriendsListData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setMutualFriendsListData(newData);
  };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderRequestedItem = data => (
      <TouchableHighlight
          onPress={() => console.log('You touched me')}
          style={styles.rowFrontRequested}
          underlayColor={'#AAA'}
      >
          <View style={styles.requestedView}>
              <Text style={styles.fr_mg}>{data.item.fr_nickname}</Text>
              <Text style={[styles.fr_mg,{left:100, position:'absolute'}]}>{data.item.fr_id}</Text>
              <Text style={styles.fr_mg_waiting}>대기중</Text>
          </View>
      </TouchableHighlight>
  );

    const renderRequestedHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() =>{acceptRequest(data.item); getMutualFriends(); getRequestedFriends();}}>
                <Text>수락</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {deleteRequestedRow(rowMap, data.item.key); deleteRequestedFriends(data.item);}}
            >
                <Text style={styles.backTextWhite}>거절</Text>
            </TouchableOpacity>
        </View>
    );

    const renderMutualItem = data => (
      <TouchableHighlight
          onPress={() => console.log('You touched me')}
          style={styles.rowFront}
          underlayColor={'#AAA'}
      >
         <View style={styles.requestedView}>
              <Text style={styles.fr_mg}>{data.item.fr_nickname}</Text>
              <Text style={[styles.fr_mg,{left:100, position:'absolute'}]}>{data.item.fr_id}</Text>
          </View>
      </TouchableHighlight>
  );

    const renderMutualHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => {deleteMutualRow(rowMap, data.item.key); deleteMutualFriends(data.item);}}
          >
              <Text style={styles.backTextWhite}>삭제</Text>
          </TouchableOpacity>
      </View>
  );

    return (
        <View style={styles.container}>
          <View>
          <SwipeListView
                data={requestedFriendsListData}
                renderItem={renderRequestedItem}
                renderHiddenItem={renderRequestedHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            <SwipeListView
                data={mutualFriendsListData}
                renderItem={renderMutualItem}
                renderHiddenItem={renderMutualHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            
          </View>
          
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
  swipe: {
    borderColor:'blue',
    borderWidth:2,
    Height:100

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
requestedView: {
  flexDirection:'row',
  justifyContent:'space-between',
  //alignItems:'center'
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
  },
});

export default forwardRef(Friends)
