import React, {useState, useCallback, useEffect} from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GetThumbnail from './getThumbnail';
import IngredientIcon from './IngredientIcon';
import StarRating from './StarRating';

const recipeDetail = (recipeName) => {
  const [name, setName] = useState('');
  const [diff, setDiff] = useState('');
  const [detail, setDetail] = useState('');
  const [ingredient, setIngredient] = useState('');

  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  const loadDataCallback = useCallback(async()=>{
    let db;

  // DB를 열고, 전역변수 db에 열린 db 저장
  SQLite.openDatabase(
    {
      name: 'recipe.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log('success opening recipe.db')
      db = DB;

      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM recipe WHERE NAME=?;`, [recipeName], (tx, results) => {
          const rows = results.rows.item(0);
          console.log(rows);
          if(rows){
            setName(rows.name);
            setDiff(rows.difficulty);
            setDetail(rows.recipe);
            setIngredient(rows.ingredient);
          }
        })
      })

    },
    error => {
      console.error(error);
    }
  )
  },[]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <>
    <View style={styles.container}>
    <View style={{flexDirection:'row', alignItems:'center', marginTop:20, paddingBottom:15, borderBottomColor:'rgba(0,0,0,0.05)', borderBottomWidth:1.5}}>
    <TouchableOpacity>
        <Ionicons name="chevron-back" size={25} color={'black'}></Ionicons>
      </TouchableOpacity>
    <View style={{flexDirection:'row', flex:1, alignContent:'center', justifyContent:'center' }}>
      <Text style={[{fontSize:18, fontWeight:'600', textAlign:'center'}]}>레시피 추천</Text>
    </View>
    <TouchableOpacity>
        <Ionicons name="chevron-back" size={25} color={'white'}></Ionicons>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row', margin:14}}>
    <View>
    <Text style={[styles.title, styles.text]}>{name}</Text>
    <Text style={[styles.difficulty, styles.text]}>난이도</Text>
    <View style={{marginLeft:14}}><StarRating score={diff}/></View>
    </View>
    <View style={{flex:1, flexDirection:'row-reverse'}}>
    <GetThumbnail></GetThumbnail>
    </View>
    </View>
    
    <View>
    <View style={styles.flexview}>
    <Text style={[styles.subtitle, styles.text, {marginRight:5}]}>부족한 재료</Text>
    <TouchableHighlight style={styles.roundshape}>
      <Entypo name="leaf" size={15} color={'#4ECA14'} />
    </TouchableHighlight>
    </View>
    
    <View style={styles.ingredientContainer}>
    <IngredientIcon name={'당근'}/>
    <IngredientIcon name={'돼지고기'}/>
    </View>
    </View>

    <View style={{flexDirection:'column'}}>
    <View style={styles.flexview}>
    <Text style={[styles.subtitle, styles.text, {marginRight:5}]}>레시피</Text>
    <TouchableHighlight style={[styles.roundshape, {backgroundColor:'#DADCFC'}]}>
      <MaterialCommunityIcons name="clipboard-text" size={15} color={'#3A4EFE'} />
    </TouchableHighlight>
    </View>
    <View style={{flex:1, width: Dimensions.get('window').width}}>
    <ScrollView>
    <Text style={[styles.text, {flexShrink:1}]}>{detail}</Text>
  </ScrollView>
    </View>
    </View>
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column'
  },
  title: {
    //position: 'absolute',
    margin: 15,
    marginBottom:0,
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 30,
  /* identical to box height */
  },
  subtitle:{
    height: 25,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25
  },
  difficulty:{
    margin:15,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19
  },
  text:{
    fontFamily: 'Noto Sans',
    margin: 14,
    display: 'flex',
    alignItems: 'flex-end',
    letterSpacing: -0.03,
    color: '#121214',
  },
  roundshape:  {
    backgroundColor: '#E2F3D3',
    margin:14,
    marginLeft:0,
    height: 24,
    width: 24,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 12
  },
  ingredientContainer:{
    marginLeft:14,
    marginRight: 14,
    flexDirection:'row'
  },
  ingredientElement:{
    margin: 5,
    alignItems:'center'
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
    fontSize: 15
  },
  flexview:{
    display:'flex',
    flexDirection:'row'
  }
  })

export default recipeDetail;