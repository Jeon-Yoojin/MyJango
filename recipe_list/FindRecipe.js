import * as React from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import SQLite from 'react-native-sqlite-storage';

var recipe_db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation:"~www/db.sqlite"});

function FindRecipe(IngList) {
    let query = 'SELECT B.name, C.recipe_count FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
    query = query + " trim(A.ingredient_name) = " + "\'" + String(IngList) + "\'";
    query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";

    useEffect(()=>{    
    recipe_db.transaction((tx) => {
        tx.executeSql(
            query,
            [],
            (tx, results) => {
                    return(results.rows.item(i).name);

            }
        );
    });
    },[])
}

export default FindRecipe;