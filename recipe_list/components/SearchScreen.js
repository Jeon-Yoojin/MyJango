import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Flatlist} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SQLite from 'react-native-sqlite-storage';

import SearchBar from "./SearchBar";

var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});

const SearchScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [recipeList, setRecipeList] = useState({
        name: [],
        id: []
    });
    const [thumbnailList, setthumbnailList] = useState([]);

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
    }

    {/* 해당 레시피 이름으로 유튜브에 정보 요청 ;(recipeList)->(thumbnailList)*/ }
    const YOUTUBE_API_KEY = 'AIzaSyCZXGI-wPmE6TFf4UWHhBL60BaDdrMS8qU';
    const maxResults = 1;
    let videoList = [];

    async function _getThumbnail(q) {
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
        return fetch(url, options)
            .then((response) => response.json())
            .then((resData) => {
                for (var i = 0; i < maxResults; i++) {
                    if (resData['items'][i]) {
                        const vId = resData['items'][i]['id']['videoId'];
                        const imguri = 'https://i.ytimg.com/vi/' + vId + '/hqdefault.jpg';
                        const name = query[q];
                        videoList.push({ vId, imguri, name });
                    }
                }
                return videoList;
            })
            .catch((error) => {
                console.log(error);
            })
        /* */
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

    return(
        <SafeAreaView>
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSubmit={searchRecipe}/>

            <Text style={styles.recommendText} >레시피 추천 </Text>
            <View style={styles.buttonview}>
                <TouchableOpacity style={[styles.button, { }]} onPress={() => {}}>
                    <Text>유통기한</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {}]} onPress={() => {}}>
                    <Text>즐겨찾기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        margin: 5,
        padding: 5
    },
    recommendText: { marginTop: 15, marginLeft: 25, marginBottom: 5, fontSize: 20, fontWeight: "700" },
    buttonview: { flexDirection: "row", paddingLeft: 18, margin: 5 },
})

export default SearchScreen;