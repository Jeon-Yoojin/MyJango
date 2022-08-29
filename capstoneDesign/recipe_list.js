import React, { useCallback,useEffect, useState, createRef , useMemo } from 'react';
import DelayInput from 'react-native-debounce-input';
import {SafeAreaView, View, Text, Button, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";
import YouTube from 'react-native-youtube';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation: '~/db.sqlite', });
var db2 = SQLite.openDatabase({ name: 'recipe.db', createFromLocation: '~/recipe.db', });

const Recipe_youtube_list = ()=>{
  let searchLike = false;
  const [SLselect, updateSL] = useState(searchLike ? Colors.red200 : Colors.white);
  const modifySL = useCallback(() => {
    if(searchLike){
    searchLike = false;
    updateSL(Colors.white);
    setFinalIngList([]);
    }
    else{
    searchLike = true;
    searchDate = false;
    updateSD(Colors.white);
    updateSL(Colors.red200);
    getbookmark;
    setFinalIngList(BMlist);
    searchWith;
    }
    }, []);

    let searchDate = false;
  const [SDselect, updateSD] = useState(searchDate ? Colors.red200 : Colors.white);
  const modifySD = useCallback(() => {
    if(searchDate){
    searchDate = false;
    updateSD(Colors.white);
    setFinalIngList([]);
    }
    else{
    searchDate = true;
    searchLike = false;
    updateSL(Colors.white);
    updateSD(Colors.red200);
    getExpired;
    setFinalIngList(expired);
    searchWith;
    }
    }, []);

    const inputRef = createRef();

    const [text, setText] = useState('');
  
    
    //const YOUTUBE_API_KEY = 'AIzaSyBBRIw7wYh9bXZhMOietmQgERKZZMwMzmU';
    let videoList = [];
    const [thumbnailList, setthumbnailList] = useState([]);

    async function _getThumbnail(query) {
    const optionParams = {
      q: query,
      part: "snippet",
      key: YOUTUBE_API_KEY,
      type: "video",
      maxResults: 10,
      regionCode: "KR",
      videoDuration: "short"
    };
    optionParams.q = encodeURI(optionParams.q);
  
    var url = "https://www.googleapis.com/youtube/v3/search?";
    for (var option in optionParams) {
      url += option + "=" + optionParams[option] + "&";
    }

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };
    let res = await fetch(url, options);
    let resOk = res && res.ok;
    
    if (resOk && finalFoodList.length!=0) {
      console.log("resOK");
      const resData = await res.json();
      for(var i=0;i<10;i++){
        const vId = resData['items'][i]['id']['videoId'];
        const imguri = 'https://i.ytimg.com/vi/'+vId+'/hqdefault.jpg';
        videoList.push(imguri);
      }
    }
    else {
      console.log("resOK false condition");
    }
    return (videoList)
  }
 



  const videolist = _getThumbnail(finalFoodList);
  const getData = () => {
    videolist.then((val) => {
        setthumbnailList(val);
    });
  };

  useEffect(() => {
    getData();
  },[finalFoodList]);

  console.log('thumbnailList', thumbnailList);

  const viewRecipe = () => {

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM recipe_ingredients',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
             temp.push(results.rows.item(i));
          }        
          console.log(temp);
        }       
      );
    });
 
  }


const [BMlist, setBMlist] = useState([]);
  const getbookmark = () => {

    db2.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM ingredients WHERE bookmark=1', //쿼리문 갈아엎든가
        [],
        (tx, results) => {
          var bookmarks = [];
          for (let i = 0; i < results.rows.length; ++i) {
             bookmarks.push(results.rows.item(i));
          }
          setBMlist(bookmarks);
        }
      );
    });
  }

  const [expired, setExpired] = useState([]);

  const getExpired = () => {

    db2.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients WHERE expiration = ?',
        [Date+8],
        (tx, results) => {
          var expired = [];
          for (let i = 0; i < results.rows.length; ++i) {
             expired.push(results.rows.item(i));
          }
          setExpired(expired);
          
        }
      );
    });
  }

  const [finalFoodList, setFinalFoodList]=useState([]);
  const [finalIngList, setFinalIngList]=useState([]);

   const searchWith = () => {

    let query = 'SELECT B.name, C.recipe_count FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
    for (let i = 0; i < finalIngList.length; ++i) {
      query = query + " trim(A.ingredient_name) = "+ String(finalIngList[i].name);
      testing = testing + String(finalIngList[i].name);
      if (i != finalIngList.length - 1) {
        query = query + " OR";
      }
    }
    query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 3 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";


    db.transaction((tx) => {
    
      tx.executeSql(query,[],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
             temp.push(results.rows.item(i).name);
          }
          console.log("------------------------------------------------------------------ ",temp);
          setFinalFoodList(temp);
        }
      );
    });

  }

  
 return(
  <View style={styles.view}>
  <View style={styles.magniview} >
  <DelayInput style={styles.textInputStyle}
  value={text}
  onChangeText={setText}
  onEndEditing={()=>{console.log("onEndEditing     " +text); setFinalIngList([text, text, text, text]); searchWith;}}
  inputRef={inputRef}
/>

    <TouchableOpacity onPress={searchWith}>
      <Icon name="magnify" size={30} color={Colors.grey500} style={{margin:7}} />
    </TouchableOpacity>
    
  </View>
  <Text style = {styles.recommendText} >레시피 추천 </Text>
  <View style = {styles.buttonview}>
    <TouchableOpacity style={[styles.button, {backgroundColor: SDselect}]} onPress={modifySD} >
      <Text>유통기한</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, {backgroundColor: SLselect}]} onPress={modifySL}>
      <Text>즐겨찾기</Text>
    </TouchableOpacity>
    
  </View>


  <ScrollView style={styles.scroll}>
    <Text onPress={tlqkf}>일단 날짜 먼저</Text>
{thumbnailList.map((thumbnail, index)=>{
                 return(thumbnailList[index] ? <Image source={{uri: thumbnail}} key={index} style={{width:380, height:216, margin:5}}/> : <Text>Loading</Text>)
             })
 }
</ScrollView>
 
 
 
 
  
 
 </View>)
};


const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'flex-start'},
  scroll: {flex: 1},
  infoView: {width:400},
  title: {fontSize: 15, fontWeight: "300", flex:1},
  button: {margin:5, padding:5},
  buttonview: {flexDirection: "row",paddingLeft:18, margin:5},
  recommendText: {marginTop:15, marginLeft:25, marginBottom:5, fontSize:20, fontWeight:"700"},
  downdowndownview:{margin:10},
  image:{width:380, height:219, margin:5},
  magniview:{width:400, flexDirection: "row", padding:5, justifyContent:'space-evenly'},
  textInputStyle: {color: "green", width : 300, height : 50, borderWidth: 1, backgroundColor: "white", margin:10}
  });



export default Recipe_youtube_list;
