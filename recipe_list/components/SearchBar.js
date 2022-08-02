import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = (props)=>{

    return(
        <View style={styles.container} >
            <TextInput style={styles.textInputStyle}
                placeholder='원하는 재료명을 입력하세요.'
                value={props.searchText}
                onChangeText={(text)=>props.setSearchText(text)}
                onEndEditing={() => console.log("onEndEditing     ")}
                onSubmitEditing={props.onSubmit}
            />
            <TouchableOpacity onPress={()=>{}}>
                <Icon name="magnify" size={35} color='grey' style={{marginRight: 7}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      //padding:  
      width: 400,
    },
    textInputStyle:{
        width: 320,
        height: 45,
        borderWidth: 0.4,
        backgroundColor: "white",
        margin: 10
    },
})

export default SearchBar;