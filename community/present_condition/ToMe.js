import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import Input from "./Input";
import { images } from './images'


const ToMe = ({ item, deleteToMe, updateToMe }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if (isEditing) {
            const edited = Object.assign({}, item, { text });
            setIsEditing(false);
            updateToMe(edited);
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
          <Text style={styles.text}>{item.text}</Text>
          <IconButton type={images.edit} onPressOut={_handleUpdateButtonPress} />
          <IconButton type={images.delete} id={item.id} onPressOut={deleteToMe}/>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical:7,
      paddingHorizontal:10, 
      width:319, 
      height:38, 
      borderRadius:10, 
      backgroundColor: 'white', 
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    text: {
      fontSize:17, color:'#545454', marginTop:2, width:200
    },

  });


  export default ToMe;
