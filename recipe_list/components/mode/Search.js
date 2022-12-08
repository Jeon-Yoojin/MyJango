import React, {useState, useEffect} from "react";
import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import SQLite from 'react-native-sqlite-storage';
import Thumbnail from "../Thumbnail";

var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});
var db = SQLite.openDatabase({ name: 'recipe.db', createFromLocation:"~www/recipe.db"});

const Search = ({searchText}) => {
    const [recipeList, setRecipeList] = useState({
        name: [],
        id: []
    });
    const [thumbnailList, setthumbnailList] = useState([]);

    useEffect(() => { searchRecipe(); console.log('searchrecipe 실행') }, [searchText])
    
    useEffect(() => {
        getThumbnail(recipeList);
    }, [recipeList])

    {/* searchtext로 레시피 이름 검색 -> recipeList저장*/}
    const searchRecipe = () => {
        let query = 'SELECT B.name, C.recipe_count, C.recipe_id FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
        query = query + " trim(A.ingredient_name) = " + "\'" + searchText.trim() + "\'"+ " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";

        recipe_db.transaction((tx) => {
            tx.executeSql(
                query,
                [],
                (tx, results) => {
                    var name = [];
                    var id = [];
                    for (let i = 0; i < (results.rows.length > 5 ? 5 : results.rows.length); ++i) {
                        name.push(results.rows.item(i).name);
                        id.push(results.rows.item(i).recipe_id);
                        //console.log(results.rows.item(i))
                    }
                    setRecipeList({name:name, id:id})
                }
            );
        });
        console.log(recipeList)
        //임시 getThumbnail(recipeList)
    }

    {/* 해당 레시피 이름으로 유튜브에 정보 요청 ;(recipeList)->(thumbnailList)*/ }
    const YOUTUBE_API_KEY = 'AIzaSyAWVzXCSheyINWwTlYN7xCzOY7On2VYsDo';
    const maxResults = 1;
    
    function getThumbnail(Array){
        _getThumbnail(Array.name)
    }
    
    async function _getThumbnail(query) {
        let videoList = [];
        for (const q of query) {
            console.log('q is', q)
        const optionParams = {
            q: q,
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
        fetch(url, options)
            .then((response) => response.json())
            .then((resData) => {
                for (var i = 0; i < maxResults; i++) {
                    if (resData['items'][i]) {
                        const vId = resData['items'][i]['id']['videoId'];
                        const imguri = 'https://i.ytimg.com/vi/' + vId + '/hqdefault.jpg';
                        const name = q;
                        videoList.push({ vId, imguri, name });
                    }
                }
                console.log('thumbnailList: ', thumbnailList)
                console.log('videolist: ',videoList)
                setthumbnailList(videoList)
            })
            .catch((error) => {
                console.log(error);
            })
            .then(function (){
                
            })
        }
    }

    return (
        <ScrollView>
            {(thumbnailList.length) ?
                thumbnailList.map((thumbnail, index) => {
                    return (thumbnailList[index] ? <Thumbnail key={index} vId={thumbnail.vId} title={thumbnail.name} rId={recipeList.id[index]} imguri={thumbnail.imguri}/> : <Text>Loading</Text>)
                })

                : <Text>해당하는 영상이 없습니다.</Text>
            }
            </ScrollView>
    )
}

export default Search;