import React, {useState} from "react";
import {View, Text, SafeAreaView} from "react-native";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import {COLORS} from '../constants/theme';
import { singIn } from "../utils/auth";

const SignInScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleOnSubmit = () => {
        if(email != '' && password != ''){
            singIn(email, password);
        }
    };

 return (
    <SafeAreaView
        style={{
            backgroundColor: COLORS.white,
            flex:1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding:20,
        }}>
            <Text style={{
                fontSize: 24,
                color: COLORS.black,
                fontWeight: 'bold',
                marginVertical: 32,
            }}>
                {'\n'}{'\n'}My JangGo에서 식재료를{'\n'}관리 해보세요!{'\n'}
            </Text>

            <FormInput labelText="아이디" 
            placeholderText="아이디를 입력하세요"
            onChangeText={value => setEmail(value)}
            value={email}
            keyboardType={'email-address'}
            />

            <FormInput labelText="비밀번호" 
            placeholderText="비밀번호를 입력하세요"
            onChangeText={value => setPassword(value)}
            value={password}
            secureTextEntry={true}
            />

            <FormButton labelText="로그인"
            handleOnPress={handleOnSubmit}
            style={{width: '100%'}}/>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <Text style={{marginLeft: 4, color: COLORS.gray}}
                onPress={()=> navigation.navigate('SignUpScreen')}>회원가입 하기</Text>
            </View>
        </SafeAreaView>
 );
};

export default SignInScreen;
