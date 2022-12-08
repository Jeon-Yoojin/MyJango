import React, { useEffect, useState } from "react";
import { Text, ScrollView, FlatList } from "react-native";
import SQLite from "react-native-sqlite-storage";
import Thumbnail from "../Thumbnail";

var db = SQLite.openDatabase({ name: 'recipe.db', createFromLocation:"~www/recipe.db"});
var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});

const Expiration = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [ingList, setIngList] = useState([]);
    const [recipeList, setRecipeList] = useState({
        name: [],
        id: []
    });
    const [thumbnailList, setthumbnailList] = useState([]);

    useEffect(() => { getExpired() }, [])

    useEffect(() => {
        getrecipe();
    }, [ingList]);

    useEffect(() => {
        searchRecipe();
    }, [recipeList])

    function getNearExp() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + (date.getDate() + 4)).slice(-2);

        const month_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > month_date[date.getMonth()]) {
            month = ("0" + (2 + date.getMonth())).slice(-2);
            day = day - month_date[date.getMonth()]
        }

        return year + "-" + month + "-" + day;

    }

    const getExpired = () => {
        const nearExp = getNearExp();

        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM ingredients WHERE expiration <= ?',
            [nearExp],
            (tx, results) => {
              var expired = [];
              for (let i = 0; i < results.rows.length; ++i) {
                 expired.push(results.rows.item(i).name);
                 //console.log(results.rows.item(i).name)
              }
              setIngList(expired);
            }
          );
        });
      }

    async function getrecipe(){
        let query = 'SELECT B.name, C.recipe_count, C.recipe_id FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
        for (let i = 0; i < ingList.length; ++i) {
            query = query + " trim(A.ingredient_name) = " + "\'" + ingList[i].trim() + "\'";
            if (i != ingList.length - 1) {
                query = query + " OR";
            }
        }
        query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";
        console.log('query: ', query)

        await recipe_db.transaction((tx) => {
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
                    setRecipeList({ name: name, id: id })
                }
            );
        });
    }

    {/* searchtext로 레시피 이름 검색 -> recipeList저장*/}
    const searchRecipe = () => {
        //console.log('검색할 recipe list', recipeList)
        getThumbnail(recipeList)
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
        await fetch(url, options)
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
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
            }
            )
        }
        setthumbnailList(videoList)
        setIsLoading(false)
    }
    

    return (
        <>
            <ScrollView>
                {(!isLoading) ?
                    thumbnailList.map((thumbnail, index) => {
                        return (<Thumbnail key={index} vId={thumbnail.vId} title={thumbnail.name} rId={recipeList.id[index]} imguri={thumbnail.imguri} />)
                    })

                    : <Text>로딩중</Text>
                }
            </ScrollView>
        </>
    )
}

export default Expiration;