import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

const StarRating = (props)=>{
    return(
        <View style={{flexDirection:'row'}}>
            {[1, 2, 3, 4, 5].map((index)=>{
                return(
                    <Star key={index} color={(index<=props.score)?'#FFD861':'#E9E9E9'}></Star>
                );
            })}
        </View>
    )
}
const Star = (props)=>{
    return(
        <TouchableHighlight style={[styles.star, {backgroundColor:props.color}]}>
        <></>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    star: {
        height:12,
        width: 20,
        borderRadius: 10,
        marginLeft:1.5,
        marginRight:1.5
    },
    })

export default StarRating;