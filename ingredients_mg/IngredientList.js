import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SQLite from 'react-native-sqlite-storage';

const FreezerPath = require('../../android/app/src/main/assets/images/freezer.png');
const FridgePath = require('../../android/app/src/main/assets/images/fridge.png');
const RoomPath = require('../../android/app/src/main/assets/images/room.png');

const CategoryImage = (props)=>{
    var imgpath;
    //셋 다 지정되지 않은 경우도 따로 추가해야 함

    switch(props.imgpath){
        case 'freezer':
            imgpath = FreezerPath;
            break;
        case 'fridge':
            imgpath = FridgePath;
            break;
        case 'room':
            imgpath = RoomPath;
            break;
    }
    return(
        <Image
            style={{ height: 55, width: 55, marginLeft: 20, marginRight: 10 }}
            source={imgpath}
        />
    )
}

function DeleteIngredient(name){
    let db = SQLite.openDatabase({ name: 'recipe.db' });
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM ingredients where name=?',
            [name],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        '완료',
                        '성공적으로 삭제되었습니다',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        { cancelable: false }
                    );
                }
            }
        );
    });
}

const IngredientList = (props) => {
    const [color, setColor] = useState('#EFEFEF');

    function getDday(expiration) {
        var today = new Date();
        today = new Date(today.getFullYear(), (today.getMonth()+1), today.getDate())
        //console.log('month: ', today.getMonth(), 'day: ', today.getDate())
        var dday = new Date(expiration.split('-')[0], expiration.split('-')[1], expiration.split('-')[2]);
        var gap = dday.getTime()-today.getTime();
        var day = Math.ceil(gap/(1000*60*60*24));

        return day;
    }

    const Dday = getDday(props.expiration)
    const AlertMessage = ()=>{
        
        Alert.alert(
            "확인",
            "확인을 누르면 해당 식품이 삭제됩니다",
            [
                {
                    text:"확인",
                    onPress: ()=>{
                        console.log("확인");
                        setColor('red');
                        DeleteIngredient(props.name);
                    }
                },
                {
                    text:"취소",
                    onPress: ()=>console.log("취소"),
                    style: "cancel"
                }
            ]
        )
        
    }
    
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CategoryImage imgpath={props.category}/>
                <View>
                    <Text style={[styles.text, styles.name]}>{props.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight style={[styles.rectshape, { backgroundColor: '#E1615B' }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, fontWeight: '400', textAlign: 'center' }}>{Dday<5? '임박':'D-'+Dday}</Text>
                        </TouchableHighlight>
                        <Text style={[styles.text, styles.expDate]}>{props.expiration}까지</Text>
                    </View>
                </View>
            </View>
            <View style={{marginRight:20}}>
                <TouchableOpacity onPress={AlertMessage}>
                <FontAwesome name="circle-o" color={color} size={25} style={{ shadowColor: 'rgba(0, 0, 0, 0.1)', color: '#DCDCDC' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rectshape:{
        height:20,
        width: 38,
        borderRadius: 6,
        marginLeft:1.5,
        marginRight:1.5
    },
    text:{
        fontFamily: 'Noto Sans',
        margin:5,
        display: 'flex',
        alignItems: 'flex-end',
        letterSpacing: -0.03,
        color: '#121214',
    },
    name:{
        fontWeight: '900',
        fontSize: 17,
        lineHeight: 23,
    },
    expDate:{
        color:'#9C9C9C'
    }
})
export default IngredientList;