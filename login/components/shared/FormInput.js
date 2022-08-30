import React from "react"
import {View, Text, TextInput} from "react-native"
import { COLORS } from "../../constants/theme";

const FormInput = ({
    labelText='',
    placeholderText = '',
    onChangeText = null,
    value = null,
    ...more
}) => {
 return (
 <View style={{width: '100%', marginBottom: 20}}>
    <Text style={{fontSize: 17, fontWeight:'bold'}}>{labelText}</Text>
    <TextInput style = {{
        padding: 10,
        backgroundColor: COLORS.lightgray,
        width: '100%',
        borderRadius: 10,
        marginTop: 10
    }}
    placeholder={placeholderText}
    onChangeText={onChangeText}
    value={value}
    {...more}
    />
    </View>
 );
};

export default FormInput;
