import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Button, TouchableOpacity, Text } from 'react-native';
import Modal from "react-native-modal";
import Title from './components/Title';
import Input from './components/Input';
import Task from './components/Task';

export default function App() {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    
    };
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        1: { id: '1', text: 'todo list 1', completed: false },
        2: { id: '2', text: 'todo list 2', completed: false },
        3: { id: '3', text: 'todo list 3', completed: false },
        4: { id: '4', text: 'todo list 4', completed: false },
        5: { id: '5', text: 'todo list 5', completed: false },
      });

      const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
          [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
      };

      const _deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
      };

      const _deleteAll = () => {
        const currentTasks = [];
        setTasks(currentTasks);
      }

      const _toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
      };

      const _updateTask = (item) => {
        const currentTasks = Object.assign({},tasks);
        currentTasks[item.id]=item;
        setTasks(currentTasks);
      };
  
    const _handleTextChange = (text) => {
      setNewTask(text);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal}/>
            <Modal isVisible={isModalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
            <TouchableOpacity style={styles.background} onPress={()=>setModalVisible(false)}/>
            <View style={styles.container}>
                <StatusBar style="auto" />
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
