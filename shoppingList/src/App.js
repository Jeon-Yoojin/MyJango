import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Button, TouchableOpacity, Text, Alert } from 'react-native';
import Modal from "react-native-modal";
import SQLite from 'react-native-sqlite-storage';
import Title from './components/Title';
import Input from './components/Input';
import Task from './components/Task';
import { object } from 'prop-types';

var db = SQLite.openDatabase({ name: 'recipe.db' });

export default function App() {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const combined = () => {
      toggleModal();
      initData();

    }

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});
    const modifyTasks = useCallback((tempTask) => {
      setTasks(tempTask);
    }, []);
 

    const _addTask = () => {
      const ID = Date.now().toString();
      const newTaskObject = {
        [ID]: { id: ID, text: newTask, completed: false },
      };
      setNewTask('');
      setTasks({ ...tasks, ...newTaskObject });
      db.transaction(function (tx) {
        tx.executeSql(
          'CREATE TABLE if not exists shoppingList (item TEXT, completed INTEGER)',
          [],(tx, results) => {
          }
        );
    
      })
    
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO shoppingList (item, completed) VALUES (?,?)',
            [newTask, 0],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
            }
          );
        });
    
      };

      const _deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        var temp = currentTasks[id].text;

        db.transaction((tx) => {
          tx.executeSql(
              'DELETE FROM shoppingList where item=?',
              [temp],
              (tx, results) => {
                  console.log('Results', results.rowsAffected);
              }
          );
      });

        delete currentTasks[id];
        setTasks(currentTasks);
      };

      const _deleteAll = () => {
        const currentTasks = [];
        setTasks(currentTasks);

        db.transaction(function (tx) {
          tx.executeSql(
              'DELETE FROM shoppingList',
              [],
              (tx, results) => {
                  console.log('Results', results.rowsAffected);
              }
          );
      });
      }

      const _toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        var where = currentTasks[id].text;
        var completed;
        if (currentTasks[id]['completed']) completed=0;
        else completed=1;

        db.transaction(function (tx) {
          tx.executeSql(
            'UPDATE shoppingList SET completed=? where item=?',
            [completed,where],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
            }
          );
        });

        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
      };

      const _updateTask = (item) => {
        const currentTasks = Object.assign({},tasks);

        var before = currentTasks[item.id].text;
        var after = item.text;

        db.transaction(function (tx) {
          tx.executeSql(
            'UPDATE shoppingList SET item=? where item=?',
            [after,before],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
            }
          );
        });
  
        currentTasks[item.id]=item;
        setTasks(currentTasks);
      };
  
    const _handleTextChange = (text) => {
      setNewTask(text);
    };
    
    const viewData = () => {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM shoppingList;`, [], (tx, results) => {
          const rows = results.rows;

          for (let i = 0; i < rows.length; i++) {
            console.log("this is from viewData        ",rows.item(i));
          }
        })
      })

      console.log("===========================================");
    };

    const initData = () => {
      const temp={};

      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM shoppingList;`, [], (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            const ID = Date.now().toString();

            var completed;
            if (rows.item(i).completed==1) completed=true;
            else completed=false;

            const newTaskObject = {
               id: ID, text: rows.item(i).item, completed: completed };
            

            temp[ID] = newTaskObject;
            console.log("===========================================");
            console.log("this is initData speaking       temp is        ",temp);
            modifyTasks(temp);
          }
          
        })
      })

      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111");
      console.log("this is initData speaking       tasks is        ",tasks);
      
    };


    return (
        <View style={{ flex: 1 }}>
            <Button title="both" onPress={combined}/>
            <Button title="initData" onPress={initData}/>
            <Button title="toggleModal" onPress={toggleModal}/>
            <Modal isVisible={isModalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
            <TouchableOpacity style={styles.background} onPress={()=>setModalVisible(false)}/>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Title></Title>
                <View style={styles.addview}>
                    <TouchableOpacity style={styles.red} onPress={_deleteAll}>
                        <Text style={styles.white}>전체삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.red} onPress={viewData}>
                        <Text style={styles.white}>viewData</Text>
                    </TouchableOpacity>
                    <Input value={newTask} onChangeText={_handleTextChange} onSubmitEditing={_addTask}/>
                </View>
                <ScrollView style={styles.ScrollView}>
                    {Object.values(tasks).reverse().map((item) => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask}/>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height:'60%'
    },
    background: {
      flex:3, backgroundColor:'transparent',
    },
    ScrollView: {
      paddingVertical:5,left:14, top:24, width:320, maxHeight:150, position:'relative'
     },
     addview: {
      left:14, 
      top:20, 
      position:'relative',
      alignItems:'flex-end'
     },
     red: {
       width:71, height:38, borderRadius:5, backgroundColor: '#FF5454', padding:8, marginBottom:10
    },
    white: {
      color:'white', fontSize:14, textAlign:"center"
    }
  });
