import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const IngredientIcon = (props)=>{
    return (
        <View style={styles.ingredientElement}>
            <TouchableHighlight style={[styles.ingredientIcon, { backgroundColor: 'pink' }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>{props.name[0]}</Text>
            </TouchableHighlight>
            <Text style={[styles.ingredientText]}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ingredientContainer:{
        marginLeft:14,
        marginRight: 14,
        flexDirection:'row'
      },
      ingredientElement:{
        margin: 8,
        alignItems:'center',
        justifyContent:'center'
      },
      ingredientIcon:{
        height: 57,
        width: 57,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 33
      },
      ingredientText:{
        marginTop: 3,
        fontWeight: '600',
        fontSize: 15,
        fontFamily: 'Noto Sans',
        display: 'flex',
        alignItems: 'flex-end',
        letterSpacing: -0.03,
        color: '#121214',
      },
    })

export default IngredientIcon;
