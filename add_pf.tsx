import Color from 'color';
import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import {Colors} from "react-native-paper";
import { white } from 'react-native-paper/lib/typescript/styles/colors';

const App = () => {

    const styles = StyleSheet.create({
        signInTextContainer: {
            marginTop: '23%',
            marginLeft: '9%'
        },
        TitleText: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#000000',
            lineHeight: 29.3,
            padding: 10
        },
        Text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000000',
            marginTop: 15
        },
        input: {
            backgroundColor: Colors.grey100,
            width: '90%',
            marginTop:10,
            height: 48,
            borderRadius: 5,
        },
        deleteinput:{
            backgroundColor: Colors.grey500,
            color: Colors.white,
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: 100,
            height: 20,
            width: 20,
            position: 'relative',
            top: -35,
            left: 120,
            alignSelf: 'center'
        },
        add_pf: {
            fontSize : 20, 
            color: Colors.white, 
            backgroundColor:Colors.red300,
            height: 45,
            borderRadius: 10,
            textAlign: 'center',
            padding: 10,
            width: '90%',
            marginTop: 10
        }
     })
 return (
<View style={styles.signInTextContainer}>
	<Text style={styles.TitleText}>회원 가입</Text>
    
    <Text style={styles.Text}>아이디</Text>
    <TextInput  style={styles.input} placeholder="  아이디를 입력하세요"/>
    <Pressable
        onPress={() => console.log("delete")}>
      <Text style={styles.deleteinput}>X</Text>
      </Pressable>
      
    <Text style={styles.Text}>닉네임</Text>
    <TextInput  style={styles.input} placeholder="  닉네임을 입력하세요"/>
    <Pressable
        onPress={() => console.log("delete")}>
      <Text style={styles.deleteinput}>X</Text>
      </Pressable>

    <Text style={styles.Text}>비밀번호</Text>
    <TextInput  style={styles.input} placeholder="  비밀번호를 입력하세요"/>
    <Pressable
        onPress={() => console.log("delete")}>
      <Text style={styles.deleteinput}>X</Text>
      </Pressable>

    <Text style={styles.Text}>비밀번호 확인</Text>
    <TextInput  style={styles.input} placeholder="  비밀번호를 다시 입력하세요"/>
    <Pressable
        onPress={() => console.log("delete")}>
      <Text style={styles.deleteinput}>X</Text>
      </Pressable>

    <Pressable
        onPress={() => console.log("add_pf")}>
      <Text style={styles.add_pf}>회원 가입</Text>
      </Pressable>

</View>


 )
};

export default App;
