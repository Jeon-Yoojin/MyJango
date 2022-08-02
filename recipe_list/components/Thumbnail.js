import React from "react";
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity, Dimensions } from "react-native";

const Thumbnail = (props) => {
    const vId = props.vId;
    const urlToImg = 'https://i.ytimg.com/vi/' + vId + '/hqdefault.jpg';

    const goToSource = (vId, name, rId)=>{
        props.navigation.navigate('RECIPE_DETAIL', {
          recipeName: name,
          vId: vId,
          rId: rId
        });
      }

    return(
        <View style={styles.container}>
            <Pressable style={styles.pressContainer} onPress={() => {/*goto source*/ }}>
                {/* image */}
                <Image source={{
                    uri: urlToImg
                }}
                    style={styles.image}
                />
            </Pressable>
            <View style={{ marginHorizontal: 15, marginVertical: 6 }}>
                {/*    title */}
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
        
    )
}

export default Thumbnail;

const styles = StyleSheet.create({
    container:{
        
    },
    pressContainer:{
        //marginTop: 6,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    image:{
        width: Dimensions.get('window').width,
        height: 240,
    },
    title:{
        fontSize: 15,
        fontWeight: "600",
        //marginTop: 10,

    }
})