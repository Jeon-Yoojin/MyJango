import React, { useState } from "react"
import {View, Text, SafeAreaView, Alert} from "react-native"
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { COLORS } from "../constants/theme";
import { signUp, signOut } from "../utils/auth";

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnSubmit = () => {
        if(email != '' && password != '' && confirmPassword != ''){
            if(password == confirmPassword){
                signUp(email, password, nickname);
            }
            else{
                Alert.alert('비밀번호 확인이 일치하지 않습니다.');
            }
            navigation.navigator('SIGNIN');  
                  
        }
    };

 return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor: COLORS.white,
        justifyContent: 'flex-start',
        padding: 20,
    }}>
        <Text style={{
            fontSize: 24,
            color: COLORS.black,
            fontWeight: 'bold',
            marginVertical: 32,
        }}>회원 가입</Text>

        <FormInput labelText="아이디"
        placeholderText="아이디를 입력하세요"
        onChangeText={value => setEmail(value)}
        value={email}
        keyboardType={'email-address'}
        />

        <FormInput labelText="닉네임"
        placeholderText="닉네임을 입력하세요"
        onChangeText={value => setNickname(value)}
        value={nickname}
        />

        <FormInput labelText="비밀번호"
        placeholderText="비밀번호를 입력하세요"
        onChangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
        />

        <FormInput labelText="비밀번호 확인"
        placeholderText="비밀번호를 다시 입력하세요"
        onChangeText={value => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
        />

        <FormButton labelText="회원 가입"
        handleOnPress={handleOnSubmit}
        style={{width: '100%'}}/>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'center', marginTop: 20}}>
                <Text style={{marginLeft: 4, color: COLORS.gray}}
                onPress={()=> navigation.navigate('SIGNIN')}>로그인 하기</Text>
            </View>
    </SafeAreaView>
 );
};

export default SignUpScreen;
