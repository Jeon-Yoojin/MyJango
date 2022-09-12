import React, { useState } from "react"
import {View, Text, SafeAreaView, Alert} from "react-native"
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { COLORS } from "../constants/theme";
import { verify, sendPw } from "../utils/auth";
import { useIdContext } from '../IdProvider';

const Ver_pf = ({navigation}) => {
    const myId = useIdContext()
    const [email, setEmail] = useState('');    
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnSubmit = () => {
        if(nickname != '')
            verify(nickname);
            else
            {
                Alert.alert('새 닉네임을 입력해주세요.');
            }           
        
    };

    const handleOnSubmit1 = () => {
        if(email != '')
            sendPw(email);
            else
            {
                Alert.alert('이메일을 입력해주세요.');
            }           
        
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

        <Text style={{
            fontSize: 24,
            color: COLORS.black,                
            fontWeight: 'bold',
            marginVertical: 32,
        }}>비밀번호 변경</Text>

        <FormInput labelText="이메일"
        placeholderText="비밀번호 변경 링크를 받을 이메일을 입력하세요"
        onChangeText={value => setEmail(value)}
        value={email}
        />

        <FormButton labelText="이메일 보내기"
        handleOnPress={handleOnSubmit1}
        style={{width: '100%'}}/>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center'}}>
        </View>
    </SafeAreaView>
 );
};

export default Ver_pf;
