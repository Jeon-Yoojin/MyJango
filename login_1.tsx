import Color from 'color';
import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import {Colors} from "react-native-paper";

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
            marginTop: 20,
            marginBottom: 70,
            padding: 10
        },
        Text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000000',
            marginTop: 30
        },
        input: {
            backgroundColor: Colors.grey100,
            width: '70%',
            height: 48,
            borderRadius: 5,
            alignSelf: 'center',
            position: 'relative',
            top: -35,
            left: 30
        },
        login: {
            fontSize : 20, 
            color: Colors.white, 
            backgroundColor:Colors.red300,
            height: 45,
            borderRadius: 10,
            textAlign: 'center',
            padding: 10,
            width: '90%',
            marginTop: 20
        },
        otherButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
            marginRight: 40
        },
        otherButtonText: {
            fontWeight: '500',
            fontSize: 15,
            color: Colors.grey500
        }
     })
 return (
<View style={styles.signInTextContainer}>
	<Text style={styles.TitleText}>MY JangGo에서 식재료를{'\n'}관리해보세요!</Text>
    
    <Text style={styles.Text}>아이디</Text>
    <TextInput  style={styles.input} placeholder="  아이디를 입력하세요"/>
    
    <Text style={styles.Text}>비밀번호</Text>
    <TextInput  style={styles.input} placeholder="  비밀번호를 입력하세요"/>

    <Pressable
        onPress={() => console.log("login")}>
      <Text style={styles.login}>로그인</Text>
      </Pressable>

      <View style={styles.otherButtonContainer}>
	<Pressable onPress={() => console.log("find_pw")}>
    	<Text style={styles.otherButtonText}>비밀번호 찾기  </Text>
    </Pressable>
    <Text style={styles.otherButtonText}>|</Text>
    <Pressable onPress={() => console.log("add_newpf")}>
    	<Text style={styles.otherButtonText}>  회원가입하기</Text>
    </Pressable>
</View>
</View>


 )
};

export default App;
