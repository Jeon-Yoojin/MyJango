import React, { useState } from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const DropDown = ({setSelectValue})=>{
    const [selectedValue, setSelectedValue] = useState();

    return(
        <Picker 
		style={{width:'30%'}}
		selectedValue={selectedValue}
		onValueChange={(itemValue,itemIndex) => {
			setSelectedValue(itemValue);
			setSelectValue(itemValue);
			}
		}
		>
		<Picker.Item label="전체" value="all"/>
		<Picker.Item label="냉동" value="freezer" />
		<Picker.Item label="냉장" value="fridge"/>
        <Picker.Item label="실온" value="room"/>
		</Picker>
    )
}

export default DropDown;
