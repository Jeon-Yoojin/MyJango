import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const InButton = (Props) => {

    const [color, setcolor] = useState("lightgray");
    const bgcolor = () =>{
        setcolor("skyblue");
    }

    const styles = StyleSheet.create({
        btnPress: {
            backgroundColor: color, borderRadius: 10, margin: 10, fontSize: 18, padding:3
          },
          btnNormal: {
            backgroundColor: color, borderRadius: 10, margin: 10, fontSize: 18, padding:3
          }
        });
    const [isPress, setIsPress] = useState(false);
    const touchProps = {
  
      style: isPress ? styles.btnPress : styles.btnNormal,
      onPress: () => setIsPress(!isPress),
  
    };
  

  return(
    <TouchableOpacity {...touchProps} underlayColor='skyblue'>
        <Text style={{fontSize:18}}>{Props.text}</Text>
        </TouchableOpacity>
        )
  };
export default InButton;
