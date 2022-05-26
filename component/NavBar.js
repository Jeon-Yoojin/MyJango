import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const ChatFillPath = require('../../android/app/src/main/assets/images/chat-fill.png');
const FridgeFillPath = require('../../android/app/src/main/assets/images/fridge-fill.png');
const HomeFillPath = require('../../android/app/src/main/assets/images/home-fill.png');
const LightbulbFillPath = require('../../android/app/src/main/assets/images/lightbulb-fill.png');


const NavBar = (props)=>{
    return(
        <View style={styles.navbar}>
            <TouchableOpacity>
            <View style={styles.navbarElement}>
            <Image style={styles.Img} source={HomeFillPath} tintColor='#FF615B'/>
            <Text style={styles.text}>홈</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.navbarElement}>
            <Image style={styles.Img} source={FridgeFillPath}/>
            <Text style={styles.text}>재료 관리</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.navbarElement}>
            <Image style={styles.Img} source={LightbulbFillPath}/>
            <Text style={styles.text}>레시피 추천</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.navbarElement}>
            <Image style={styles.Img} source={ChatFillPath}/>
            <Text style={styles.text}>커뮤니티</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingLeft: 20,
        paddingRight: 33,
        paddingTop: 15,

        borderTopColor:'rgba(0,0,0,0.05)',
        borderTopWidth:1.5,
    },
    navbarElement:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    Img:{
        height: 30,
        width: 25,
        marginHorizontal: 15
    },
    text:{
        color: '#C6C6C6',
        fontWeight: '700',
        marginVertical: 10
    }
})
export default NavBar;