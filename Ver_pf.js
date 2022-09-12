import React, { useState } from "react"
import {View, Text, SafeAreaView, Alert} from "react-native"
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { COLORS } from "../constants/theme";
import { verify, sendPw } from "../utils/auth";
import { useIdContext } from '../IdProvider';

const Ver_pf = ({navigation}) => {
    const myId = useIdContext()
    const [nickname, setNickname] = useState('');

    const handleOnSubmit = () => {
        if(nickname != '')
            verify(nickname);
        else
            Alert.alert('새 닉네임을 입력해주세요.');        
    };

    const handleOnSubmit1 = () => {
        sendPw(myId);      
    };

 return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor: COLORS.white,
        justifyContent: 'flex-start',
        padding: 20,
    }}>
        <View style={{borderBottomWidth: 1, borderColor: COLORS.gray, padding: 15, fontSize: 20}}><Text onPress={()=>navigation.navigate('SignInScreen')}>{'<'}</Text></View>
        <Text style={{
            fontSize: 24,
            color: COLORS.black,                
            fontWeight: 'bold',
            marginVertical: 32,
        }}>내 정보 수정</Text>

        <FormInput labelText="아이디"
        placeholderText={myId}
        keyboardType={'email-address'}
        />

        <FormInput labelText="닉네임"
        placeholderText="새 닉네임을 입력하세요"
        onChangeText={value => setNickname(value)}
        value={nickname}
        />

        <FormButton labelText="수정하기"
        handleOnPress={handleOnSubmit}
        style={{width: '100%'}}/>
        
        <View style={{alignItems: 'center', marginTop: 20, justifyContent: 'center'}}>
            <Text style={{marginLeft: 4, color: "#1E90FF"}}
                onPress={handleOnSubmit1}>비밀번호 변경?</Text>
            <Text style={{marginLeft: 4, color: COLORS.gray}}>클릭 시 비밀번호 변경을 위한 링크를 이메일로 전송합니다.</Text>
        </View>
    </SafeAreaView>
 );
};

export default Ver_pf;


/*
auth.js 에 

export const verify = (nickname) => {
    member.doc(email).update({
      nickname: nickname
    })
    .then(() => {
      console.log('verify!');
    });
  };

  export const sendPw = (email) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        ToastAndroid.show('이메일 전송', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('이메일 오류, 다시 입력하세요', ToastAndroid.SHORT);
      });;
  };
  

  추가
*/
