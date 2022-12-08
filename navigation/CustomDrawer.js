import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SQLite from 'react-native-sqlite-storage';
import Title from '../shopping_list/Title';
import Input from '../shopping_list/Input';
import Task from '../shopping_list/Task';
import { signOut } from '../login/utils/auth';
import { useIdContext } from '../../IdProvider';

var db = SQLite.openDatabase({ name: 'recipe.db' });

const CustomDrawer = props => {
    const user_name = useIdContext();

    const [isModalVisible, setModalVisible] = useState(false);

    useEffect ( ()=>{ initData(); },[])
    
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});
        
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
        db.transaction(function (tx) {
            tx.executeSql(
                'CREATE TABLE if not exists shoppingList (item TEXT, completed INTEGER)', [],(tx, results) => {}
            );
        })
        
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO shoppingList (item, completed) VALUES (?,?)', [newTask, 0], (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
        
    };
    
    const _deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        var temp = currentTasks[id].text;
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM shoppingList where item=?', [temp], (tx, results) => {
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
                'DELETE FROM shoppingList', [], (tx, results) => {
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
                'UPDATE shoppingList SET completed=? where item=?', [completed,where], (tx, results) => {
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
                'UPDATE shoppingList SET item=? where item=?', [after,before], (tx, results) => {
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
    
    const initData = () => {
        const temp={};
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM shoppingList;`, [], (tx, results) => {
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    const ID = Date.now().toString();
                    var completed;
                    if (rows.item(i).completed==1) completed=true;
                    else completed=false;
                    const newTaskObject = { id: ID, text: rows.item(i).item, completed: completed };
                    temp[ID] = newTaskObject;
                    const final = Object.assign({},temp);
                    setTasks(final);
                }        
            })
        });
    };
    
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)}  transparent={true}>
                    <TouchableOpacity style={styles.background} onPress={()=>setModalVisible(false)}/>
                    <View style={styles.container}>
                        <Title></Title>
                        <View style={styles.addview}>
                            <TouchableOpacity style={styles.red} onPress={_deleteAll}>
                                <Text style={styles.white}>전체삭제</Text>
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

                
                <View style={{flexDirection: 'row', marginHorizontal: 3, borderBottomColor: 'grey', borderBottomWidth: 0.3, marginVertical: 10}}>
                <Ionicons name='person-circle' size={70} style={{color: '#C4C4C4', margin: 5}}/>
                <View style={{justifyContent: 'center'}}>
                <Text
                    style={{
                        fontSize: 20,
                        marginBottom: 5,
                        color: '#1A1A1A'
                    }}>
                    {user_name.myNickname}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginBottom: 5,
                        color: '#1A1A1A'
                    }}>
                    {user_name.myId}
                </Text>
                </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
                <DrawerItem label="장보기 리스트" onPress={() => { setModalVisible(true); }}/>
            </DrawerContentScrollView>
            <View style={{ padding: 20, backgroundColor: '#FF5454' }}>
                <TouchableOpacity onPress={signOut}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="exit-outline" size={22} style={{ color: 'white' }} />
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'white',
                                marginLeft: 5,
                            }}>
                            로그아웃
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 4, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'center'
    },
    background: {
        flex:3, backgroundColor:'transparent',
    },
    ScrollView: {
        paddingVertical:7, width:340, maxHeight:150
    },
    addview: {
        alignItems:'flex-end'
    },
    red: {
        width:71, height:38, borderRadius:5, backgroundColor: '#FF5454', padding:8, marginBottom:10
    },
    white: {
        color:'white', fontSize:14, textAlign:"center"
    }
  });