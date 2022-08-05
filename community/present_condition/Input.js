import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ value, onChangeText, onSubmitEditing }) => {
    return (
        <TextInput
          style={styles.input}
          placeholder="+      추가"
          maxLength={50}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      );
};

const styles = StyleSheet.create({
  input: {
    fontSize:17, 
    color:'#545454',
    padding:6, 
    width:319, height:38, borderRadius:10, backgroundColor: '#FFDFDD', flexDirection:"row", paddingHorizontal:20
    ,alignItems: 'center',
  },
});

export default Input;
