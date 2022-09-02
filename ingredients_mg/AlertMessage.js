import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, ColorPropType } from "react-native";

const AlertMessage = ()=>{

    Alert.alert(
        "확인",
        "확인을 누르면 해당 식품이 삭제됩니다",
        [
            {
                text:"확인",
                onPress: ()=>console.log("확인"),
            },
            {
                text:"취소",
                onPress: ()=>console.log("취소"),
                style: "cancel"
            }
        ]
    )
}

export default AlertMessage;
