import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#B28DFF', '#FBE4FF', '#BFFCC6', '#FFF5BA', '#FFFFD1'];

const IngredientClickIcon = (props)=>{
    return (
        <View style={styles.ingredientElement}>
            <View style={[styles.ingredientIcon, { backgroundColor: colors[(props.index)%11] }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23}} >{props.name[0]}</Text>
            </View>
            <Text style={[styles.ingredientText, {flexShrink:1, maxWidth:60}]}>{props.name}</Text>
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

export default IngredientClickIcon;