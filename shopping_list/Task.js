import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import Input from "./Input";
import { images } from "../community/present_condition/images";

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, { text });
            setIsEditing(false);
            updateTask(editedTask);
        }
  };

    return isEditing ? (
        <Input
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={_onSubmitEditing}
      />
        
    ) : (
        <View style={styles.container}>
          <IconButton
            type={item.completed ? images.completed : images.uncompleted}
            id={item.id}
            onPressOut={toggleTask}
      />
          <Text style={item.completed ? styles.completed : styles.text}>{item.text}</Text>
          {item.completed || (
        <IconButton type={images.edit} onPressOut={_handleUpdateButtonPress} />
      )}
          <IconButton type={item.completed ? images.deletecompleted : images.delete} id={item.id} onPressOut={deleteTask}/>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderWidth:1, 
      marginVertical:7,
      width:340, 
      height:38, 
      borderRadius:10, 
      backgroundColor: 'white', 
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    text: {
      fontSize:17, color:'#545454', marginTop:2, width:150
    },
    completed: {
      fontSize:17, color:'#C4C4C4', textDecorationLine: 'line-through'
    }
  });


  export default Task;
