import React, { createRef } from 'react';
import DelayInput from 'react-native-debounce-input';
import {  View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

import { NavigationContainer } from '@react-navigation/native';
//import SearchLike from './user/SearchLike';

var db = SQLite.openDatabase({ name: 'recipe.db', createFromLocation:"~www/recipe.db"});
var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});

export default function Recipe_list({navigation}) {
    let date = getToday();
    let nearExp = getNearExp();
    let searchLike = false;
    let searchDate = false;

  const [finalFoodList, setFinalFoodList] = useState([]);
  const [RecipeIdList, setRecipeIdList] = useState([]);
  const [GetThumbnail, setGetThumbnail] = useState('');
  const [finalIngList, setFinalIngList] = useState([]);

    const [SLselect, updateSL] = useState(searchLike ? Colors.red200 : Colors.white);
    const modifySL = useCallback(() => {
        if (searchLike) {
            searchLike = false;
            updateSL(Colors.white);
        }
        else {
            searchLike = true;
            updateSL(Colors.red200);
            getbookmark();
            
        }
    }, []);

    const [SDselect, updateSD] = useState(searchDate ? Colors.red200 : Colors.white);
    const modifySD = useCallback(()=>{
        if (searchDate) {
            console.log('true인 상태')
            searchDate = false;
            updateSD(Colors.white);
        }
        else {
            console.log('false인 상태')
            searchDate = true;
            console.log(searchDate)
            updateSD(Colors.red200);
            getExpired();
        }
      }, []);

    const inputRef = createRef();

    const [text, setText] = useState('');
    //const goRD = useCallback(() => navigation.navigate("Recipe_detail"), []);


    const fullWidth = Dimensions.get('window').width

    const Recipe_youtube_list = (RecipeIdList)=>{
        const YOUTUBE_API_KEY = 'YOUR_API_KEY';
        const maxResults = 1;
        let videoList = [];
        const [thumbnailList, setthumbnailList] = useState([]);
    
        async function _getThumbnail(query) {
          if (query) {
            for (q in query) {
              //console.log(query[q])

              const optionParams = {
                q: query[q],
                part: "snippet",
                key: YOUTUBE_API_KEY,
                type: "video",
                maxResults: maxResults,
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
              console.log('url', url)
              let resOk = res && res.ok;

              if (resOk) {
                console.log("resOK");
                const resData = await res.json();
                for (var i = 0; i < maxResults; i++) {
                  if (resData['items'][i]) {
                    const vId = resData['items'][i]['id']['videoId'];
                    const imguri = 'https://i.ytimg.com/vi/' + vId + '/hqdefault.jpg';
                    const name = query[q];
                    videoList.push({ vId, imguri, name });
                  }
                }
              }
              else {
                console.log("resOK false condition");
              }
            }
        //console.log('url', url)
      }
        return (videoList)
      }
    
      const videolist = _getThumbnail(finalFoodList);
      console.log('recipelist', finalFoodList);
      //const videolist = _getThumbnail(GetThumbnail);

      const getData = () => {
        videolist.then((val) => {
            setthumbnailList(val);
        });
      };
    
      useEffect(() => {
        getData();
      },[]);
    
      console.log('thumbnailList', thumbnailList);
      
     return(<View style={{alignItems:'center'}}>
       <ScrollView>
       {thumbnailList.map((thumbnail, index)=>{
                        return(thumbnailList[index] ? <TouchableOpacity onPress={()=>thumbnailClicked(thumbnail.vId, thumbnail.name, RecipeIdList[index])} key={index}><Image source={{uri: thumbnail.imguri}} key={index} style={{width: fullWidth, height: 240}}/></TouchableOpacity> : <Text>Loading</Text>)
                    })
        }
       </ScrollView>
     </View>)
    };
    
    const thumbnailClicked = (vId, name, rId)=>{
      console.log(rId)
      navigation.navigate('RECIPE_DETAIL', {
        recipeName: name,
        vId: vId,
        rId: rId
      });
    }

  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  function getNearExp() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + (date.getDate()+4)).slice(-2);

    const month_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(day>month_date[date.getMonth()]){
      month = ("0" + (2 + date.getMonth())).slice(-2);
      day = day - month_date[date.getMonth()]
    }
    
    return year + "-" + month + "-" + day;

  }

  const [BMlist, setBMlist] = useState([]);
  const getbookmark = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM ingredients WHERE bookmark=1',
        [],
        (tx, results) => {
          var bookmarks = [];
          for (let i = 0; i < results.rows.length; ++i) {
             bookmarks.push(results.rows.item(i).name);
             console.log(results.rows.item(i).name)
          }
          setBMlist(bookmarks);
          //console.log('BMlist', BMlist);
          setFinalIngList(bookmarks);
          searchWith();
        }
      );
    });
  }

  const [expired, setExpired] = useState([]);
  const getExpired = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients WHERE expiration <= ?',
        [nearExp],
        (tx, results) => {
          var expired = [];
          for (let i = 0; i < results.rows.length; ++i) {
             expired.push(results.rows.item(i).name);
             console.log(results.rows.item(i).name)
          }
          setExpired(expired);
          setFinalIngList(expired);
          searchWith();
        }
      );
    });
  }

  const searchWith = () => {
    let query = 'SELECT B.name, C.recipe_count, C.recipe_id FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
    for (let i = 0; i < finalIngList.length; ++i) {
      console.log('finalinglist: ',finalIngList)
      query = query + " trim(A.ingredient_name) = "+"\'"+ finalIngList[i] +"\'";
      if (i != finalIngList.length - 1) {
        query = query + " OR";
      }
    }
    query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";

    console.log(query)
    recipe_db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          var name = [];
          var id = [];
          for (let i = 0; i < (results.rows.length>5? 5:results.rows.length); ++i) {
             name.push(results.rows.item(i).name);
             id.push(results.rows.item(i).recipe_id);
          }        
          //console.log('temp',temp);
          setFinalFoodList(name);
          setRecipeIdList(id);
        }       
      );
    });
  }

  
    //getExpired();
  
    
  //console.log('Date', date);
  //console.log('BMlist', BMlist);
  //console.log('finalinglist', finalIngList)
  //console.log('EXPlist', expired);
    return (
        <View style={styles.view}>
            <View style={styles.magniview} >
                <DelayInput style={styles.textInputStyle}
                    value={text}
                    onChangeText={setText}
                    onEndEditing={() => console.log("onEndEditing     " + text)}
                    inputRef={inputRef}
                />
          <TouchableOpacity onPress={searchWith}>
            <Icon name="magnify" size={40} color={Colors.grey500} style={{ margin: 7, marginTop: 13 }} />
          </TouchableOpacity>

            </View>
            <Text style={styles.recommendText} >레시피 추천 </Text>
            <View style={styles.buttonview}>
                <TouchableOpacity style={[styles.button, { backgroundColor: SDselect }]} onPress={()=>{modifySD()}}>
                    <Text>유통기한</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: SLselect }]} onPress={()=>{modifySL()}}>
                    <Text>즐겨찾기</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll}>
                {Recipe_youtube_list(RecipeIdList)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: { flex: 1, alignItems: 'flex-start' },
    scroll: { flex: 1 },
    infoView: { width: 400 },
    title: { fontSize: 15, fontWeight: "300", flex: 1 },
    button: { margin: 5, padding: 5 },
    buttonview: { flexDirection: "row", paddingLeft: 18, margin: 5 },
    recommendText: { marginTop: 15, marginLeft: 25, marginBottom: 5, fontSize: 20, fontWeight: "700" },
    downdowndownview: { margin: 10 },
    image: { width: 380, height: 219, margin: 5 },
    magniview: { width: 400, flexDirection: "row", padding: 5, justifyContent: 'space-evenly' },
    textInputStyle: { color: "green", width: 300, height: 50, borderWidth: 1, backgroundColor: "white", margin: 10 }
});

