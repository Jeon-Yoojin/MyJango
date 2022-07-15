import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const PeriodDropDown = ({setSelectValue})=>{
    const [selectedValue, setSelectedValue] = useState();
	const [isTextInputVisible, setTextInputVisible] = useState(false);

    return(
		<View>

	
        <Picker 
		style={{width:'70%'}}
		selectedValue={selectedValue}
		onValueChange={(itemValue,itemIndex) => {
			setSelectedValue(itemValue);
			setSelectValue(itemValue);
			if(itemValue=='직접 입력')
		  		setTextInputVisible(true);
			else
				setTextInputVisible(false);
			}
		}
		>
	    
		<Picker.Item label="선택" value="선택"/>
		<Picker.Item label="3일" value="3"/>
		<Picker.Item label="7일" value="7" />
		<Picker.Item label="14일" value="14"/>
		<Picker.Item label="직접 입력" value="직접 입력"/>
        
		
      
		</Picker>

		<View>
			{isTextInputVisible && 
			<View style={styles.grey}>
			<TextInput  
			style={styles.TextInput}
			onChangeText = {(text) => {
				setSelectedValue(text);
				setSelectValue(text);
				}}
			placeholder = "기간 입력" >
				</TextInput>
				<Text style={styles.day}>일</Text>
			</View>}
		
		
		
		</View>

		</View>
		
    )
}

const styles = StyleSheet.create({

	grey: {
		paddingHorizontal:20, marginVertical:6, width:230, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row", justifyContent:"space-between"  
	},
	day: {
		margin:6, fontSize: 17, color:'#545454'
	},
	TextInput: {
		fontSize: 17, color:'#545454'

	}
	
   });

export default PeriodDropDown;
