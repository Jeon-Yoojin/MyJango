import React from "react"
import {View, Text} from "react-native"
import {COLORS} from '../constants/theme';
import { signOut, singIn } from "../utils/auth";

const HomeScreen = () => {
    const handleOnSubmit1 = () => {
        signOut();
    };
 return (
    <View>
        <Text style={{ alignItems: 'center', margin: 20, fontSize: 20}}>홈화면</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Text style={{marginLeft: 4, color: COLORS.gray}}
            onPress={handleOnSubmit1}>로그아웃</Text>
        </View>

    </View>
            
 );
};

export default HomeScreen;
