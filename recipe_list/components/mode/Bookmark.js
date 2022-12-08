import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import SQLite from "react-native-sqlite-storage";
import Thumbnail from "../Thumbnail";

var db = SQLite.openDatabase({ name: 'recipe.db', createFromLocation:"~www/recipe.db"});
var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});

const Bookmark = () => {
    const [isLoading, setIsLoading] = useState(true)
    //재료 목록
    const [ingList, setIngList] = useState([]);
    //요리 명, 요리 id 저장용
    const [recipeList, setRecipeList] = useState({
        name: [],
        id: []
    });
    const [thumbnailList, setthumbnailList] = useState([])

    useEffect(() => {
        getbookmark();
    }, [])

    useEffect(() => {
        getrecipe();
    }, [ingList]);

    useEffect(() => {
        searchRecipe();
    }, [recipeList])

    function getbookmark(){
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT name FROM ingredients WHERE bookmark=1',
            [],
            (tx, results) => {
              var bookmarks = [];
              for (let i = 0; i < results.rows.length; ++i) {
                 bookmarks.push(results.rows.item(i).name);
                 //console.log(results.rows.item(i).name)
              }
              setIngList(bookmarks);
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

export default Bookmark;