import React, {useState, useEffect} from 'react';
import { ScrollView, Button, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import DropDown from './DropDown';
import IngredientClickIcon from './IngredientClickIcon';
import IngredientList from './IngredientList';
import { useIsFocused } from '@react-navigation/native';

const user_name = '마이장고'

const ManagePage = ({navigation})=>{
    const isFocused = useIsFocused()
    const [selectedValue, setSelectedValue] = useState();
    const [ItemList, setItemList] = useState([]);

    let db = SQLite.openDatabase({ name: 'recipe.db'});
    useEffect(() => {
        if(isFocused){
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ingredients ORDER BY expiration;`,
            //유통기한 임박순으로 정렬함
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i){
                        temp.push(results.rows.item(i));
                    }
                    setItemList(temp);
                }
            );
        });
    }
    }, [isFocused]);
    
    const setSelectValue = (selectvalue)=>{
        setSelectedValue(selectvalue);
    }

    //console.log('selected value is: ', selectedValue);
    return(
        <View>
            <View style={{marginTop:32}}>
                <Text style={styles.guide}>{user_name}님,{"\n"}식품을 확인해보세요!👀</Text>
            </View>
            <ScrollView horizontal={true} style={styles.ingredeintContainer}>
            {ItemList.map((Item, index)=>{
                    return(ItemList[index] ? <TouchableOpacity key={index} onPress={()=>{
                        navigation.navigate('INGREDIENTS_MODIFY', {
                        name: Item.name
                      });
                    }}><IngredientClickIcon name={Item.name} key={index} index={index}/></TouchableOpacity> : <Text>Loading</Text>)
                })
            }
            </ScrollView>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <DropDown setSelectValue={setSelectValue}></DropDown>
            <TouchableOpacity onPress={()=>navigation.navigate('INGREDIENTS_ADD')}>
                <Text style={{fontSize:15, marginRight:20}}>추가</Text>
            </TouchableOpacity>
            </View>
            <ScrollView>
            {ItemList.map((Item, index)=>{
                    if(selectedValue==undefined||selectedValue=='all'){
                        return(ItemList[index]? <TouchableOpacity key={index} onPress={()=>{
                            navigation.navigate('INGREDIENTS_MODIFY', {
                            name: Item.name
                          })}}><IngredientList name={Item.name} expiration={Item.expiration} category={Item.category} key={index}/></TouchableOpacity> :<Text>Loading</Text>)
                    }
                    else{
                        if(Item.category==selectedValue){
                            return(ItemList[index]? <TouchableOpacity key={index} onPress={()=>{
                                navigation.navigate('INGREDIENTS_MODIFY', {
                                name: Item.name
                              })}}>
                            <IngredientList name={Item.name} expiration={Item.expiration} category={Item.category} key={index}/></TouchableOpacity> :<Text>Loading</Text>)
                        }
                    }
                })
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    guide:{
        marginLeft:14,
        marginRight:14,
        fontFamily: 'Noto Sans',
        fontWeight: '900',
        fontSize: 25,
        lineHeight: 40,
        display: 'flex',
        alignItems: 'flex-end',
        letterSpacing: -0.03,
        color: '#121214'
        
    },
    ingredeintContainer:{
        margin: 25,
        flexDirection:'row'
    }
})

export default ManagePage;
